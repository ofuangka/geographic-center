import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { GeographicCenterAppComponent } from './geographic-center.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';
import { routing } from './geographic-center.routes';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing ],
  declarations: [ GeographicCenterAppComponent, GroupDetailsComponent, GroupsComponent, AboutComponent ],
  bootstrap: [ GeographicCenterAppComponent ]
})
export class GeographicCenterModule {}
