import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { GeographicCenterAppComponent } from './geographic-center.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';
import { routing } from './geographic-center.routes';
import { MdRippleModule } from '@angular2-material/core';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list';
import { MdIconModule } from '@angular2-material/icon';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdCheckboxModule } from '@angular2-material/checkbox';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule, 
    FormsModule, 
    MdRippleModule, 
    MdToolbarModule, 
    MdSidenavModule, 
    MdListModule, 
    MdIconModule, 
    MdButtonModule, 
    MdCardModule, 
    MdInputModule, 
    MdTabsModule,
    MdProgressCircleModule,
    MdSlideToggleModule,
    MdCheckboxModule,
    routing
  ],
  declarations: [GeographicCenterAppComponent, AboutComponent, GroupsComponent, GroupDetailsComponent],
  bootstrap: [GeographicCenterAppComponent]
})
export class GeographicCenterModule { }
