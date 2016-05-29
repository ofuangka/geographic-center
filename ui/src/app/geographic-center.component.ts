import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { COMMON_DIRECTIVES } from '@angular/common'

@Component({
    moduleId: module.id,
    selector: 'geographic-center-app',
    templateUrl: 'geographic-center.component.html',
    styleUrls: ['geographic-center.component.css'],
    directives: [MD_SIDENAV_DIRECTIVES, MD_LIST_DIRECTIVES, MD_ICON_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_CARD_DIRECTIVES, MD_INPUT_DIRECTIVES, COMMON_DIRECTIVES],
    providers: [MdIconRegistry]
})
export class GeographicCenterAppComponent {
    views: Object[] = [
        {name: 'Groups', description: 'View the history of your past groups', icon: 'list'},
        {name: 'Getting started', description: 'Read an explanation on how to get started', icon: 'help'}
    ];
    formShowing = false;
    username: string;
}
