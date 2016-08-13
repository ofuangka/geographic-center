import { Component, OnInit, ViewChild } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';
import { MdInput } from '@angular2-material/input';
import { COMMON_DIRECTIVES } from '@angular/common';
import { UserService } from './services/user.service';
import { User } from './domain/user';
import { BrowserService } from './services/browser.service';
import { GroupService } from './services/group.service';
import { Observer } from './support/observer';
import { NotificationService } from './services/notification.service';
import { NameService } from './services/name.service';
import { MemberService } from './services/member.service';
import { LocationService } from './services/location.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'geographic-center-app',
    templateUrl: 'geographic-center.component.html',
    styleUrls: ['geographic-center.component.css'],
    directives: [
        COMMON_DIRECTIVES,
        ROUTER_DIRECTIVES
    ],
    providers: [
        MdIconRegistry,
        UserService,
        GroupService,
        NotificationService,
        NameService,
        BrowserService,
        MemberService,
        LocationService
    ]
})
export class GeographicCenterAppComponent implements OnInit, Observer {
    views: Object[] = [
        { name: 'Groups', description: 'View your group history', icon: 'group', path: '/groups' },
        { name: 'About', description: 'About Geographic Center', icon: 'help', path: '/about' }
    ];
    formShowing = false;
    username: string;
    isCreatingGroup = false;
    notification: string = '';
    logoutUrl: string;

    @ViewChild(MdInput)
    input: MdInput;
    constructor(private router: Router,
        private userService: UserService,
        private groupService: GroupService,
        private notificationService: NotificationService,
        private nameService: NameService,
        private browserService: BrowserService) { }
    ngOnInit() {
        if (this.browserService.isNotCompatible()) {
            this.notification = 'Your browser is incompatible';
        }
        this.notificationService.subscribe(this);
        this.userService.read().then(user => {
            this.username = user.username;
            this.logoutUrl = user.logoutUrl;
        }, this.handleUserFailure.bind(this));
    }
    showView(view: string) {
        this.router.navigate([view]);
    }
    createGroup(name: string, isPublic: boolean) {

        /* TODO: revisit this because angular2 material form validation isn't straightforward */
        this.isCreatingGroup = true;
        this.groupService.create(name, isPublic).then((group) => {
            this.isCreatingGroup = false;
            this.formShowing = false;
            this.router.navigate(['/groups', group.id]);
        }, this.handleSaveFailure.bind(this));
    }
    handleSaveFailure() {
        this.notification = 'Error: Could not create group';
        this.isCreatingGroup = false;
    }
    notify(message: string) {
        this.notification = message;
    }
    handleUserFailure() {
        this.notification = 'Error: Could not retrieve user data';
    }
    generateRandom() {
        this.input.value = this.nameService.getRandom();
    }
    dismissNotification() {
        this.notification = '';
    }
}
