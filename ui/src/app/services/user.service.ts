import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { Http } from '@angular/http';
import '../rxjs-operations';

@Injectable()
export class UserService {

    constructor(private http: Http) { }
    read(): Promise<User> {
        return this.http.get('/api/users/self').toPromise().then(response => response.json());
    }

}
