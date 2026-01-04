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
  // id = signal<string | null>('');
  id: string | null = '';
  route = inject(ActivatedRoute);
  apartamentView = signal<ApartamentsModel | undefined>(undefined);
  apartamentsStorage = inject(ApartamentsStorage);

  ngOnInit(): void {
    this.apartamentView.set(this.apartamentsStorage.getApartamentById(this.id!))
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
