import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceProxy } from './service-proxies';
import { CondicionJuridicaServiceProxy } from './condicionjuridica-proxies';
import { CultivoServiceProxy } from './cultivo-proxies';
import { EspecieServiceProxy } from './especie-proxies';
import { GestionRegistroServiceProxy } from './gestionregistro-proxies';
import { LineaProduccionServiceProxy } from './lineaproduccion-proxies';
import { MarcoListaServiceProxy } from './marcolista-proxies';
import { NotificacionServiceProxy } from './notificacion-proxies';
import { OrganizacionServiceProxy } from './organizacion-proxies';
import { PanelRegistroServiceProxy } from './panelregistro-proxies';
import { PlantillaServiceProxy } from './plantilla-proxies';
import { TipoExplotacionServiceProxy } from './tipoexplotacion-proxies';
import { UbigeoServiceProxy } from './ubigeo-proxies';
import { UsuarioServiceProxy } from './usuario-proxies';
import { ReporteServiceProxy } from './reporte-proxies';
import { EventService } from '../services/event.service';

@NgModule({
    providers: [
        ServiceProxy,
        CondicionJuridicaServiceProxy,
        CultivoServiceProxy,
        EspecieServiceProxy,
        GestionRegistroServiceProxy,
        LineaProduccionServiceProxy,
        MarcoListaServiceProxy,
        NotificacionServiceProxy,
        OrganizacionServiceProxy,
        PanelRegistroServiceProxy,
        PlantillaServiceProxy,
        TipoExplotacionServiceProxy,
        UbigeoServiceProxy,
        UsuarioServiceProxy,
        ReporteServiceProxy,
        EventService
    ],
})
export class ServiceProxyModule {}
