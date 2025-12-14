import { Component, inject, signal } from '@angular/core';
import { ApartamentsStorage } from '../apartaments-storage';
import { ApartamentsModel } from '../apartaments.model';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-apartaments',
  imports: [CurrencyPipe],
  templateUrl: './apartaments.html',
  styleUrl: './apartaments.css',
})
export class Apartaments {
  ApartamentsService = inject(ApartamentsStorage);
  Apartaments = signal<ApartamentsModel[]>(this.ApartamentsService.getAllApartaments());
  

}
