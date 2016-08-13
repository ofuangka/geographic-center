import {
  addProviders,
  inject
} from '@angular/core/testing';
import { NameService } from './name.service';

describe('Name Service', () => {
  beforeEach(() => {
    addProviders([NameService]);
  });

  it('should ...',
      inject([NameService], (service: NameService) => {
    expect(service).toBeTruthy();
  }));
});
