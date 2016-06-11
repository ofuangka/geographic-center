import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { NotificationService } from '../notification.service';

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
    constructor(private groupService: GroupService, private notificationService: NotificationService) { }
    ngOnInit() {
        this.isLoading = true;
        this.groupService.list().then(groups => {
            this.groups = groups.sort(function (a, b) { return b.createdTs - a.createdTs });
            this.isLoading = false;
        }, () => {
            this.handleGroupsFailure();
            this.isLoading = false;
        });
    }
    handleGroupsFailure() {
        this.notificationService.notify('Error: Could not retrieve groups');
    }
}
