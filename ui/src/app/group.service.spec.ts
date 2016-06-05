import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GroupService } from './group.service';

describe('Group Service', () => {
  beforeEachProviders(() => [GroupService]);

  it('should ...',
      inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();
  }));
});
