import { Injectable } from '@angular/core';
import { User } from './user';
import { Http } from '@angular/http';
import './rxjs-operations';

@Injectable()
export class UserService {

    constructor(private http: Http) { }
    read() {
        return this.http.get('/api/users/self').toPromise().then(response => response.json());
    }

}