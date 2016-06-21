'use strict';

module.exports = {
    landingPage: {
        qanLink:  element(by.css('a[href*="/qan"]')),
        grafanaLink: element(by.css('a[href*="/graph"]')),
        feedbackButton: element(by.className('btn btn-primary')),
        docsLink: element(by.linkText('DOCUMENTATION')),
        feedbackEmail: 'pmm@percona.com',  
        firstName: element(by.name('firstname')),
        lastName: element(by.name('lastname')),
        companyName: element(by.name('company')),
        email: element(by.name('email')),
       // firstName: element(by.name('firstname')),
  
    },

    clickQan: function() {
        var landingPage = this.landingPage;

        landingPage.qanLink.isDisplayed();
        landingPage.qanLink.click();
    },
    
    clickGrafana: function() {
        var landingPage = this.landingPage;

        landingPage.grafanaLink.isDisplayed();
        landingPage.grafanaLink.click();
    },

    checkFeedbackButton: function() {
        var landingPage = this.landingPage;

        landingPage.feedbackButton.isDisplayed();
       // landingPage.feedbackButton.click();
    },

    clickDocs: function() {
        var landingPage = this.landingPage;

        landingPage.docsLink.isDisplayed();
        landingPage.docsLink.click();
    },

    submitForm: function() {
        var landingPage = this.landingPage;

        landingPage.firstName.isDisplayed();
        landingPage.lastName.isDisplayed();
        landingPage.companyName.isDisplayed();
        landingPage.email.isDisplayed();
        //landingPage.docsLink.click();
    }

};
