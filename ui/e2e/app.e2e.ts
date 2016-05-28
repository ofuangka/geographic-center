import { GeographicCenterPage } from './app.po';

describe('geographic-center App', function() {
  let page: GeographicCenterPage;

  beforeEach(() => {
    page = new GeographicCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('geographic-center works!');
  });
});
