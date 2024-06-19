import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceProxy } from './service-proxies';
import { CondicionJuridicaServiceProxy } from './condicionjuridica-proxies';
import { CultivoServiceProxy } from './cultivo-proxies';
import { EspecieServiceProxy } from './especie-proxies';
import { GestionregistroServiceProxy } from './gestionregistro-proxies';
import { LineaProduccionServiceProxy } from './lineaproduccion-proxies';
import { MarcoListaServiceProxy } from './marcolista-proxies';
import { NotificacionServiceProxy } from './notificacion-proxies';
import { OrganizacionServiceProxy } from './organizacion-proxies';
import { PanelregistroServiceProxy } from './panelregistro-proxies';
import { PlantillaServiceProxy } from './plantilla-proxies';
import { TipoExplotacionServiceProxy } from './tipoexplotacion-proxies';
import { UbigeoServiceProxy } from './ubigeo-proxies';
import { UsuarioServiceProxy } from './usuario-proxies';
import { EventService } from '../services/event.service';

@NgModule({
    providers: [
        ServiceProxy,
        CondicionJuridicaServiceProxy,
        CultivoServiceProxy,
        EspecieServiceProxy,
        GestionregistroServiceProxy,
        LineaProduccionServiceProxy,
        MarcoListaServiceProxy,
        NotificacionServiceProxy,
        OrganizacionServiceProxy,
        PanelregistroServiceProxy,
        PlantillaServiceProxy,
        TipoExplotacionServiceProxy,
        UbigeoServiceProxy,
        UsuarioServiceProxy,
        EventService
    ],
})
export class ServiceProxyModule {}
