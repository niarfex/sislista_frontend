import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RecaptchaModule } from "ng-recaptcha";
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { RecuperarMensajeComponent } from './recuperar-mensaje/recuperar-mensaje.component';
import { ReestablecerClaveComponent } from './reestablecer-clave/reestablecer-clave.component';
import { PasswordStrengthMeterComponent } from 'angular-password-strength-meter';
@NgModule({ 
        imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        RecaptchaModule,
        PasswordStrengthMeterComponent
        ], 
        declarations: [AuthComponent, LoginComponent, RecuperarClaveComponent, RecuperarMensajeComponent, ReestablecerClaveComponent], 
        providers: [] 
})
export class AccountModule {}

