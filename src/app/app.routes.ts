import { Routes } from '@angular/router';
import { Informations } from './informations/informations';
import { Gallery } from './gallery/gallery';
import { Apartaments } from './apartaments/apartaments';
import { Contact } from './contact/contact';
import { Opinions } from './opinions/opinions';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Informations },
    { path: 'apartaments', component: Apartaments },
    { path: 'gallery', component: Gallery },
    { path: 'forCompanies', component: Gallery },
    { path: 'opinions', component: Opinions },
    { path: 'contact', component: Contact },

];
