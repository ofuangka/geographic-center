import { Injectable } from '@angular/core';
import { Observer } from '../support/observer';

@Injectable()
export class NotificationService {
    subscribers: Observer[] = [];
    constructor() { }
    subscribe(observer: Observer) {
        this.subscribers.push(observer);
    }
    notify(message: string) {
        this.subscribers.forEach(subscriber => subscriber.notify(message));
    }
    clear() {
        this.notify('');
    }

}
