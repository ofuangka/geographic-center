import {
  addProviders,
  inject
} from '@angular/core/testing';
import { UserService } from './user.service';

describe('User Service', () => {
  beforeEach(() => {
    addProviders([UserService]);
  });

  it('should ...',
    inject([UserService], (service: UserService) => {
      expect(service).toBeTruthy();
    }));
});
