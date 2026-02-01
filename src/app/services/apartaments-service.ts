import { inject, Injectable, signal } from '@angular/core';
import { ApartamentsModel } from '../apartaments.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartamentsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  apartaments = signal<ApartamentsModel[]>([]);

  getAllApartaments(): Observable<ApartamentsModel[]> {
    return this.http.get<ApartamentsModel[]>(`${this.apiUrl}/apartaments`);
  }
  getApartamentById(id: string): Observable<ApartamentsModel> {
    return this.http.get<ApartamentsModel>(`${this.apiUrl}/apartaments/${id}`);
  }

}
