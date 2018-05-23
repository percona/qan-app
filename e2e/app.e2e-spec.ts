import { QanAppPage } from './app.po';

describe('qan-app App', function() {
  let page: QanAppPage;

  beforeEach(() => {
    page = new QanAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    console.log('================', page.getParagraphText());
    expect(page.isMainPresent()).toEqual(true);
    // expect(page.getParagraphText()).toEqual('app works!');
  });
});
