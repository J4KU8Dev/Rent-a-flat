import { inject, Injectable, signal } from '@angular/core';
import { opinionsModel } from '../opinions.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpinionsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';
  opinions = signal<opinionsModel[]>([]);
  customerId = signal<string>('');
  constructor() {
    this.getAllOpinions();
  }

  getAllOpinions() {
     return this.http.get<opinionsModel[]>(`${this.apiUrl}/apartaments`).subscribe((data) => {
          this.opinions.set(data);
          });;
  }

  // getOpinionById(id:string | undefined): opinionsModel | undefined {
  //   return this.opinions().find((opinion) => opinion.CustomerId === id);
  // } old version

  getOpinionById(id: string): Observable<opinionsModel> {
    return this.http.get<opinionsModel>(`${this.apiUrl}/attractions/${id}`);
  }
}
