import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Member } from '../domain/member';
import { DecimalPipe } from '@angular/common';
import { Group } from '../domain/group';
import { GroupService } from '../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../services/member.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { User } from '../domain/user';
import { NotificationService } from '../services/notification.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { ReconnectingWebSocket } from '../support/reconnecting-websocket';
import { Location } from '../domain/location';
import { Message } from '../domain/message'; 

@Component({
    selector: 'app-group-details',
    templateUrl: 'group-details.component.html',
    styleUrls: ['group-details.component.css'],
    providers: [ChangeDetectorRef]
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
    group: Group;
    members: Member[];
    enabledMembers = {};
    decimalFormat = '1.4-4';
    isLoading: boolean;
    isSendingLocation: boolean;
    messageConnection: ReconnectingWebSocket;
    ping: Subscription;
    self: User;
    lastSequenceSeen: number;
    mapWidth: number;
    resizeEventListener: EventListener;
    constructor(private groupService: GroupService,
        private route: ActivatedRoute,
        private memberService: MemberService,
        private locationService: LocationService,
        private userService: UserService,
        private notificationService: NotificationService,
        private changeDetectorRef: ChangeDetectorRef) { }
    ngOnInit() {
        this.isLoading = true;

        let groupId = this.route.snapshot.params['groupId'];

        this.groupService.read(groupId).then(group => this.group = group, this.handleGroupFailure.bind(this));

        this.memberService.list(groupId).then(members => {
            let thirtySeconds = 30000;

            /* all members should be enabled initially */
            members.forEach(member => {
                this.enabledMembers[member.id] = true;
            });

            this.members = members.sort(function (a, b) { return b.lastUpdatedTs - a.lastUpdatedTs; });

            this.drawMap();

            this.isSendingLocation = true;
            this.isLoading = false;

            /* set up the websocket */
            this.messageConnection = new ReconnectingWebSocket('wss://geographic-center-ws.herokuapp.com');
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
                } else {
                    this.isSendingLocation = false;
                }
            }, () => {
                this.handleUserInfoFailure();
                this.isSendingLocation = false;
            });
            
            this.resizeEventListener = this.handleResize.bind(this);
            window.addEventListener('resize', this.resizeEventListener);

        }, () => {
            this.handleMemberFailure();
            this.isLoading = false;
        });
    }
    drawMap() {
        let mapEl = document.getElementById('map');
        let center = { lat: 0, lng: 0 },
            count = 0,
            randomLocation = this.locationService.getRandomKnownLocation(),
            formatDecimal = (decimal) => new DecimalPipe('en_US').transform(decimal, this.decimalFormat),
            bounds = new google.maps.LatLngBounds(),
            map = new google.maps.Map(mapEl, {
                mapTypeControlOptions: {
                    mapTypeIds: []
                },
                streetViewControl: false
            });
        this.mapWidth = mapEl.offsetWidth;
        this.members.filter(member => this.enabledMembers[member.id]).forEach(member => {

            /* draw the Marker and include it in the bounds */
            bounds.extend(new google.maps.Marker({
                position: new google.maps.LatLng(member.lat, member.lng),
                map: map,
                label: member.username
            }).getPosition());

            center.lat += member.lat;
            center.lng += member.lng;
            count++;
        });

        if (count > 0) {

            /* calculate the center */
            center.lat /= count;
            center.lng /= count;

            /* re-center the map */
            map.fitBounds(bounds);

            /* drop the center pin after the bounds have settled */
            google.maps.event.addListenerOnce(map, 'idle', function dropCenterMarker() {
                new google.maps.InfoWindow({
                    content: `
                    <h3>Geographic Center</h3>
                    <p>(${formatDecimal(center.lat)}, ${formatDecimal(center.lng)})</p>
                    <p><a href="https://www.google.com/maps/?q=restaurants&sll=${center.lat},${center.lng}" target="_blank">Search nearby...</a></p>`
                }).open(map, new google.maps.Marker({
                    position: new google.maps.LatLng(center.lat, center.lng),
                    map: map,
                    animation: google.maps.Animation.DROP
                }));
            });
        } else {

            /* set some default center */
            map.setCenter(new google.maps.LatLng(randomLocation.lat, randomLocation.lng));
            map.setZoom(randomLocation.zoom);
        }
    }
    sendLocation() {
        function isConnectionReady(conn: ReconnectingWebSocket) {
            return conn.readyState === 1;
        }
        this.isSendingLocation = true;
        this.locationService.getCurrentPosition().then(coords => {
            let groupId = this.route.snapshot.params['groupId'];
            this.memberService.savePosition(groupId, coords.latitude, coords.longitude).then(
                (newMember) => {
                    if (isConnectionReady(this.messageConnection)) {
                        this.sendMemberMessage(newMember);
                    } else {
                        this.messageConnection.onopen = this.sendMemberMessage.bind(this, newMember);
                    }
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
        this.notificationService.notify('Error: Could not save location');
    }
    handleUserInfoFailure() {
        this.notificationService.notify('Error: Could not retrieve user data');
    }
    handleGroupFailure() {
        this.notificationService.notify('Error: Could not read group info');
    }
    handleMemberFailure() {
        this.notificationService.notify('Error: Could not retrieve group members');
    }
    handleMessage(rawMessage) {
        let message: Message = JSON.parse(rawMessage.data);
        let sequence = message.sequence;
        let newMember = message.member;

        if (typeof(this.lastSequenceSeen) === 'undefined') {
            this.lastSequenceSeen = sequence;
        } else if (sequence - this.lastSequenceSeen > 1) {
            this.notificationService.notify('Warning: Message loss detected. Refresh the page');
        }

        /* replace the old member if it already exists */
        var memberExists = false;
        for (let i = 0, len = this.members.length; i < len; i++) {
            if (newMember.id === this.members[i].id) {

                /* push the member back to the top of the list */
                this.members.splice(i, 1);
                memberExists = true;
                break;
            }
        }
        if (!memberExists) {
            this.enabledMembers[newMember.id] = true;
        }
        this.members.unshift(newMember);
        this.changeDetectorRef.detectChanges();
        this.drawMap();
    }
    ngOnDestroy() {
        this.ping.unsubscribe();
        window.removeEventListener('resize', this.resizeEventListener);
    }
    handleWsSendError(error) {
        this.notificationService.notify(`Error: WebSocket send failure - ${error.message}`)
    }
    sendMemberMessage(member: Member) {
        try {
            this.messageConnection.send(JSON.stringify(member));
        } catch (error) {
            this.handleWsSendError(error);
        } finally {
            this.isSendingLocation = false;
        }
    }
    handleResize(ev: UIEvent) {
        let mapEl = document.getElementById('map');
        if (this.mapWidth !== mapEl.offsetWidth) {
            this.drawMap();
        }
    }
}
