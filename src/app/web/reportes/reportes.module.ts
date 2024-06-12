import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteMapaComponent } from './reporte-mapa/reporte-mapa.component';
import { ReporteEstadosComponent } from './reporte-estados/reporte-estados.component';



@NgModule({
  declarations: [
    ReporteMapaComponent,
    ReporteEstadosComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
