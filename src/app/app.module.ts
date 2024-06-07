import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy,CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DefaultLayoutComponent } from './components/layout/default-layout/default-layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './web/inicio/inicio.component';
import { PlantillaUnoComponent } from './web/shared/plantilla-uno/plantilla-uno.component';
import { PlantillaDosComponent } from './web/shared/plantilla-dos/plantilla-dos.component';
import { ListaCamposPlantillaComponent } from './web/shared/lista-campos-plantilla/lista-campos-plantilla.component';
import { ListaInformantesComponent } from './web/shared/lista-informantes/lista-informantes.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BasicAuthInterceptor } from 'src/auth/services';
import { ErrorInterceptor } from 'src/auth/services';
import { MyHttpInterceptor } from 'src/auth/services/request.interceptor';
import { LocaleService } from 'src/shared/services/locale.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({ declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        DefaultLayoutComponent,
        MenuComponent,
        InicioComponent,
        PlantillaUnoComponent,
        PlantillaDosComponent,
        ListaCamposPlantillaComponent,
        ListaInformantesComponent
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ToastrModule.forRoot()], providers: [LocaleService,
        //{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},//Con este provider hace la consulta mediante Bearer
        //{ provide: APP_INITIALIZER, useFactory: initCommonConfig, deps: [Const], multi: true},
        { provide: LOCALE_ID, useValue: 'es-ES' },
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true, },
        { provide: LocationStrategy, useClass: HashLocationStrategy }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
