import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConsts } from 'src/shared/AppConsts';

@Component({
  selector: 'recuperar-mensaje',
  templateUrl: './recuperar-mensaje.component.html',
  styleUrl: './recuperar-mensaje.component.scss'
})
export class RecuperarMensajeComponent {
  appBaseUrl: String=AppConsts.urlBaseApp;
  mensajeForm=this.formBuilder.group({
  })
  constructor(private formBuilder:FormBuilder
    , private router: Router
  ){
    
  }
}
