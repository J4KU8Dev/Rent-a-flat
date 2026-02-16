import { Component, inject, OnInit, signal } from '@angular/core';
import { AttractionsService } from '../services/attractions-service';
import { attractionsModel } from '../attractions.model';
import { PopUp } from '../pop-up/pop-up';

@Component({
  selector: 'app-attractions',
  imports: [],
  templateUrl: './attractions.html',
  styleUrl: './attractions.css',
})
export class Attractions implements OnInit{
  attractionsService = inject(AttractionsService);
  attractions = signal<attractionsModel[]>([]);
  popUpService = inject(PopUp);
  
  ngOnInit(): void {
    this.attractionsService.getAllAttractions().subscribe({
      next:(data) => {
        this.attractions.set(data);
      },
      error:() => {
        this.popUpService.showError('Refused to connect with Database.','Database Error')
      },
      complete:() => {}
    })
  }
}
