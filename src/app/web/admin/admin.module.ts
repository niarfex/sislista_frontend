import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminRoutingModule } from './admin-routing.module';
import { ListaOrganizacionesComponent } from './gestion-usuarios/lista-organizaciones/lista-organizaciones.component';
import { ListaMarcoListaComponent } from './gestion-usuarios/lista-marco-lista/lista-marco-lista.component';
import { ListaUsuariosComponent } from './gestion-usuarios/lista-usuarios/lista-usuarios.component';
import { ListaPlantillasComponent } from './gestion-configuracion/lista-plantillas/lista-plantillas.component';
import { ListaPanelRegistroComponent } from './gestion-configuracion/lista-panel-registro/lista-panel-registro.component';
import { ListaNotificacionesComponent } from './gestion-configuracion/lista-notificaciones/lista-notificaciones.component';
import { ListaCultivosComponent } from './gestion-tablas/lista-cultivos/lista-cultivos.component';
import { ListaUbigeosComponent } from './gestion-tablas/lista-ubigeos/lista-ubigeos.component';
import { ListaCondicionJuridicaComponent } from './gestion-tablas/lista-condicion-juridica/lista-condicion-juridica.component';
import { ListaTipoExplotacionComponent } from './gestion-tablas/lista-tipo-explotacion/lista-tipo-explotacion.component';
import { ListaLineaProduccionComponent } from './gestion-tablas/lista-linea-produccion/lista-linea-produccion.component';
import { ListaEspeciesComponent } from './gestion-tablas/lista-especies/lista-especies.component';
import { ModalRegistroOrganizacionesComponent } from './gestion-usuarios/lista-organizaciones/modal-registro-organizaciones/modal-registro-organizaciones.component';
import { ModalRegistroMarcoListaComponent } from './gestion-usuarios/lista-marco-lista/modal-registro-marco-lista/modal-registro-marco-lista.component';
import { ModalRegistroUsuariosComponent } from './gestion-usuarios/lista-usuarios/modal-registro-usuarios/modal-registro-usuarios.component';
import { ModalRegistroPlantillaComponent } from './gestion-configuracion/lista-plantillas/modal-registro-plantilla/modal-registro-plantilla.component';
import { ModalRegistroNotificacionesComponent } from './gestion-configuracion/lista-notificaciones/modal-registro-notificaciones/modal-registro-notificaciones.component';
import { ModalProgramacionRegistroComponent } from './gestion-configuracion/lista-panel-registro/modal-programacion-registro/modal-programacion-registro.component';
import { ModalRegistroCultivoComponent } from './gestion-tablas/lista-cultivos/modal-registro-cultivo/modal-registro-cultivo.component';
import { ModalRegistroUbigeoComponent } from './gestion-tablas/lista-ubigeos/modal-registro-ubigeo/modal-registro-ubigeo.component';
import { ModalRegistroCondicionJuridicaComponent } from './gestion-tablas/lista-condicion-juridica/modal-registro-condicion-juridica/modal-registro-condicion-juridica.component';
import { ModalRegistroTipoExplotacionComponent } from './gestion-tablas/lista-tipo-explotacion/modal-registro-tipo-explotacion/modal-registro-tipo-explotacion.component';
import { ModalRegistroLineaProduccionComponent } from './gestion-tablas/lista-linea-produccion/modal-registro-linea-produccion/modal-registro-linea-produccion.component';
import { ModalRegistroEspeciesComponent } from './gestion-tablas/lista-especies/modal-registro-especies/modal-registro-especies.component';
import { ListaMarcoListaAsignadoComponent } from './gestion-usuarios/lista-usuarios/modal-registro-usuarios/lista-marco-lista-asignado/lista-marco-lista-asignado.component';
import { ModalConsultaElementosComponent } from './gestion-usuarios/lista-usuarios/modal-registro-usuarios/modal-consulta-elementos/modal-consulta-elementos.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlantillaUnoComponent } from '../shared/plantilla-uno/plantilla-uno.component';
import { ListaInformantesComponent } from '../shared/lista-informantes/lista-informantes.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BasicAuthInterceptor } from 'src/auth/services';
import { ErrorInterceptor } from 'src/auth/services';
import { MyHttpInterceptor } from 'src/auth/services/request.interceptor';

@NgModule({
  declarations: [
    ListaOrganizacionesComponent,
    ModalRegistroOrganizacionesComponent,
    ModalRegistroMarcoListaComponent,
    ModalRegistroUsuariosComponent,
    ListaMarcoListaComponent,
    ListaUsuariosComponent,
    ListaPlantillasComponent,
    ModalRegistroPlantillaComponent,
    ListaPanelRegistroComponent,
    ModalProgramacionRegistroComponent,
    ListaNotificacionesComponent,
    ModalRegistroNotificacionesComponent,
    ListaCultivosComponent,
    ListaUbigeosComponent,
    ListaCondicionJuridicaComponent,
    ListaTipoExplotacionComponent,
    ListaLineaProduccionComponent,
    ListaEspeciesComponent,
    ModalRegistroCultivoComponent,
    ModalRegistroUbigeoComponent,
    ModalRegistroCondicionJuridicaComponent,
    ModalRegistroTipoExplotacionComponent,
    ModalRegistroLineaProduccionComponent,
    ModalRegistroEspeciesComponent,
    ListaMarcoListaAsignadoComponent,
    ModalConsultaElementosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    ConfirmDialogModule,
    AdminRoutingModule,
    PlantillaUnoComponent,        
        ListaInformantesComponent
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
export class AdminModule { }
