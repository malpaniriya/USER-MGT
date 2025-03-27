import { Routes } from '@angular/router';
import { LoginComponent } from './Features/login/login.component';
import { LayoutComponent } from './Features/layout/layout.component';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { UserListComponent } from './Features/user-list/user-list.component';
import { UserDetailsComponent } from './Features/user-details/user-details.component';
import { CreateUpdateUserComponent } from './Features/create-update-user/create-update-user.component';

export const routes: Routes = [
    
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'user-list',
                component:UserListComponent
            },
            {
                path:'user-details',
                component:UserDetailsComponent
            },
            {
                path:'create-update-user',
                component:CreateUpdateUserComponent
            }
        ]
    }
];
