import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { GeographicCenterAppComponent, environment } from './app/';
import { ROUTER_PROVIDERS } from './app/geographic-center.routes';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

if (environment.production) {
    enableProdMode();
}

bootstrap(GeographicCenterAppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]).catch(err => console.error(err));

