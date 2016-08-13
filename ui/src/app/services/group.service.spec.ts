import {
  addProviders,
  inject
} from '@angular/core/testing';
import { GroupService } from './group.service';

describe('Group Service', () => {
  beforeEach(() => {
    addProviders([GroupService]);
  });

  it('should ...',
      inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();
  }));
});
