import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
import { DashboardShellComponent } from './pages/dashboard/dashboard-shell/dashboard-shell.component';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { AuthLayaout } from './shared/layout/auth-layaout/auth-layaout';
import { BlanckLayout } from './shared/layout/blanck-layout/blanck-layout';

export const routes: Routes = [
  { path: '',redirectTo:'home',pathMatch:'full' },
  {path:'',component:AuthLayaout,children:[
      { path: 'login', component: Login },
      { path: 'register', component: Register }

   ]
  },
  {
    path:'',component:BlanckLayout,children:[
        {path:'home', loadComponent: () => import('./pages/home/home.component').then(m=>m.HomeComponent)},
       {
          path: 'product-details',
          loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
        },
        {
          path:'cart',loadComponent:()=>import('./pages/home/components/cart/cart').then(m=>m.Cart)
        },

    ]

  },

  // { path: 'login', component: Login },
  // { path: 'register', component: Register },
 
  {
    path: 'dashboard',
    component: DashboardShellComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      
      {
        path: 'profile',
        loadComponent: () => import('./pages/dashboard/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/dashboard/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/dashboard/my-orders/my-orders.component').then(m => m.MyOrdersComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/dashboard/notifications/notifications.component').then(m => m.NotificationsComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./pages/dashboard/messages/messages.component').then(m => m.MessagesComponent)
      },
    
    ]
  },
  { path: '**', redirectTo: '' }
];
