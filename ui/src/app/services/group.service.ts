import { Injectable } from '@angular/core';
import { Group } from '../domain/group';
import { Http, Headers } from '@angular/http';
import '../rxjs-operations';

@Injectable()
export class GroupService {
    constructor(private http: Http) { }
    list(): Promise<Group[]> {
        return this.http.get('/api/groups?own=true').toPromise().then(response => response.json());
    }
    read(groupId: string): Promise<Group> {
        return this.http.get(`/api/groups/${groupId}`).toPromise().then(response => response.json());
    }
    create(groupName: string, isPublic: boolean): Promise<Group> {
        return this.http.post(`/api/groups`, JSON.stringify({
            name: groupName,
            public: isPublic
        }), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).toPromise().then(response => response.json());
    }
}
