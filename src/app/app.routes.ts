import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardShellComponent } from './pages/dashboard/dashboard-shell/dashboard-shell.component';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
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
