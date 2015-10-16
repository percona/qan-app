import SimpleHTTPServer
import SocketServer
import re
import socket
import sys

SPA_HOST, SPA_PORT = '0.0.0.0', 8000
PDS_HOST, PDS_PORT = '127.0.0.1', 9001
API_PATH = '/api/v1'

class HTTPSPAHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def _proxy(self):
        """Forwards requests to data storage."""
        new_raw_requestline = self.raw_requestline.replace(API_PATH, '')
        http_msg = '%s%s\r\n' % (new_raw_requestline, self.headers)
        content_len = int(self.headers.getheader('content-length', 0))

        if content_len:
            body = self.rfile.read(content_len)
            http_msg = '%s%s\r\n' % (http_msg, body)

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((PDS_HOST, PDS_PORT))
        s.sendall(http_msg)
        content = s.recv(10000)
        s.close()
        self.wfile.write(content)
        self.wfile.flush() #actually send the response if not already done.
        self.log_request()

    def do_GET(self):
        if re.match(API_PATH, self.path):
            self._proxy()
        else:
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def do_PUT(self):
        if re.match(API_PATH, self.path):
            self._proxy()
        else:
            raise NotImplementedError

    def do_POST(self):
        if re.match(API_PATH, self.path):
            self._proxy()
        else:
            raise NotImplementedError


if __name__ == '__main__':

    try:
        if sys.argv[1:]:
            port = int(sys.argv[1])
        else:
            port = SPA_PORT

        httpd = SocketServer.ForkingTCPServer((SPA_HOST, port), HTTPSPAHandler)
        print 'Serving at port', port, '\nPress Ctrl+C to exit.'
        httpd.serve_forever()
    except KeyboardInterrupt:
        print '\nBye!'
        sys.exit(1)
