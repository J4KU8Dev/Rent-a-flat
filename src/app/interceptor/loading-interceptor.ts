import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../loader/loader-service';
import { catchError, finalize, throwError } from 'rxjs';
import { PopUp } from '../pop-up/pop-up';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const popUpService = inject(PopUp);
  loaderService.show();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 0){
        popUpService.showError('Cannot connect to server. Please check if the backend is running.','Connection Error');
      }
      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.hide();
    })
  )
};
