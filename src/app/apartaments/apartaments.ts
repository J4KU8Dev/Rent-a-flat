import { Component, inject, OnInit, signal } from '@angular/core';
import { ApartamentsService } from '../services/apartaments-service';
import { ApartamentsModel } from '../apartaments.model';
import { ZlotyPipe } from '../zloty-pipe';
import { RouterLink } from "@angular/router";
import { PopUp } from '../pop-up/pop-up';

@Component({
  selector: 'app-apartaments',
  imports: [ZlotyPipe, RouterLink],
  templateUrl: './apartaments.html',
  styleUrl: './apartaments.css',
})
export class Apartaments implements OnInit {
  protected ApartamentsService = inject(ApartamentsService);
  apartaments = signal<ApartamentsModel[]>([]);
  popUpService = inject(PopUp);
  ngOnInit(): void {
    this.ApartamentsService.getAllApartaments().subscribe({
      next: (data) => {
        this.apartaments.set(data);
      },
      error: (error) => {
        this.popUpService.showError(error.message, error.name);
      },
      complete: () => {},      
    })
  }
  
}
