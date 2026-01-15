import { inject, Injectable, signal } from '@angular/core';
import { ApartamentsModel } from '../apartaments.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApartamentsStorage {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000'
  apartaments = signal<ApartamentsModel[]>([]);

  constructor() {
    this.getAllApartaments();
  }

  getAllApartaments() {
    return this.http.get<ApartamentsModel[]>(`${this.apiUrl}/apartaments`).subscribe(data => {
        this.apartaments.set(data);
      });;
  }
  getApartamentById(id: string) {
    return this.http.get<ApartamentsModel>(`${this.apiUrl}/apartaments/${id}`);
  }

}
