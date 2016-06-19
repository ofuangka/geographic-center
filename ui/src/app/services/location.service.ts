import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {
    constructor() { }
    getCurrentPosition() {
        return new Promise<Coordinates>((resolve, reject) => {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(position => {
                    resolve(position.coords);
                }, error => {
                    if (error.code === error.PERMISSION_DENIED) {
                        reject('PERMISSION_DENIED');
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        reject('POSITION_UNAVAILABLE');
                    } else if (error.code === error.TIMEOUT) {
                        reject('TIMEOUT');
                    } else {
                        reject(error.message);
                    }
                });
            } else {
                reject('NOT_SUPPORTED');
            }
        });
    }

}
