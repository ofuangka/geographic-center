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

  it('should have as title \'geographic-center works!\'',
      inject([GeographicCenterAppComponent], (app: GeographicCenterAppComponent) => {
    expect(app.title).toEqual('geographic-center works!');
  }));
});
