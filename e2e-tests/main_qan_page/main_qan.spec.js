var mainQANPage = require('./mainQan.po.js')
   
describe('Main QAN Page', function () {
 
  beforeEach(function () {
    browser.ignoreSynchronization = false;
    mainQANPage.get();
    element.all(by.css('.alert.msg')).then(function(items)  {
    expect(items.length).toBe(0);
    });
    expect(mainQANPage.returnTopTitle()).toContain('Top');
  });
  
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('log: ' + require('util').inspect(browserLog));
    });
  });

  it('should search Select query', function () {
    mainQANPage.clearSearch();
    mainQANPage.searchFor('select');
    mainQANPage.doSearch();
    expect(mainQANPage.returnTopTitle()).toContain('Top');
    mainQANPage.clearSearch();
    mainQANPage.doSearch();
    expect(mainQANPage.returnTopTitle()).toContain('Top');
  });

  it('shouldnt search any query', function () {
    mainQANPage.clearSearch();
    mainQANPage.searchFor('querry');
    mainQANPage.doSearch();
    expect(mainQANPage.returnNoQueriesTxt()).toContain('There is no data');
    mainQANPage.clearSearch();
    mainQANPage.doSearch();
    expect(mainQANPage.returnTopTitle()).toContain('Top');
  });
  
  it('should click Select query', function () {
    mainQANPage.clearSearch();
    mainQANPage.searchFor('select');
    mainQANPage.doSearch();
    mainQANPage.clickQueryNr(0);

  });

  it('should open Server Summary page', function () {
    mainQANPage.clickSummary();
    var selectedElement = element(by.xpath('//*[contains(text(), "Server Summary")]'));
  });

  it('should click on Total', function () {
    mainQANPage.clickTotal();
  });

  it('should click on management button', function () {
    mainQANPage.clickManagement();
     
    expect(browser.getCurrentUrl()).toContain('/qan/#/management/mysql');
  });
  /*
  it('should click on each query', function () {
    mainQANPage.clickEachQuery();
 //   mainQANPage.clickMetricRates();
  });*/

});
