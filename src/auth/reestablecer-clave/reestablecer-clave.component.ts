import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AppConsts } from 'src/shared/AppConsts';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-reestablecer-clave',
  templateUrl: './reestablecer-clave.component.html',
  styleUrl: './reestablecer-clave.component.scss'
})


export class ReestablecerClaveComponent {
  captchaResolved: boolean = false;
  appBaseUrl: String = AppConsts.urlBaseApp;
  keyCaptcha: String = AppConsts.siteKeyCaptcha;
  mostrarForm:boolean=false;
  token: String = "";
  recuperarForm = this.formBuilder.group({
    newPassword: ['', [ Validators.pattern(StrongPasswordRegx)]],
    renewPassword: ['', [Validators.pattern(StrongPasswordRegx)]]
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private router: Router
    , private _route: ActivatedRoute
    , private toastr: ToastrService
    , private spinner: NgxSpinnerService
  ) {
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
  }
  get newPassword() { return this.recuperarForm.controls['newPassword']; }
  get renewPassword() { return this.recuperarForm.controls['renewPassword']; }
  ngOnInit(): void {
    this.token = this._route.snapshot.paramMap.get('token');
    if (this.token.trim() == "") {
      this.router.navigate(['auth/login'], {});
    }
    else {
      this.spinner.show();
      this.usuarioServiceProxy.ValidarTokenReseteo(this.token)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.mostrarForm=true;
            }
            else {
              this.toastr.error(result.message.toString(), 'Error');
              this.router.navigate(['auth/login'], {});
            }
          }
        });   
    }
  }
  onClickSubmit(data) {
    if (this.newPassword.value != this.renewPassword.value) {
      this.toastr.error("Las contraseñas deben ser iguales", 'Error');
      return;
    }
    if (this.newPassword.value.indexOf(" ")>=0) {
      this.toastr.error("La contraseña no debe tener espacios vacios", 'Error');
      return;
    }
    if (!this.newPassword?.value?.match('^(?=.*[A-Z])')
      || !this.newPassword?.value?.match('(?=.*[a-z])')
      || !this.newPassword?.value?.match('(.*[0-9].*)')
      || !this.newPassword?.value?.match('(?=.*[!@#$%^&*])')
      || !this.newPassword?.value?.match('.{8,}')) {
      this.toastr.error("Las contraseñas deben cumplir los patrones de seguridad", 'Error');
      return;
    }
    if (this.recuperarForm.valid) {
      this.spinner.show();
      this.usuarioServiceProxy.ActualizarClave(this.newPassword.value,this.renewPassword.value,this.token)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.toastr.success(result.message.toString(), 'Información');
              this.router.navigate(['auth/login'], {});
            }
            else {
              this.toastr.error(result.message.toString(), 'Error');
            }
          }
        });      
    }
  }
  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.recuperarForm.controls[nombreControl].setValue(event.target.value.trim());
  }
}
