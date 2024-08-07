import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteMapaComponent } from './reporte-mapa/reporte-mapa.component';
import { ReporteEstadosComponent } from './reporte-estados/reporte-estados.component';
import { PlantillaUnoComponent } from '../shared/plantilla-uno/plantilla-uno.component';
import { ReporteMapaGeneralComponent } from './reporte-mapa-general/reporte-mapa-general.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsriMapComponent } from './../arcgis-map/components/esri-map/esri-map.component';
import { ListaReporteUsuariosComponent } from './reporte-estados/lista-reporte-usuarios/lista-reporte-usuarios.component';
import { BasicAuthInterceptor, ErrorInterceptor } from 'src/auth/services';
import { MyHttpInterceptor } from 'src/auth/services/request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    ReporteMapaComponent,
    ReporteEstadosComponent,
    ReporteMapaGeneralComponent,
    EsriMapComponent,
    ListaReporteUsuariosComponent,
  ],
  imports: [
    CommonModule,
    PlantillaUnoComponent,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ChartModule
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
export class ReportesModule { }
