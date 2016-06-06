import { Injectable } from '@angular/core';
import { UserInfo } from './user-info';
import { Http } from '@angular/http';
import './rxjs-operations';

@Injectable()
export class UserInfoService {

    constructor(private http: Http) { }
    read() {
        return this.http.get('/api/user-info').toPromise().then(response => response.json());
    }

}
