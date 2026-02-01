import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { imagesInterface } from '../images.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5000';

  getAllImages(): Observable<imagesInterface[]>{
    return this.http.get<imagesInterface[]>(`${this.apiUrl}/gallery`)
  }
}
