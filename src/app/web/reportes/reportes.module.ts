import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteMapaComponent } from './reporte-mapa/reporte-mapa.component';
import { ReporteEstadosComponent } from './reporte-estados/reporte-estados.component';
import { PlantillaUnoComponent } from '../shared/plantilla-uno/plantilla-uno.component';
import { ReporteMapaGeneralComponent } from './reporte-mapa-general/reporte-mapa-general.component';


@NgModule({
  declarations: [
    ReporteMapaComponent,
    ReporteEstadosComponent,
    ReporteMapaGeneralComponent
  ],
  imports: [
    CommonModule,
    PlantillaUnoComponent,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
