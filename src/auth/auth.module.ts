import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../auth/login/login.component';


@NgModule({ declarations: [AuthComponent, LoginComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())] })
export class AccountModule {}

