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

    handleTouchStart(event: TouchEvent) {
        let touchObj = event.changedTouches[0];
        this.startX = touchObj.pageX;
        this.startY = touchObj.pageY;
        this.startTime = new Date().getTime();
    }

    handleTouchEnd(event: TouchEvent) {
        let touchObj = event.changedTouches[0],
            xDistance = touchObj.pageX - this.startX,
            yDistance = touchObj.pageY - this.startY,
            elapsedTime = new Date().getTime() - this.startTime,
            maxTime = 300,
            threshold = 75,
            maxError = 50;
        if (elapsedTime <= maxTime) {
            if (Math.abs(xDistance) >= threshold && Math.abs(yDistance) <= maxError) {
                this.tabGroup.selectedIndex = (xDistance < 0) ? 1 : 0;
                event.preventDefault();
            }
        }
    }

}
