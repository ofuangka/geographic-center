import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { LocationService } from './location.service';

describe('Location Service', () => {
  beforeEachProviders(() => [LocationService]);

  it('should ...',
      inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
