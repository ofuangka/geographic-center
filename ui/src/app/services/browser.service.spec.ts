import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BrowserService } from './browser.service';

describe('Browser Service', () => {
  beforeEachProviders(() => [BrowserService]);

  it('should ...',
      inject([BrowserService], (service: BrowserService) => {
    expect(service).toBeTruthy();
  }));
});
