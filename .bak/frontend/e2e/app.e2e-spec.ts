import { OutlierPage } from './app.po';

describe('outlier App', () => {
  let page: OutlierPage;

  beforeEach(() => {
    page = new OutlierPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
