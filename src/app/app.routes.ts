import { Routes } from '@angular/router';
import { Informations } from './informations/informations';
import { Gallery } from './gallery/gallery';
import { Apartaments } from './apartaments/apartaments';
import { Contact } from './contact/contact';
import { Opinions } from './opinions/opinions';
import { Attractions } from './attractions/attractions';
import { Apartament } from './apartament/apartament';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Informations },
    { path: 'apartaments', component: Apartaments },
    { path: 'apartaments/:id', component: Apartament },
    { path: 'gallery', component: Gallery },
    { path: 'attractions', component: Attractions },
    { path: 'opinions', component: Opinions },
    { path: 'contact', component: Contact },
    // {path: '**', component: PageNotFoundComponent},

];
