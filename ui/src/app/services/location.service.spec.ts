import {
  addProviders,
  inject
} from '@angular/core/testing';
import { LocationService } from './location.service';

describe('Location Service', () => {
  beforeEach(() => {
    addProviders([LocationService]);
  });

  it('should ...',
      inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
