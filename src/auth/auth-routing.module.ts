import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
//import { AccountRouteGuard } from './auth/account-route-guard';
import { LoginComponent } from '../auth/login/login.component';
//FCF
//import { ReporteMapaComponent } from '../../src/app/web/reportes/reporte-mapa/reporte-mapa.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AuthComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    {
                         path: 'login',component:LoginComponent,pathMatch: 'full',
                    },
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
