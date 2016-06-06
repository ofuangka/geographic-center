import { Injectable } from '@angular/core';
import { Group } from './group';
import { Http } from '@angular/http';
import './rxjs-operations';

@Injectable()
export class GroupService {
    constructor(private http: Http) { }
    list() {
        return this.http.get('/api/groups').toPromise().then(response => response.json());
    }
    read(groupId: string) {
        return this.http.get(`/api/groups/${groupId}`).toPromise().then(response => response.json());
    }
    save(groupName: string) {
        return this.http.post(`/api/groups`, JSON.stringify({
            name: groupName
        })).toPromise().then(response => response.json());
    }
}
