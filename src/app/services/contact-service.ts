import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { contactAboutApartament, contanctMessageModel, needACallModel } from '../contact-models';
import { PopUp } from '../pop-up/pop-up';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5000';
  public popUpService = inject(PopUp);

  createMessage(data: contanctMessageModel): Observable<contanctMessageModel>{
    return this.http.post<contanctMessageModel>(`${this.apiUrl}/messages`, data)
    .pipe(
      catchError(error => {
        console.error('An error ocured: ', error);
        this.popUpService.showError('Failed to connect to Database. We are already fixing it. Sorry!','Database Error');
        // prevent function showSuccess()
        return throwError(() => error);
      })
    );
  }
  contactAboutApartament(data: contactAboutApartament): Observable<contactAboutApartament>{
    return this.http.post<contactAboutApartament>(`${this.apiUrl}/contact`, data)
    .pipe(
      catchError(error => {
        console.error('An error ocured: ', error);
        throw error;
      })
    );
  }
  needToCall(data: needACallModel): Observable<needACallModel>{
    return this.http.post<needACallModel>(`${this.apiUrl}/PhoneNumbersToCall`, data)
    .pipe(
      catchError(error => {
        console.error('An error ocured: ', error);
        throw error;

      })
    );
  }
}
