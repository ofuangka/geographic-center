import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    moduleId: module.id,
    selector: 'app-group-details',
    templateUrl: 'group-details.component.html',
    styleUrls: ['group-details.component.css'],
    directives: [
        MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_PROGRESS_CIRCLE_DIRECTIVES,
        MD_SLIDE_TOGGLE_DIRECTIVES,
        MD_ICON_DIRECTIVES
    ]
})
export class GroupDetailsComponent implements OnInit {
    group = {
        name: 'Ultimate group'
    };
    members: Object[] = [
        { id: '1', name: 'ofuangka', lat: 1.1, lng: 1.2, lastUpdatedTs: (new Date()).getTime() }
    ];
    enabledMembers: Object = { '1': true };
    map: google.maps.Map;
    constructor() { }
    ngOnInit() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }
}
