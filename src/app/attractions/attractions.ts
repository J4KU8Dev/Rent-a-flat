import { Component, inject, OnInit, signal } from '@angular/core';
import { AttractionsService } from '../services/attractions-service';
import { attractionsModel } from '../attractions.model';

@Component({
  selector: 'app-attractions',
  imports: [],
  templateUrl: './attractions.html',
  styleUrl: './attractions.css',
})
export class Attractions implements OnInit{
  attractionsService = inject(AttractionsService);
  attractions = signal<attractionsModel[]>([]);

  // cards = document.querySelectorAll('.card');
  // observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if(entry.isIntersecting){
  //       console.log(entry.target);
  //     }
  //   })
  // }, {})
  
  ngOnInit(): void {
    this.attractionsService.getAllAttractions().subscribe(data => {
      this.attractions.set(data);
    })
  }

}
