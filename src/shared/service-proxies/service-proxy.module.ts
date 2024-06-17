import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceProxy } from './service-proxies';
import { CondicionjuridicaServiceProxy } from './condicionjuridica-proxies';
import { CultivoServiceProxy } from './cultivo-proxies';
import { EspecieServiceProxy } from './especie-proxies';
import { GestionregistroServiceProxy } from './gestionregistro-proxies';
import { LineaproduccionServiceProxy } from './lineaproduccion-proxies';
import { MarcolistaServiceProxy } from './marcolista-proxies';
import { NotificacionServiceProxy } from './notificacion-proxies';
import { OrganizacionServiceProxy } from './organizacion-proxies';
import { PanelregistroServiceProxy } from './panelregistro-proxies';
import { PlantillaServiceProxy } from './plantilla-proxies';
import { TipoexplotacionServiceProxy } from './tipoexplotacion-proxies';
import { UbigeoServiceProxy } from './ubigeo-proxies';
import { UsuarioServiceProxy } from './usuario-proxies';
import { EventService } from '../services/event.service';

@NgModule({
    providers: [
        ServiceProxy,
        CondicionjuridicaServiceProxy,
        CultivoServiceProxy,
        EspecieServiceProxy,
        GestionregistroServiceProxy,
        LineaproduccionServiceProxy,
        MarcolistaServiceProxy,
        NotificacionServiceProxy,
        OrganizacionServiceProxy,
        PanelregistroServiceProxy,
        PlantillaServiceProxy,
        TipoexplotacionServiceProxy,
        UbigeoServiceProxy,
        UsuarioServiceProxy,
        EventService
    ],
})
export class ServiceProxyModule {}
