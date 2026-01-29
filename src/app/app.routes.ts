import { Routes } from '@angular/router';
import { DashboardShellComponent } from './pages/dashboard/dashboard-shell/dashboard-shell.component';
import { AuthLayaout } from './shared/layout/auth-layaout/auth-layaout';
import { BlanckLayout } from './shared/layout/blanck-layout/blanck-layout';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Auth routes (login/register) - only accessible when NOT logged in
  {
    path: '',
    component: AuthLayaout,
    canActivate: [loggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgotpassword/forgotpassword').then(m => m.Forgotpassword)
      }
    ]
  },

  // Public routes - accessible to everyone (no authGuard)
  {
    path: '',
    component: BlanckLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'product-details/:id',
        loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home/components/cart/cart').then(m => m.Cart)
      },
    ]
  },

  // Dashboard routes - protected (require login)
  {
    path: 'dashboard',
    component: DashboardShellComponent,
    canActivate: [authGuard],
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
