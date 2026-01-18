import { Component, inject, output, signal } from '@angular/core';
import { OpinionsService } from '../services/opinions-service';
import { OpinionWindow } from "../opinion-window/opinion-window";
import { opinionsModel } from '../opinions.model';
@Component({
  selector: 'app-opinions',
  imports: [OpinionWindow],
  templateUrl: './opinions.html',
  styleUrl: './opinions.css',
})
export class Opinions {
  selectedCustomer = signal<string>('');
  opinionService = inject(OpinionsService);
  selectedCustomerOutput = output<string>();
  onSelectedCustomer(id: string){
    this.selectedCustomer.set(id);
    // console.log(this.selectedCustomer());
    this.selectedCustomerOutput.emit(this.selectedCustomer());
  }
}
