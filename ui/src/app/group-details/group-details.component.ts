import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { Member } from '../member';
import { DecimalPipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { RouteSegment } from '@angular/router';
import { MemberService } from '../member.service';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { LocationService } from '../location.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { NotificationService } from '../notification.service';
import { Observable, Subscription } from 'rxjs/Rx';

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
    providers: [MemberService, ChangeDetectorRef]
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
    group: Group;
    members: Member[];
    enabledMembers = {};
    map: google.maps.Map;
    bounds = new google.maps.LatLngBounds();
    decimalFormat = '1.4-4';
    isLoading: boolean;
    isSendingLocation: boolean;
    messageConnection: WebSocket;
    ping: Subscription;
    self: User;
    constructor(private groupService: GroupService,
        private routeSegment: RouteSegment,
        private memberService: MemberService,
        private locationService: LocationService,
        private userService: UserService,
        private notificationService: NotificationService,
        private changeDetectorRef: ChangeDetectorRef) { }
    ngOnInit() {
        this.isLoading = true;

        let groupId = this.routeSegment.getParam('groupId');

        this.groupService.read(groupId).then(group => this.group = group, this.handleGroupFailure.bind(this));

        this.memberService.list(groupId).then(members => {
            let thirtySeconds = 30000;
            this.members = members;

            /* all members should be enabled initially */
            this.members.forEach(member => {
                this.enabledMembers[member.id] = true;
            });

            this.drawMap();

            this.isSendingLocation = true;
            this.isLoading = false;

            this.messageConnection = new WebSocket('wss://geographic-center-ws.herokuapp.com');
            this.messageConnection.onmessage = this.handleMessage.bind(this);
            this.ping = Observable.interval(thirtySeconds).subscribe(count => this.messageConnection.send('"ping"'));

            /* add self if not a member */
            this.userService.read().then(user => {
                this.self = user;
                let isMember = false;
                for (let i = 0, len = this.members.length; i < len; i++) {
                    if (this.self.id === this.members[i].userId) {
                        isMember = true;
                        break;
                    }
                }
                if (!isMember) {
                    this.sendLocation();
                }
                this.isSendingLocation = false;
            }, () => {
                this.handleUserInfoFailure();
                this.isSendingLocation = false;
            });

        }, () => {
            this.handleMemberFailure();
            this.isLoading = false;
        });
    }
    drawMap() {
        let center = { lat: 0, lng: 0 }, count = 0, london = { lat: 51.5074, lng: 0.1278, zoom: 7 }, formatDecimal = (decimal) => new DecimalPipe().transform(decimal, this.decimalFormat);
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
                label: member.username
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
                content: `
                    <h3>Geographic Center</h3>
                    <p>(${formatDecimal(center.lat)}, ${formatDecimal(center.lng)})</p>
                    <p><a href="https://www.google.com/maps/search/restaurants/@${center.lat},${center.lng}" target="_blank">Search nearby...</a></p>`
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
            this.map.setZoom(london.zoom);
        }
    }
    sendLocation() {
        this.isSendingLocation = true;
        this.locationService.getCurrentPosition().then(coords => {
            let groupId = this.routeSegment.getParam('groupId');
            this.memberService.savePosition(groupId, coords.latitude, coords.longitude).then(
                (newMember) => {
                    this.messageConnection.send(JSON.stringify(newMember));
                    this.isSendingLocation = false;
                },
                () => {
                    this.handleUpdateFailure();
                    this.isSendingLocation = false;
                });
        }, () => {
            this.handlePositionFailure();
            this.isSendingLocation = false;
        });
    }
    handlePositionFailure() {
        this.notificationService.notify('Warning: Could not determine location');
    }
    handleUpdateFailure() {
        this.notificationService.notify('Warning: Could not save location');
    }
    onMessageReceived(newValue: Member) {
        for (let i = 0, len = this.members.length; i < len; i++) {
            if (this.members[i].id === newValue.id) {
                this.members.splice(i, 1, newValue);

                /* make sure to enable new members by default */
                if (!this.enabledMembers.hasOwnProperty(newValue.id)) {
                    this.enabledMembers[newValue.id] = true;
                }
                break;
            }
        }
    }
    handleUserInfoFailure() {
        this.notificationService.notify('Warning: Could not determine user');
    }
    handleGroupFailure() {
        this.notificationService.notify('Warning: Could not retrieve group info');
    }
    handleMemberFailure() {
        this.notificationService.notify('Warning: Could not retrieve group members');
    }
    handleMessage(message) {
        let newMember: Member = JSON.parse(message.data);

        /* replace the old member if it already exists */
        var memberExists = false;
        for (let i = 0, len = this.members.length; i < len; i++) {
            if (newMember.id === this.members[i].id) {
                this.members.splice(i, 1, newMember);
                memberExists = true;
                break;
            }
        }
        if (!memberExists) {
            this.members.push(newMember);
            this.enabledMembers[newMember.id] = true;
        }
        this.changeDetectorRef.detectChanges();
    }
    ngOnDestroy() {
        this.ping.unsubscribe();
    }
}
