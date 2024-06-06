import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: LoginService,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const currentUser = this.authenticationService
      .getCurrentUserValue;
    if (currentUser) {
        const helper = new JwtHelperService();
        const token = sessionStorage.getItem('token');
        if (helper.isTokenExpired(token)) {
            console.log("ruteo_auth");
          this.router.navigate(['/auth/']);
          setTimeout(() => {
            this.toastr.show(
              'Tiempo expirado, por favor inicie sesión nuevamente',
              'Aviso'
            );
          }, 100);
          return false;
        } 
        else {
          return true;
        } 
    } else {
      this.router.navigate(['/auth/']);
      setTimeout(() => {
        this.toastr.show(
          'Por favor inicie sesión',
          'Aviso'
        );
      }, 100);
      return false;
    }
  }
}
