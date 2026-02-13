import { inject, Injectable, signal } from '@angular/core';
import { attractionsModel } from '../attractions.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttractionsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  getAllAttractions(): Observable<attractionsModel[]> {
    return this.http.get<attractionsModel[]>(`${this.apiUrl}/attractions`)
    .pipe(catchError(error => {
      console.error('An error ocured: ', error);
        return throwError(() => error);
    }));;
  }
}
