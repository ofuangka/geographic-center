import {
  addProviders,
  inject
} from '@angular/core/testing';
import { MemberService } from './member.service';

describe('Member Service', () => {
  beforeEach(() => {
    addProviders([MemberService]);
  });

  it('should ...',
      inject([MemberService], (service: MemberService) => {
    expect(service).toBeTruthy();
  }));
});
