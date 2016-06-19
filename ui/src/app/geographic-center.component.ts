import { Component, OnInit, ViewChild } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { COMMON_DIRECTIVES } from '@angular/common';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { UserService } from './services/user.service';
import { User } from './domain/user';
import { BrowserService } from './services/browser.service';
import { GroupService } from './services/group.service';
import { Observer } from './support/observer';
import { NotificationService } from './services/notification.service';
import { NameService } from './services/name.service';

@Component({
    moduleId: module.id,
    selector: 'geographic-center-app',
    templateUrl: 'geographic-center.component.html',
    styleUrls: ['geographic-center.component.css'],
    directives: [
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        COMMON_DIRECTIVES,
        ROUTER_DIRECTIVES
    ],
    providers: [
        MdIconRegistry,
        UserService,
        GroupService,
        NotificationService,
        NameService,
        BrowserService
    ]
})
@Routes([
    { path: '/groups/:groupId', component: GroupDetailsComponent },
    { path: '/groups', component: GroupsComponent },
    { path: '/', component: AboutComponent }
])
export class GeographicCenterAppComponent implements OnInit, Observer {
    views: Object[] = [
        { name: 'Groups', description: 'View your group history', icon: 'group', path: '/groups' },
        { name: 'About', description: 'About Geographic Center', icon: 'help', path: '/' }
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
    createGroup(name: string) {

        /* TODO: revisit this because angular2 material form validation isn't straightforward */
        this.isCreatingGroup = true;
        this.groupService.create(name).then((group) => {
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
