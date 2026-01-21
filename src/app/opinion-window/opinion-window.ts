import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { OpinionsService } from '../services/opinions-service';
import { opinionsModel } from '../opinions.model';
import { ApartamentsService } from '../services/apartaments-service';
import { ApartamentsModel } from '../apartaments.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opinion-window',
  imports: [],
  templateUrl: './opinion-window.html',
  styleUrl: './opinion-window.css',
})
export class OpinionWindow implements OnChanges {
  protected ApartamentsService = inject(ApartamentsService);
  protected OpinionsService = inject(OpinionsService);
  route = inject(ActivatedRoute);
  customerId = input<string>('');

  opinionWindow = signal<opinionsModel | undefined>(undefined);
  apartamentImage = signal<ApartamentsModel | undefined>(undefined);
  apartamentId = signal<string>('')
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);

    // loading changed data
    this.OpinionsService.getOpinionById(this.customerId()).subscribe(data => {
      // console.log(this.opinionWindow());
      this.opinionWindow.set(data);
    });
    
    // fetching apartament id
    this.OpinionsService.getOpinionById(this.customerId()).subscribe(data => {
      this.apartamentId.set(data.CustomerId);
    })
    // console.log(this.apartamentId());

    console.log(`Changed data {
      customer: ${this.customerId()}
      apartamentId: ${this.apartamentId()}
      data: ${this.opinionWindow()}
      }
      `)
  }
  
  getStars(rating: 1 | 2 | 3 | 4 | 5){
    return Array(rating).fill(0);
  }
    
}
