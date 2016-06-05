import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { GroupMember } from '../group-member';
import { DecimalPipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { RouteSegment } from '@angular/router';
import { GroupMemberService } from '../group-member.service';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

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
        MD_ICON_DIRECTIVES,
        ROUTER_DIRECTIVES,
        MD_BUTTON_DIRECTIVES
    ],
    providers: [GroupMemberService]
})
export class GroupDetailsComponent implements OnInit {
    group: Group;
    members: GroupMember[];
    enabledMembers = {};
    map: google.maps.Map;
    bounds = new google.maps.LatLngBounds();
    decimalFormat = '1.4-4';
    isLoading = true;
    constructor(private groupService: GroupService, private routeSegment: RouteSegment, private groupMemberService: GroupMemberService) { }
    ngOnInit() {
        let groupId = this.routeSegment.getParam('groupId');

        this.groupService.read(groupId).then(group => this.group = group);

        this.groupMemberService.list(groupId).then(members => {
            this.members = members;

            /* all members should be enabled initially */
            this.members.forEach(member => {
                this.enabledMembers[member.id] = true;
            });

            this.drawMap();
            this.isLoading = false;
        });
    }
    drawMap() {
        let center = { lat: 0, lng: 0 }, count = 0, london = { lat: 51.5074, lng: 0.1278 }, formatDecimal = (decimal) => new DecimalPipe().transform(decimal, this.decimalFormat);
        this.map = new google.maps.Map(document.getElementById('map'), {
            mapTypeControlOptions: {
                mapTypeIds: []
            },
            streetViewControl: false
        });
        this.members.filter(member => this.enabledMembers[member.id]).forEach(member => {

            /* draw the Marker and include it in the bounds */
            this.bounds.extend(new google.maps.Marker({
                position: new google.maps.LatLng(member.lat, member.lng),
                map: this.map,
                label: member.name
            }).getPosition());

            center.lat += member.lat;
            center.lng += member.lng;
            count++;
        });

        /* add the center marker */
        if (count > 0) {
            center.lat = center.lat / count;
            center.lng = center.lng / count;

            /* add the info window */
            new google.maps.InfoWindow({
                content: `<h3>Geographic Center</h3><p>(${formatDecimal(center.lat)}, ${formatDecimal(center.lng)})</p>`
            }).open(this.map,
                new google.maps.Marker({
                    position: new google.maps.LatLng(center.lat, center.lng),
                    map: this.map,
                    animation: google.maps.Animation.DROP
                }));
            this.map.fitBounds(this.bounds);
        } else {

            /* set some default center */
            this.map.setCenter(new google.maps.LatLng(london.lat, london.lng));
            this.map.setZoom(7);
        }
    }
    sendLocation() {
        window.navigator.geolocation.getCurrentPosition((position) => {
            
        });
    }
}
