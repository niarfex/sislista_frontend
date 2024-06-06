import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './web/inicio/inicio.component';
//import { LoginComponent } from '../auth/login/login.component';
//import { AuthGuard } from './services/auth';

@NgModule({
  imports: [
      RouterModule.forChild([
          {
              path: 'app',
              component: AppComponent,        
              children: [        
                {
                  path: 'admin',
                  loadChildren: () => import('../app/web/admin/admin.module').then((m) => m.AdminModule), //Lazy load main module
                  data: { preload: true }//, canActivate: [AuthGuard]
                },
                {
                  path: 'operativo',
                  loadChildren: () => import('../app/web/operativo/operativo.module').then((m) => m.OperativoModule), //Lazy load main module
                  data: { preload: true }//, canActivate: [AuthGuard]
                },
                {
                  path: 'reportes',
                  loadChildren: () => import('../app/web/reportes/reportes.module').then((m) => m.ReportesModule), //Lazy load main module
                  data: { preload: true }//, canActivate: [AuthGuard]
                },
                { path: 'web/inicio', component: InicioComponent, pathMatch: 'full'},
              ],
          }
          
      ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }