import { browser, element, by } from 'protractor';

export class QanAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root')).getText();
  }

  isMainPresent() {
    // @ts-ignore
    return $('app-root').$('main').isPresent();
  }
}
