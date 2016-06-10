import { Injectable } from '@angular/core';
import { Group } from './group';
import { Http, Headers } from '@angular/http';
import './rxjs-operations';

@Injectable()
export class GroupService {
    constructor(private http: Http) { }
    list(): Promise<Group[]> {
        return this.http.get('/api/groups?own=true').toPromise().then(response => response.json());
    }
    read(groupId: string): Promise<Group> {
        return this.http.get(`/api/groups/${groupId}`).toPromise().then(response => response.json());
    }
    create(groupName: string): Promise<Group> {
        return this.http.post(`/api/groups`, JSON.stringify({
            name: groupName
        }), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).toPromise().then(response => response.json());
    }
}
