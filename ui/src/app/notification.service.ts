import { Injectable } from '@angular/core';
import { Notifee } from './notifee';

@Injectable()
export class NotificationService {
    subscribers: Notifee[] = [];
    constructor() { }
    subscribe(notifee: Notifee) {
        this.subscribers.push(notifee);
    }
    notify(message: string) {
        this.subscribers.forEach(subscriber => subscriber.notify(message));
    }
    clear() {
        this.notify('');
    }

}
