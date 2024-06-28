import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.loginService.getCurrentUserValue;
    if (currentUser && currentUser.AccesToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.AccesToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
