import {
  addProviders,
  inject
} from '@angular/core/testing';
import { GeographicCenterAppComponent } from '../app/geographic-center.component';


describe('App: GeographicCenter', () => {
  beforeEach(() => {
    addProviders([GeographicCenterAppComponent]);
  });
  it('should create the app',
      inject([GeographicCenterAppComponent], (app: GeographicCenterAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
