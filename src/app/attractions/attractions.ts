import { Component, inject } from '@angular/core';
import { AttractionsService } from '../services/attractions-service';

@Component({
  selector: 'app-attractions',
  imports: [],
  templateUrl: './attractions.html',
  styleUrl: './attractions.css',
})
export class Attractions {
  attractionsService = inject(AttractionsService);
  
}
