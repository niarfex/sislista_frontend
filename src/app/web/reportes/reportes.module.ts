import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteMapaComponent } from './reporte-mapa/reporte-mapa.component';
import { ReporteEstadosComponent } from './reporte-estados/reporte-estados.component';
import { PlantillaUnoComponent } from '../shared/plantilla-uno/plantilla-uno.component';
import { ReporteMapaGeneralComponent } from './reporte-mapa-general/reporte-mapa-general.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsriMapComponent } from './../arcgis-map/components/esri-map/esri-map.component';

@NgModule({
  declarations: [
    ReporteMapaComponent,
    ReporteEstadosComponent,
    ReporteMapaGeneralComponent,
    EsriMapComponent,
  ],
  imports: [
    CommonModule,
    PlantillaUnoComponent,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ReportesModule { }
