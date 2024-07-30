import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RecaptchaModule } from "ng-recaptcha";
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

@NgModule({ 
        imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        RecaptchaModule
        ], 
        declarations: [AuthComponent, LoginComponent, RecuperarClaveComponent], 
        providers: [] 
})
export class AccountModule {}

