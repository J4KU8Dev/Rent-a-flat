import { Component, inject, output, signal } from '@angular/core';
import { OpinionsStorage } from '../services/opinions-storage';
import { opinionsModel } from '../opinions.model';
import { OpinionWindow } from "../opinion-window/opinion-window";
@Component({
  selector: 'app-opinions',
  imports: [OpinionWindow],
  templateUrl: './opinions.html',
  styleUrl: './opinions.css',
})
export class Opinions {
  selectedCustomer = signal<string>('');
  Opinions = signal<opinionsModel[]>([]);
  OpinionService = inject(OpinionsStorage);
  selectedCustomerOutput = output<string>();

  constructor() {
    this.Opinions.set(this.OpinionService.getAllOpinions());
  }
  
  onSelectedCustomer(id: string){
    this.selectedCustomer.set(id);
    // console.log(this.selectedCustomer());
    this.selectedCustomerOutput.emit(this.selectedCustomer());
  }
}
