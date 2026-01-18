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
export class OpinionWindow implements OnChanges, OnInit {
  protected ApartamentsService = inject(ApartamentsService);
  protected OpinionsService = inject(OpinionsService);
  route = inject(ActivatedRoute)
  opinionWindow = signal<opinionsModel | undefined>(undefined);
  customerId = input<string>();
  apartamentImage = signal<ApartamentsModel | undefined>(undefined);
  id = signal<string>('');

  ngOnInit(): void {
    const id = signal(this.route.snapshot.params['id']);
    if(!id){
      return;
    }
    this.OpinionsService.getOpinionById(id());
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    this.opinionWindow.set(this.OpinionsService.getOpinionById(this.id()));
    this.id.set(this.OpinionsService.getOpinionById(this.customerId()).apartamentId);
    this.ApartamentsService.getApartamentById(this.id()!).subscribe(data => {
      this.apartamentImage.set(data);
    })
  }
  
  getStars(rating: 1 | 2 | 3 | 4 | 5){
    return Array(rating).fill(0);
  }
    
}
