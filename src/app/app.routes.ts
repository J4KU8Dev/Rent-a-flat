import { Routes } from '@angular/router';
import { Informations } from './informations/informations';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Informations }
];
