import { Injectable } from '@angular/core';

@Injectable()
export class BrowserService {

    constructor() { }

    isNotCompatible() {
        let ua = window.navigator.userAgent;
        
        /* TODO: do something with the ua */
        return false;
    }

}
