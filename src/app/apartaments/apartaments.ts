import { Component, inject, signal } from '@angular/core';
import { ApartamentsStorage } from '../apartaments-storage';
import { ApartamentsModel } from '../apartaments.model';
import { ZlotyPipe } from '../zloty-pipe';
@Component({
  selector: 'app-apartaments',
  imports: [ZlotyPipe],
  templateUrl: './apartaments.html',
  styleUrl: './apartaments.css',
})
export class Apartaments {
  protected ApartamentsService = inject(ApartamentsStorage);
  Apartaments = signal<ApartamentsModel[]>(this.ApartamentsService.getAllApartaments());
  

}
