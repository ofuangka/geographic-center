import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

@Component({
    moduleId: module.id,
    selector: 'app-groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css'],
    directives: [MD_CARD_DIRECTIVES]
})
export class GroupsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
