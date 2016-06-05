import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { COMMON_DIRECTIVES } from '@angular/common';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { SecurityService } from './security.service';
import { UserInfo } from './user-info';
import { GroupService } from './group.service';
import { LocationService } from './location.service';

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
        SecurityService,
        GroupService,
        LocationService
    ]
})
@Routes([
    { path: '/groups/:groupId', component: GroupDetailsComponent },
    { path: '/groups', component: GroupsComponent },
    { path: '/', component: AboutComponent }
])
export class GeographicCenterAppComponent implements OnInit {
    views: Object[] = [
        { name: 'Groups', description: 'View your group history', icon: 'group', path: '/groups' },
        { name: 'About', description: 'About Geographic Center', icon: 'help', path: '/' }
    ];
    formShowing = false;
    username: string;
    locationNotAvailable = false;
    isCreatingGroup = false;
    constructor(private router: Router,
        private securityService: SecurityService,
        private groupService: GroupService,
        private locationService: LocationService) { }
    ngOnInit() {
        this.securityService.getUserInfo().then((userInfo: UserInfo) => this.username = userInfo.username);
        this.locationService.getCurrentPosition().then(null, this.handleLocationFailure.bind(this));
    }
    showView(view: string) {
        this.router.navigate([view]);
    }
    createGroup() {
        this.isCreatingGroup = true;
        this.locationService.getCurrentPosition().then((coords) => {
            this.groupService.save("", coords.latitude, coords.longitude).then((group) => {
                this.isCreatingGroup = false;
                this.formShowing = false;
                this.router.navigate(['/groups', group.id]);
            }, this.handleSaveFailure);
        }, this.handleLocationFailure);
    }
    handleSaveFailure() {

    }
    handleLocationFailure(reason) {
        this.locationNotAvailable = true;
    }
}
