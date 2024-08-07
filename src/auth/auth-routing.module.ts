import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
//import { AccountRouteGuard } from './auth/account-route-guard';
import { LoginComponent } from '../auth/login/login.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { RecuperarMensajeComponent } from './recuperar-mensaje/recuperar-mensaje.component';
import { ReestablecerClaveComponent } from './reestablecer-clave/reestablecer-clave.component';
import {ReporteMapaComponent} from '../app/web/reportes/reporte-mapa/reporte-mapa.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AuthComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login',component:LoginComponent,pathMatch: 'full' },
                    //{ path: 'login',component:ReporteMapaComponent,pathMatch: 'full' },
                    { path: 'recuperar-clave',component:RecuperarClaveComponent,pathMatch: 'full' },
                    { path: 'recuperar-mensaje',component:RecuperarMensajeComponent,pathMatch: 'full' },
                    { path: 'reestablecer-clave/:token',component:ReestablecerClaveComponent,pathMatch: 'full' },
                    { path: '**', redirectTo: 'login' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {
    constructor(private router: Router) {
       
    }   
    
}
