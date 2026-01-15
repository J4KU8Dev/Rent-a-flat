import { Component, inject, OnInit, signal } from '@angular/core';
import { ApartamentsStorage } from '../services/apartaments-storage';
import { ApartamentsModel } from '../apartaments.model';
import { ZlotyPipe } from '../zloty-pipe';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-apartaments',
  imports: [ZlotyPipe, RouterLink],
  templateUrl: './apartaments.html',
  styleUrl: './apartaments.css',
})
export class Apartaments implements OnInit {
  protected ApartamentsService = inject(ApartamentsStorage);

  ngOnInit(): void {
    this.ApartamentsService.getAllApartaments();
    console.log(this.ApartamentsService.apartaments());
  }
  
}
