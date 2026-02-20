import { Routes } from '@angular/router';

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
        path: '**', 
        loadComponent: () => import('./page-not-found/page-not-found').then((m) => m.PageNotFound), 
    },
];
