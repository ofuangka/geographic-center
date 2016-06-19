import { Injectable } from '@angular/core';
import { Member } from '../domain/member';
import { Http, Headers } from '@angular/http';
import '../rxjs-operations';

@Injectable()
export class MemberService {

    constructor(private http: Http) { }

    list(groupId: string): Promise<Member[]> {
        return this.http.get(`/api/members?gid=${groupId}`).toPromise().then(response => response.json());
    }
    
    savePosition(groupId: string, lat: number, lng: number): Promise<Member> {
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