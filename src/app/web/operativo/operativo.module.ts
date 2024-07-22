import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OperativoRoutingModule } from './operativo-routing.module';
import { ListaGestionRegistroComponent } from './lista-gestion-registro/lista-gestion-registro.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BasicAuthInterceptor, ErrorInterceptor } from 'src/auth/services';
import { MyHttpInterceptor } from 'src/auth/services/request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    ListaGestionRegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
    BsDropdownModule.forRoot(),
    OperativoRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true, },
  ]
})
export class OperativoModule { }
