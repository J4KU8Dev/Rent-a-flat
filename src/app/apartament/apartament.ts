import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartamentsStorage } from '../apartaments-storage';
import { ApartamentsModel } from '../apartaments.model';

@Component({
  selector: 'app-apartament',
  imports: [],
  templateUrl: './apartament.html',
  styleUrl: './apartament.css',
})
export class Apartament implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apartamentsStorage = inject(ApartamentsStorage);
  apartament = signal<ApartamentsModel | undefined>(undefined);
  ngOnInit(): void {
    const id = signal(this.route.snapshot.params['id']);
    this.apartament.set(this.apartamentsStorage.getApartamentById(id()))
  }
}
