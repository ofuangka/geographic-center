import { Injectable } from '@angular/core';
import { UserInfo } from './user-info';

@Injectable()
export class SecurityService {

    constructor() { }
    getUserInfo() {
        return new Promise<UserInfo>(resolve => setTimeout(() => resolve(new UserInfo()), 3000));
    }

}
