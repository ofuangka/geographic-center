import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { MemberService } from './member.service';

describe('Member Service', () => {
  beforeEachProviders(() => [MemberService]);

  it('should ...',
      inject([MemberService], (service: MemberService) => {
    expect(service).toBeTruthy();
  }));
});
