import { inject, Injectable, signal } from '@angular/core';
import { ApartamentsModel } from '../apartaments.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartamentsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  getAllApartaments(): Observable<ApartamentsModel[]> {
    return this.http.get<ApartamentsModel[]>(`${this.apiUrl}/apartaments`)
    .pipe(catchError(error => {
      console.error('An error ocured: ', error);
      throw error;
    }));
  }
  getApartamentById(id: string): Observable<ApartamentsModel> {
    return this.http.get<ApartamentsModel>(`${this.apiUrl}/apartaments/${id}`)
    .pipe(catchError(error => {
      console.error('An error ocured: ', error);
      throw error;
      }));
  }

}
