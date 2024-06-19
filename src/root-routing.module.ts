import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services';

const routes: Routes = [
    { path: '', redirectTo: 'app/web/inicio', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AccountModule), //Lazy load account module
        data: { preload: true },
      },
      {
        path: 'app',
        loadChildren: () => import('./app/app.module').then((m) => m.AppModule), //Lazy load account module
        data: { preload: true }, canActivate: [AuthGuard]
      },
    { path: '**', redirectTo: 'app/web/inicio' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class RootRoutingModule {
    constructor(private router: Router) {

    }
}
