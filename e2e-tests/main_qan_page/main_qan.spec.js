var mainQANPage = require('./mainQan.po.js');  
   
describe('Main QAN Page', function () {
 
  beforeEach(function () {
     browser.ignoreSynchronization = false;
     mainQANPage.get();
     expect(browser.getCurrentUrl()).toContain(browser.baseUrl)    
  });
  
  afterEach(function() {
     browser.manage().logs().get('browser').then(function(browserLog) {
     console.log('log: ' + require('util').inspect(browserLog));
     });
  });

  it('should check Server Summary', function () {
    mainQANPage.clickTotal();
        
  });

  it('should select time range 1h', function () {
    //mainQANPage.returnTimeRangeDisplayed();
  });

  it('should click on management button', function () {
    mainQANPage.clickManagement();
     
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/management/mysql')
  });
  
  it('should click on select query', function () {
    mainQANPage.clickSelectQuery();

  });

});
