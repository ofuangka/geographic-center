import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group, Member } from '../domain';
import { NotificationService, GroupService, MemberService, LocationService } from '../services';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {
    groups: Group[];
    isLoading: boolean;
    mapWidth: number;
    resizeEventListener: EventListener;
    firstMembers: Member[];
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
                this.memberService.list(this.groups[0].id).then((members) => {
                    this.firstMembers = members;
                    this.drawMap();
                    this.resizeEventListener = this.handleResize.bind(this);
                    window.addEventListener('resize', this.resizeEventListener)
                }, this.handleMembersFailure.bind(this));
            }
            this.isLoading = false;
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
    drawMap() {
        let members = this.firstMembers;
        this.isLoading = false;
        let mapEl = document.getElementById('map');
        this.mapWidth = mapEl.offsetWidth;
        let avg = { lat: 0, lng: 0 },
            count = 0,
            randomLocation = this.locationService.getRandomKnownLocation(),
            map = new google.maps.Map(mapEl, {
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
    handleResize(event: UIEvent) {
        let mapEl = document.getElementById('map');
        if (this.mapWidth !== mapEl.offsetWidth) {
            this.drawMap();
        }
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeEventListener);
    }
}
