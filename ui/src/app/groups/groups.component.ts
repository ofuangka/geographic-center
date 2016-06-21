import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { GroupService } from '../services/group.service';
import { Group } from '../domain/group';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { NotificationService } from '../services/notification.service';
import { MemberService } from '../services/member.service';
import { Member } from '../domain/member';
import { LocationService } from '../services/location.service';

@Component({
    moduleId: module.id,
    selector: 'app-groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css'],
    directives: [
        MD_CARD_DIRECTIVES,
        ROUTER_DIRECTIVES,
        MD_PROGRESS_CIRCLE_DIRECTIVES,
        MD_ICON_DIRECTIVES
    ]
})
export class GroupsComponent implements OnInit {
    groups: Group[];
    isLoading: boolean;
    constructor(
        private groupService: GroupService,
        private notificationService: NotificationService,
        private memberService: MemberService,
        private locationService: LocationService
    ) { }
    ngOnInit() {
        this.isLoading = true;
        this.groupService.list().then(groups => {
            this.groups = groups.sort(function comparator(a, b) { return b.createdTs - a.createdTs });
            if (this.groups.length > 0) {
                this.memberService.list(this.groups[0].id).then((members) => { this.isLoading = false; this.drawMap(members); }, this.handleMembersFailure.bind(this));
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.handleGroupsFailure();
            this.isLoading = false;
        });
    }
    handleGroupsFailure() {
        this.notificationService.notify('Error: Could not retrieve groups');
    }
    handleMembersFailure() {
        this.notificationService.notify('Error: Could not retrieve group members');
    }
    drawMap(members: Member[]) {
        this.isLoading = false;
        let avg = { lat: 0, lng: 0 },
            count = 0,
            randomLocation = this.locationService.getRandomKnownLocation(),
            map = new google.maps.Map(document.querySelector('#map'), {
                disableDoubleClickZoom: true,
                draggable: false,
                mapTypeControlOptions: {
                    mapTypeIds: []
                },
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                scrollwheel: false,
                streetViewControl: false,
                zoomControl: false
            }),
            defaultZoom = 11;

        /* calculate the average */
        members.forEach(function iterator(member) {
            avg.lat += member.lat;
            avg.lng += member.lng;
            count++;
        });
        if (count > 0) {
            avg.lat /= count;
            avg.lng /= count;
            let avgLatLng = new google.maps.LatLng(avg.lat, avg.lng);
            new google.maps.Marker({
                position: avgLatLng,
                map: map
            });
            map.setCenter(avgLatLng);
            map.setZoom(defaultZoom);
        } else {
            map.setCenter(new google.maps.LatLng(randomLocation.lat, randomLocation.lng));
            map.setZoom(randomLocation.zoom);
        }
    }
}
