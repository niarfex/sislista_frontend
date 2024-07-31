import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteMapaComponent } from './reporte-mapa/reporte-mapa.component';
import { ReporteEstadosComponent } from './reporte-estados/reporte-estados.component';

const routes: Routes = [
  { path: 'reporte-mapa/:numDoc/:idPeriodo', component: ReporteMapaComponent, pathMatch: 'full'},
  { path: 'reporte-mapa', component: ReporteMapaComponent, pathMatch: 'full'},
  { path: 'reporte-estados', component: ReporteEstadosComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
