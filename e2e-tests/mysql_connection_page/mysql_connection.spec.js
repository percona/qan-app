var mysqlPage = require('./mysql_conn_page.po.js');  
   
describe('MySQL Connection Page', function () {
 
  beforeEach(function () {
    browser.ignoreSynchronization = false;
    mysqlPage.get();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/management');
  });
  
  afterEach(function() {
     browser.manage().logs().get('browser').then(function(browserLog) {
     console.log('log: ' + require('util').inspect(browserLog));
     });
  });

  it('should not add new MySql connection with empty fields', function () {
    mysqlPage.clickAddNewMysql();
    expect(mysqlPage.returnMysqlName()).toEqual('');  
    expect(mysqlPage.returnUserName()).toEqual('');  
    expect(mysqlPage.returnPassword()).toEqual('');  
    expect(mysqlPage.returnHostname()).toEqual('');  
    expect(mysqlPage.returnSocket()).toEqual(''); 
     
  });

})

