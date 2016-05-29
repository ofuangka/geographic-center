import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { GeographicCenterAppComponent } from '../app/geographic-center.component';

beforeEachProviders(() => [GeographicCenterAppComponent]);

describe('App: GeographicCenter', () => {
  it('should create the app',
      inject([GeographicCenterAppComponent], (app: GeographicCenterAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
