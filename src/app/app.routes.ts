import { Routes } from '@angular/router';
import { AuthService } from './services/auth-service';
import { authGuard } from './services/auth-guard';
import { roleGuard } from './services/role-guard';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: 'home', 
        loadComponent: () => import('./informations/informations').then((m) => m.Informations), 
    },
    { 
        path: 'apartaments', 
        loadComponent: () => import('./apartaments/apartaments').then((m) => m.Apartaments), 
    },
    { 
        path: 'apartaments/:id', 
        loadComponent: () => import('./apartament/apartament').then((m) => m.Apartament), 
    },
    { 
        path: 'gallery', 
        loadComponent: () => import('./gallery/gallery').then((m) => m.Gallery), 
    },
    { 
        path: 'attractions', 
        loadComponent: () => import('./attractions/attractions').then((m) => m.Attractions), 
    },
    { 
        path: 'opinions', 
        loadComponent: () => import('./opinions/opinions').then((m) => m.Opinions), 
    },
    { 
        path: 'contact', 
        loadComponent: () => import('./contact/contact').then((m) => m.Contact), 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login').then((m) => m.Login), 
    },
    { 
        path: 'account', 
        loadComponent: () => import('./auth/account/account').then((m) => m.Account),
        canActivate:[authGuard],
    },
    { 
        path: 'createAccount', 
        loadComponent: () => import('./auth/create-account/create-account').then((m) => m.CreateAccount),
    },
    { 
        path: 'userManagement',
        loadComponent: () => import('./user-management/user-management').then((m) => m.UserManagement),
        canActivate:[authGuard, roleGuard],
        data:{ roles: ['Admin', 'Head Admin'] },
    },
    { 
        path: '**', 
        loadComponent: () => import('./page-not-found/page-not-found').then((m) => m.PageNotFound), 
    },
    // add here auth guard!!!
];
