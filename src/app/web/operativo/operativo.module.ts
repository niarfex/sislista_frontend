import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OperativoRoutingModule } from './operativo-routing.module';
import { ListaGestionRegistroComponent } from './lista-gestion-registro/lista-gestion-registro.component';



@NgModule({
  declarations: [
    ListaGestionRegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    OperativoRoutingModule
  ]
})
export class OperativoModule { }
