import { Component, OnInit, ViewChild } from '@angular/core';
import { MdTabGroup } from '@angular2-material/tabs';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'app-about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {

    @ViewChild(MdTabGroup)
    tabGroup: MdTabGroup;

    private startX: number;
    private startY: number;
    private startTime: number;

    constructor() { }

    ngOnInit() { }

}
