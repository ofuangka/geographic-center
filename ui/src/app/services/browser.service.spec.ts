import {
  addProviders,
  inject
} from '@angular/core/testing';
import { BrowserService } from './browser.service';

describe('Browser Service', () => {
  beforeEach(() => {
    addProviders([BrowserService]);
  });

  it('should ...',
      inject([BrowserService], (service: BrowserService) => {
    expect(service).toBeTruthy();
  }));
});
