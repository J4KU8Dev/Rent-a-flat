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
  private opinionsService = inject(OpinionsService);
  private apartamentsService = inject(ApartamentsService);

  customerId = input<string>();

  opinionWindow = signal<opinionsModel | null>(null);
  apartamentImage = signal<ApartamentsModel | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    const id = this.customerId();

    if (!id) {
      return;
    }

    this.opinionsService.getOpinionById(id).subscribe(opinion => {
      this.opinionWindow.set(opinion);

      this.apartamentsService
        .getApartamentById(opinion.apartamentId)
        .subscribe(apartment => {
          this.apartamentImage.set(apartment);
        });
    });
  }

  getStars(rating: 1 | 2 | 3 | 4 | 5) {
    return Array(rating);
  }
}
  // protected ApartamentsService = inject(ApartamentsService);
  // protected OpinionsService = inject(OpinionsService);
  
  // customerId = input<string>();

  // route = inject(ActivatedRoute)
  // opinionWindow = signal<opinionsModel | undefined>(undefined);
  
  // apartamentImage = signal<ApartamentsModel | undefined>(undefined);
  // id = signal<string>('');

  // ngOnInit(): void {
  //   const id = signal(this.route.snapshot.params['id']);
  //   if(!id){
  //     return;
  //   }
  //   this.OpinionsService.getOpinionById(id());
  // }

  // ngOnChanges(changes: SimpleChanges){
  //   console.log(changes);
  //   this.OpinionsService.getOpinionById(this.id());
  //   // this.opinionWindow.set(this.OpinionsService.getOpinionById(this.id()));


  //   this.OpinionsService.getOpinionById(this.customerId()).subscribe((data) => {
  //     this.id.set(data);
  //   })
  //   // this.id.set(this.OpinionsService.getOpinionById(this.customerId()));
    
  //   this.ApartamentsService.getApartamentById(this.id()).subscribe(data => {
  //     this.apartamentImage.set(data);
  //   })
  // }
  
  // getStars(rating: 1 | 2 | 3 | 4 | 5){
  //   return Array(rating).fill(0);
  // }
    
// }
