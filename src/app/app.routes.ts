import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GroupDrawPageComponent } from './pages/group-draw-page/group-draw-page.component';
import { GroupsListPageComponent } from './pages/groups-list-page/groups-list-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home',
        component: HomePageComponent
    },
    {
        path: 'group-draw',
        title: 'Group Draw',
        component: GroupDrawPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'groups-list',
        title: 'Groups List',
        component: GroupsListPageComponent,
        pathMatch: 'full'
    }
];
