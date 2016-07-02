import { provideRouter, RouterConfig } from '@angular/router';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsComponent } from './groups/groups.component';
import { AboutComponent } from './about/about.component';

export const routes: RouterConfig = [
    { path: 'groups/:groupId', component: GroupDetailsComponent },
    { path: 'groups', component: GroupsComponent },
    { path: '', component: AboutComponent }
]
export const ROUTER_PROVIDERS = [
    provideRouter(routes)
];