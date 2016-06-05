import { Injectable } from '@angular/core';
import { UserInfo } from './user-info';

@Injectable()
export class UserInfoService {

    constructor() { }
    read() {
        return new Promise<UserInfo>(resolve => setTimeout(() => resolve(new UserInfo()), 3000));
    }

}
