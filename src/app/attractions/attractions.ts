import { Component, inject } from '@angular/core';
import { AttractionsStorage } from '../services/attractions-storage';

@Component({
  selector: 'app-attractions',
  imports: [],
  templateUrl: './attractions.html',
  styleUrl: './attractions.css',
})
export class Attractions {
  attractionsStorage = inject(AttractionsStorage);
  
}
