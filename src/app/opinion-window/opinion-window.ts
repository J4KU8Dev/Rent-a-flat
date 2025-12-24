import { Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { OpinionsStorage } from '../opinions-storage';
import { opinionsModel } from '../opinions.model';

@Component({
  selector: 'app-opinion-window',
  imports: [],
  templateUrl: './opinion-window.html',
  styleUrl: './opinion-window.css',
})
export class OpinionWindow implements OnChanges {
  protected OpinionsStorage = inject(OpinionsStorage);
  opinionWindow = signal<opinionsModel | undefined>(undefined);
  customerId = input<string>();
  
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    this.opinionWindow.set(this.OpinionsStorage.getOpinionById(this.customerId()));
  }
    
}
