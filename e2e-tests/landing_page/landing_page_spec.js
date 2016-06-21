var landingPage = require('./landing.po.js');

describe('Landing Page', function () {

  beforeEach(function () {
     browser.ignoreSynchronization = true;
     browser.get(browser.baseUrl);
     expect(browser.getCurrentUrl()).toContain(browser.baseUrl)
  });

  afterEach(function() {
     browser.manage().logs().get('browser').then(function(browserLog) {
     console.log('log: ' + require('util').inspect(browserLog));
     });
  });


  it('should click on QAN link', function () {
     landingPage.clickQan();
     //expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/instance')

  });

  it('should click on Grafana link', function () {
     landingPage.clickGrafana();
     //expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/instance')

  });


  it('should click on Documentation link', function () {
     landingPage.clickDocs();
     //expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/instance')

  });


  it('should check Feedback button', function () {
     landingPage.checkFeedbackButton();
     //expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/instance')

  });


  it('should submit the form', function () {
     landingPage.submitForm();
     //expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/qan/#/instance')

  });

});

