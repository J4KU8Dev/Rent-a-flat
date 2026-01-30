import { inject, Injectable, signal } from '@angular/core';
import { opinionsModel } from '../opinions.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpinionsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  opinions = signal<opinionsModel[]>([]);
  customerId = signal<string>('');

  getAllOpinions(): Observable<opinionsModel[]> {
   return this.http.get<opinionsModel[]>(`${this.apiUrl}/opinions`);
  }

  getOpinionById(customerId: string) {
     return this.http.get<opinionsModel[]>(`${this.apiUrl}/opinions?CustomerId=${customerId}`);
  }
}
