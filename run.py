#!/usr/bin/env python

import SimpleHTTPServer
import SocketServer
import random
import re
import socket
import sys

SPA_HOST, SPA_PORT = '0.0.0.0', 8000
PDS_HOST, PDS_PORT = '127.0.0.1', 9001
#PDS_HOST, PDS_PORT = '10.10.11.204', 9001
API_PATH = '/api/v1'
PORTS = [1001, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
         1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999, 55555]

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
    if sys.argv[1:]:
        port = int(sys.argv[1])
    else:
        port = SPA_PORT

    try:
        httpd = SocketServer.ForkingTCPServer((SPA_HOST, port), HTTPSPAHandler)
        print('Serving at port %s \nPress Ctrl+C to exit.' % (port,))
        httpd.serve_forever()
    except socket.error:
        ports = PORTS
        if port in ports:
            ports.remove(port)
        port_to_try = random.choice(ports)
        print('Port %s is busy try another one. e.g.: ./run.py %s' % (port, port_to_try))
        sys.exit(1)
    except KeyboardInterrupt:
        print('\nBye!')
        sys.exit(1)
