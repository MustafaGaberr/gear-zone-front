import { Routes } from '@angular/router';
import { Login } from './shared/components/login/login';
import { Register } from './shared/components/register/register';
import { Regster2 } from './shared/components/regster2/regster2';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:"login" ,component: Login},
    {path:"register" ,component: Register},
    {path:"regster2" ,component: Regster2}
];
