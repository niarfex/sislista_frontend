import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AppConsts } from 'src/shared/AppConsts';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';


@Component({
  selector: 'recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.scss',  
})
export class RecuperarClaveComponent implements OnInit{
  captchaResolved: boolean = false;
  appBaseUrl: String=AppConsts.urlBaseApp;
  keyCaptcha: String = AppConsts.siteKeyCaptcha;
  password:string;
  recuperarForm=this.formBuilder.group({
    Correo:['',[Validators.required,Validators.email]]
  })
  private usuarioServiceProxy: UsuarioServiceProxy;
  constructor(_injector: Injector
    , private formBuilder:FormBuilder
    , private router: Router
    , private toastr: ToastrService
    , private spinner: NgxSpinnerService
  ){
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
  }
  get Correo() { return this.recuperarForm.controls['Correo']; }

  ngOnInit(): void {

  }
  onClickSubmit(data){
    if(this.recuperarForm.valid){
      this.spinner.show();
      this.usuarioServiceProxy.ReestablecerClave(this.Correo.value)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.router.navigate(['auth/recuperar-mensaje'], {});
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
}
