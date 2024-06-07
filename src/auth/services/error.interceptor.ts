import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: LoginService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          // location.reload(true);
        }
        if (err.statusText === 'Unknown Error') {
          const error = {
            message: '',
          };
          error.message = 'El servidor no se encuentra disponible';
          return throwError(error);
        } else if (err.status === 405) {
          console.log(err.message);
          let error = { message: 'El servidor no se encuentra disponible'};
          return throwError(error);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
