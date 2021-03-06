import { Routes, RouterModule } from '@angular/router';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'groups/:groupId', component: GroupDetailsComponent },
    { path: 'groups', component: GroupsComponent },
    { path: 'about', component: AboutComponent }
]
export const routing = RouterModule.forRoot(routes);
