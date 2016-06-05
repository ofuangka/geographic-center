import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GroupMemberService } from './group-member.service';

describe('GroupMember Service', () => {
  beforeEachProviders(() => [GroupMemberService]);

  it('should ...',
      inject([GroupMemberService], (service: GroupMemberService) => {
    expect(service).toBeTruthy();
  }));
});
