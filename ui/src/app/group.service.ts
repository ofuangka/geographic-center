import { Injectable } from '@angular/core';
import { Group } from './group';

@Injectable()
export class GroupService {
    constructor() { }
    list() {
        return new Promise<Group[]>(resolve => setTimeout(() => resolve(GROUPS), 3000));
    }
    read(id: string) {
        return new Promise<Group>(resolve => setTimeout(() => {
            let ret = Object.create(null);
            for (let i = 0, len = GROUPS.length; i < len; i++) {
                let group = GROUPS[i];
                if (group.id === id) {
                    ret = group;
                    break;
                }
            }
            resolve(ret);
        }, 3000));
    }
    save(groupName: string, lat: number, lng: number) {
        return new Promise<Group>(resolve => setTimeout(() => resolve(GROUPS[0]), 1000));
    }
}
let GROUPS = [
    { id: '1', name: 'Breakfast', createdTs: new Date().getTime() },
    { id: '2', name: 'Lunch', createdTs: new Date().getTime() },
    { id: '3', name: 'Dinner', createdTs: new Date().getTime() }
];
