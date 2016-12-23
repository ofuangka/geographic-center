import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { GeographicCenterAppComponent } from './geographic-center.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';
import { routing } from './geographic-center.routes';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule, 
    FormsModule, 
    MaterialModule.forRoot(),
    routing
  ],
  declarations: [GeographicCenterAppComponent, AboutComponent, GroupsComponent, GroupDetailsComponent],
  bootstrap: [GeographicCenterAppComponent]
})
export class GeographicCenterModule { }
