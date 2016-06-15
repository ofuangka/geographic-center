import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { NameService } from './name.service';

describe('Name Service', () => {
  beforeEachProviders(() => [NameService]);

  it('should ...',
      inject([NameService], (service: NameService) => {
    expect(service).toBeTruthy();
  }));
});
