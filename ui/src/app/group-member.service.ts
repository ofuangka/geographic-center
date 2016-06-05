import { Injectable } from '@angular/core';
import { GroupMember } from './group-member';

@Injectable()
export class GroupMemberService {

    constructor() { }

    list(groupId: string) {
        return new Promise<GroupMember[]>(resolve => setTimeout(() => resolve(MEMBERS), 3000));
    }
    
    updatePosition(groupId: string, lat: number, lng: number) {
        return new Promise(resolve => setTimeout(() => resolve(), 1000));
    }

}
var MEMBERS: GroupMember[] = [
    { id: '0', groupId: '0', userId: '0', name: 'ofuangka', lat: 0, lng: 0, lastUpdatedTs: new Date().getTime() },
    { id: '1', groupId: '1', userId: '1', name: 'tracylvalenzuela', lat: 0, lng: 0, lastUpdatedTs: new Date().getTime() },
    { id: '2', groupId: '2', userId: '2', name: 'forrestjacobs', lat: 0, lng: 0, lastUpdatedTs: new Date().getTime() }
];
