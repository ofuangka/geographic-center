import { Injectable } from '@angular/core';
import { Location } from '../domain/location';

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
    getRandomKnownLocation(): Location {
        let locations = Object.keys(KNOWN_LOCATIONS);
        return KNOWN_LOCATIONS[locations[Math.random() * 100 % locations.length]];
    }

}
var KNOWN_LOCATIONS: Object = {
    London: { lat: 51.5074, lng: 0.1278, zoom: 7 },
    Bangkok: { lat: 13.7563, lng: 100.5018, zoom: 10 },
    Seattle: { lat: 47.6062, lng: 122.3321, zoom: 11 },
    Chicago: { lat: 41.8781, lng: 87.6298, zoom: 10 },
    Paris: { lat: 48.8566, lng: 2.3522, zoom: 11 },
    Amsterdam: { lat: 52.3702, lng: 4.8952, zoom: 11 },
    Bruges: { lat: 51.2093, lng: 3.2247, zoom: 11 },
    Tokyo: { lat: 35.6895, lng: 139.6917, zoom: 10 },
    Toronto: { lat: 43.6532, lng: 79.3832, zoom: 10 },
    Munich: { lat: 48.1351, lng: 11.5820, zoom: 11 },
    Venice: { lat: 45.4408, lng: 12.3155, zoom: 11 },
    Barcelona: { lat: 41.3851, lng: 2.1734, zoom: 11 }
};
