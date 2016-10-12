'use strict';  
  
module.exports = {  
  mainPage: { 
    noQueriesTxt: element(by.id('text_no_profile_data')), 
    topTitle: element(by.id('text_count_queries')),  
    calendarBtn: element(by.id('btn_cal')),  
    managementBtn: element(by.xpath('//*[contains(@title,"Configure query analitics")]')),  
    instancesList: element(by.xpath('//*button[contains(@title,"Databases")]')),  
    serverSumBtn: element(by.xpath('//button[contains(@title,"View database and server summary info")]')),
    totalLink: element(by.linkText('TOTAL')),
    searchFld: element(by.name('search')),
    searchBtn: element(by.xpath('//button[@type="submit"]')),
    serverSummary: element(by.xpath('//*[contains(text(), "Server Summary")]')),
    timeRangeDspl: element(by.xpath('//p[@class="well navbar-text ng-binding"]')),  
    queryList: element.all(by.repeater('row in qanData')),
    querySelected:  element(by.css('[ng-click="qanSelectRow(row)"]'))
  },  
      
  get: function() {  
    browser.get('/qan/');   
    browser.waitForAngular();  
  },  
      
  returnTopTitle: function() {
    return this.mainPage.topTitle.getText();
  },
  
    
  returnNoQueriesTxt: function() {
    return this.mainPage.noQueriesTxt.getText();
  },
  
  clickCalendar: function() {  
    this.mainPage.calendarBtn.click();  
  },
 
  searchFor: function(query) {  
    this.mainPage.searchFld.sendKeys(query);
  },

  clearSearch: function() {
    this.mainPage.searchFld.clear();
  },
 
  doSearch: function() {
    this.mainPage.searchBtn.click();
  },
 
  clickSummary: function() {  
    this.mainPage.serverSumBtn.click();
  }, 

  clickManagement: function() {  
    this.mainPage.managementBtn.click();  
  }, 

  clickTotal: function() {
    this.mainPage.totalLink.click();
  },

  returnQueryLink: function(num) {
    this.mainPage.queryList.then(function(row) {
    var query = row[0].element(by.css('[ng-click="qanSelectRow(row)"]'));
      return query;
    });
  },

  clickQueryNr: function(num) {
    this.mainPage.queryList.then(function(tables) {
      var titleElement = tables[num].element(by.css('[ng-click="qanSelectRow(row)"]'));
      titleElement.click(); 
    });
  },

  returnTopQueriesTxt: function() {
    this.mainPage.topTitle.getAttribute('title');
  },
};
