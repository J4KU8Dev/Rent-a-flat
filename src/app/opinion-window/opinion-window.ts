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
  // apartamentId = signal<string>('');
  apartamentId = signal<opinionsModel | undefined>(undefined);
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);



    // loading changed data
    this.OpinionsService.getOpinionById(this.customerId()).subscribe(data => {
      const opinion = data[0];
      this.opinionWindow.set(opinion);
});
    
    // fetching apartament id
    this.OpinionsService.getOpinionById(this.customerId()).subscribe(data => {
      const apartament = data[0];
      this.apartamentId.set(apartament);
      // change it to image
    })
  }
  
  getStars(rating: 1 | 2 | 3 | 4 | 5){
    return Array(rating).fill(0);
  }
    
}
