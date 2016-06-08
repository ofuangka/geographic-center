import { Injectable } from '@angular/core';
import { Member } from './member';
import { Http, Headers } from '@angular/http';
import './rxjs-operations';

@Injectable()
export class MemberService {

    constructor(private http: Http) { }

    list(groupId: string) {
        return this.http.get(`/api/members?gid=${groupId}`).toPromise().then(response => response.json());
    }
    
    savePosition(groupId: string, lat: number, lng: number) {
        return this.http.post(`/api/members`, JSON.stringify({
            groupId: groupId,
            lat: lat,
            lng: lng
        }), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).toPromise().then(response => response.json());
    }

}