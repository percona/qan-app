'use strict';  
  
module.exports = {  
  mysqlConnectionPage: { 
    addNewMysql: element(by.xpath('//button[@title="Add MySQL Connection"]')), 
    connectionDropDown: element(by.className('btn btn-warning navbar-btn dropdown-toggle ng-binding')),  
    allConnections: element.all(by.repeater('row in tree_rows | filter:{visible:true} track by row.branch.uid')),  
    mysqlName: element(by.name('name')),
    user: element(by.name('user')),
    password: element(by.name('password')),
    hostname: element(by.name('hostname')),
    socket: element(by.name('socket')),
    createBtn: element(by.xpath('//button/i[contains(@text,"Create")]')),
  },  
      
  get: function() {  
    browser.get('/qan/#/management/new-mysql/');   
    browser.waitForAngular();  
  },  
      
  getAllConnections: function() {  
    var page = this.mysqlConnectionPage;  
          
    page.connectionDropDown.isDisplayed();  
    page.connectionDropDown.click();  
  }, 
  
  clickAddNewMysql: function() {
    var page = this.mysqlConnectionPage;
    page.addNewMysql.isDisplayed();
    page.addNewMysql.click();
  },

  returnMysqlName: function()  {
    var page = this.mysqlConnectionPage;
    return page.mysqlName.getAttribute('value');
  },

  returnUserName: function()  {
    var page = this.mysqlConnectionPage;
    return page.user.getAttribute('value');
  },

  returnPassword: function()  {
    var page = this.mysqlConnectionPage;
    return page.password.getAttribute('value');
  },

  returnHostname: function()  {
    var page = this.mysqlConnectionPage;
    return page.hostname.getAttribute('value');
  },

  returnSocket: function()  {
    var page = this.mysqlConnectionPage;
    return page.socket.getAttribute('value');
  },
  
  clickCreateBtn: function()  {
    var page = this.mysqlConnectionPage;
    page.createBtn.isDisplayed();
    page.createBtn.click();
  },

};
