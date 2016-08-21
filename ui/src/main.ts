import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { GeographicCenterModule } from './app/geographic-center.module';
import { environment } from './app';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeographicCenterModule);
