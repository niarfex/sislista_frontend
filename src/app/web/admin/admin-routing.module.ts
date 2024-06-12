import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './gestion-usuarios/lista-usuarios/lista-usuarios.component';
import { ListaOrganizacionesComponent } from './gestion-usuarios/lista-organizaciones/lista-organizaciones.component';
import { ListaMarcoListaComponent } from './gestion-usuarios/lista-marco-lista/lista-marco-lista.component';
import { ListaNotificacionesComponent } from './gestion-configuracion/lista-notificaciones/lista-notificaciones.component';
import { ListaPanelRegistroComponent } from './gestion-configuracion/lista-panel-registro/lista-panel-registro.component';
import { ListaPlantillasComponent } from './gestion-configuracion/lista-plantillas/lista-plantillas.component';
import { ListaCondicionJuridicaComponent } from './gestion-tablas/lista-condicion-juridica/lista-condicion-juridica.component';
import { ListaCultivosComponent } from './gestion-tablas/lista-cultivos/lista-cultivos.component';
import { ListaEspeciesComponent } from './gestion-tablas/lista-especies/lista-especies.component';
import { ListaLineaProduccionComponent } from './gestion-tablas/lista-linea-produccion/lista-linea-produccion.component';
import { ListaTipoExplotacionComponent } from './gestion-tablas/lista-tipo-explotacion/lista-tipo-explotacion.component';
import { ListaUbigeosComponent } from './gestion-tablas/lista-ubigeos/lista-ubigeos.component';

const routes: Routes = [
  { path: 'gestion-usuarios/lista-usuarios', component: ListaUsuariosComponent, pathMatch: 'full'},
  { path: 'gestion-usuarios/lista-organizaciones', component: ListaOrganizacionesComponent, pathMatch: 'full'},
  { path: 'gestion-usuarios/lista-marco-lista', component: ListaMarcoListaComponent, pathMatch: 'full'},
  { path: 'gestion-configuracion/lista-notificaciones', component: ListaNotificacionesComponent, pathMatch: 'full'},
  { path: 'gestion-configuracion/lista-panel-registro', component: ListaPanelRegistroComponent, pathMatch: 'full'},
  { path: 'gestion-configuracion/lista-plantillas', component: ListaPlantillasComponent, pathMatch: 'full'},
  { path: 'gestion-tablas/lista-condicion-juridica', component: ListaCondicionJuridicaComponent, pathMatch: 'full'},
  { path: 'gestion-tablas/lista-cultivos', component: ListaCultivosComponent, pathMatch: 'full'},
  { path: 'gestion-tablas/lista-especies', component: ListaEspeciesComponent, pathMatch: 'full'},
  { path: 'gestion-tablas/lista-linea-produccion', component: ListaLineaProduccionComponent, pathMatch: 'full'},
  { path: 'gestion-tablas/lista-tipo-explotacion', component: ListaTipoExplotacionComponent, pathMatch: 'full'},
  { path: 'gestion-tablas/lista-ubigeos', component: ListaUbigeosComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
