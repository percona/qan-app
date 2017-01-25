import { QanAppPage } from './app.po';

describe('qan-app App', function() {
  let page: QanAppPage;

  beforeEach(() => {
    page = new QanAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
