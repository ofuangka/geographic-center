import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css'],
    directives: [MD_CARD_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class GroupsComponent implements OnInit {
    groups: Object[] = [{ id: '1', name: 'Ultimate group', createdTs: (new Date()).getTime() }];
    constructor() { }
    ngOnInit() {
    }
}
