import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { COMMON_DIRECTIVES } from '@angular/common';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';
import { GroupDetailsComponent } from './group-details/group-details.component';

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
        MdIconRegistry
    ]
})
@Routes([
    {path: '/groups/:groupId', component: GroupDetailsComponent},
    {path: '/groups', component: GroupsComponent},
    {path: '/about', component: AboutComponent},
    {path: '*', component: GroupsComponent}
])
export class GeographicCenterAppComponent {
    views: Object[] = [
        {name: 'Groups', description: 'View your group history', icon: 'group', path: '/groups'},
        {name: 'About', description: 'About Geographic Center', icon: 'map', path: '/about'}
    ];
    formShowing = false;
    username: string;
    constructor(private router: Router) {}
    showView(view: string) {
        this.router.navigate([view]);
    }
}
