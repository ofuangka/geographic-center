import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { GroupMember } from './group-member';

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
    members: GroupMember[] = [
        { id: '1', name: 'ofuangka', lat: 1.1, lng: 1.2, lastUpdatedTs: new Date().getTime() },
        { id: '2', name: 'tracylvalenzuela', lat: 2.2, lng: 2.4, lastUpdatedTs: new Date().getTime() },
        { id: '3', name: 'forrestjacobs', lat: 1.2, lng: 1.2, lastUpdatedTs: new Date().getTime() }
    ];
    enabledMembers = {};
    map: google.maps.Map;
    bounds = new google.maps.LatLngBounds();
    constructor() { }
    ngOnInit() {
        
        /* all members should be enabled initially */
        this.members.forEach(member => {
            this.enabledMembers[member.id] = true;
        });
        
        this.drawMap();
    }
    drawMap() {
        this.map = new google.maps.Map(document.getElementById('map'));
        this.members.filter(member => this.enabledMembers[member.id]).forEach(member => {

            /* draw the Marker and include it in the bounds */
            this.bounds.extend(new google.maps.Marker({
                position: new google.maps.LatLng(member.lat, member.lng),
                map: this.map,
                label: member.name
            }).getPosition())
        });
        this.map.fitBounds(this.bounds);
    }
}
