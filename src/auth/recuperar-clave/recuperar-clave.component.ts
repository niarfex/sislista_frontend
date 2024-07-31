import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConsts } from 'src/shared/AppConsts';

@Component({
  selector: 'recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.scss'
})
export class RecuperarClaveComponent implements OnInit{
  captchaResolved: boolean = false;
  appBaseUrl: String=AppConsts.urlBaseApp;
  keyCaptcha: String = AppConsts.siteKeyCaptcha;
  recuperarForm=this.formBuilder.group({
    Correo:['',[Validators.required,Validators.email]]
  })
  constructor(private formBuilder:FormBuilder
    , private router: Router
  ){
    
  }
  get Correo() { return this.recuperarForm.controls['Correo'];
  }
  ngOnInit(): void {

  }
  onClickSubmit(data){
    if(this.recuperarForm.valid){
      this.router.navigate(['auth/recuperar-mensaje'],{});
    }
  }
  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }
}
