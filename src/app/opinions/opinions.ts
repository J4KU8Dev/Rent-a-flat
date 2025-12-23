import { Component, inject, signal } from '@angular/core';
import { OpinionsStorage } from '../opinions-storage';
import { opinionsModel } from '../opinions.model';
@Component({
  selector: 'app-opinions',
  imports: [],
  templateUrl: './opinions.html',
  styleUrl: './opinions.css',
})
export class Opinions {
  Opinions = signal<opinionsModel[]>([]);
  OpinionService = inject(OpinionsStorage);

  constructor() {
    this.Opinions.set(this.OpinionService.getAllOpinions());
  }

}
