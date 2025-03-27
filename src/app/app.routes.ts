import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LayoutComponent } from './features/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';
import { CreateUpdateUserComponent } from './features/create-update-user/create-update-user.component';
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