export class GeographicCenterPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('geographic-center-app h1')).getText();
  }
}
