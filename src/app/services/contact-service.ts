import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000';
  
  createMessage(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/messages`, data);
  }
  contactAboutApartament(data: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/contact`, data);
  }
}
