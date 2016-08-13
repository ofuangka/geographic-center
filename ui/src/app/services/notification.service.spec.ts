import {
  addProviders,
  inject
} from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('Notification Service', () => {
  beforeEach(() => {
    addProviders([NotificationService]);
  });

  it('should ...',
      inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
