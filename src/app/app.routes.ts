import { Routes } from '@angular/router';
import { Informations } from './informations/informations';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Informations },
    { path: 'about-us', component: Informations },
    { path: 'apartaments', component: Informations },
    { path: 'gallery', component: Informations },
    { path: 'discount', component: Informations },
    { path: 'opinions', component: Informations },
    { path: 'contact', component: Informations },

];
