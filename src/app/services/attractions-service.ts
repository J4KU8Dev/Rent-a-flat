import { inject, Injectable, signal } from '@angular/core';
import { attractionsModel } from '../attractions.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttractionsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  attractions = signal<attractionsModel[]>([]);

  constructor() {
    this.getAllAttractions();
  }

  getAllAttractions() {
    return this.http.get<attractionsModel[]>(`${this.apiUrl}/attractions`).subscribe((data) => {
      this.attractions.set(data);
    })
  }
}
