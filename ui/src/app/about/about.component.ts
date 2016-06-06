import { Component, OnInit } from '@angular/core';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { NotificationService } from '../notification.service';

@Component({
    moduleId: module.id,
    selector: 'app-about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css'],
    directives: [MD_TABS_DIRECTIVES, MD_CARD_DIRECTIVES]
})
export class AboutComponent implements OnInit {

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.clear();
    }

}
