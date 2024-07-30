import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { AppConsts } from 'src/shared/AppConsts';
//import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  captchaResolved: boolean = false;
  appBaseUrl: String = AppConsts.urlBaseApp;
  keyCaptcha: String = AppConsts.siteKeyCaptcha;
  loginError: string = "";
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  })
  constructor(private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private router: Router
    , private loginService: LoginService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    const currentUser = this.loginService.getCurrentUserValue;
    //console.log("entra_0");
    if (currentUser) {

      this.router.navigate(['./app/web/inicio']);
    } else {
      this.route.queryParamMap.subscribe((p: any) => {
        if (p['params'].sesion == 'logout') {
          this.toastr.success('Ha cerrado sesión exitosamente', '', {
          });
        }
      });
    }


  }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onClickSubmit(data) {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe({
        next: (userData) => {
        },
        error: (errorData) => {
        },
        complete: () => {
          this.router.navigate(['app', 'web', 'inicio'], {});
          this.loginForm.reset();
        }
      });

    }
    else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Usuario y/o contraseña incorrecto.', 'Error');
    }
  }
  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }
}