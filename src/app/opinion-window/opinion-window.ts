import { Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { OpinionsStorage } from '../services/opinions-storage';
import { opinionsModel } from '../opinions.model';
import { ApartamentsStorage } from '../services/apartaments-storage';
import { ApartamentsModel } from '../apartaments.model';

@Component({
  selector: 'app-opinion-window',
  imports: [],
  templateUrl: './opinion-window.html',
  styleUrl: './opinion-window.css',
})
export class OpinionWindow implements OnChanges {
  protected ApartamentsStorage = inject(ApartamentsStorage);
  protected OpinionsStorage = inject(OpinionsStorage);

  opinionWindow = signal<opinionsModel | undefined>(undefined);
  customerId = input<string>();
  apartamentImage = signal<ApartamentsModel | undefined>(undefined);
  id = signal<string | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes);
    this.opinionWindow.set(this.OpinionsStorage.getOpinionById(this.customerId()));
    this.id.set(this.OpinionsStorage.getOpinionById(this.customerId())?.apartamentId);
    // this.apartamentImage.set(this.ApartamentsStorage.getApartamentById(this.id()));
    this.ApartamentsStorage.getApartamentById(this.id()!).subscribe(data => {
      this.apartamentImage.set(data);
    })
  }
  
  getStars(rating: 1 | 2 | 3 | 4 | 5){
    return Array(rating).fill(0);
  }
    
}
