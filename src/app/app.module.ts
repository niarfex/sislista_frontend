import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy,CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { VerticalComponent } from './components/layout/vertical/vertical.component';
import { HorizontalComponent } from './components/layout/horizontal/horizontal.component';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { RightsidebarComponent } from './components/layout/rightsidebar/rightsidebar.component';
import { HorizontaltopbarComponent } from './components/layout/horizontaltopbar/horizontaltopbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { InicioComponent } from './web/inicio/inicio.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BasicAuthInterceptor } from 'src/auth/services';
import { ErrorInterceptor } from 'src/auth/services';
import { MyHttpInterceptor } from 'src/auth/services/request.interceptor';
import { LocaleService } from 'src/shared/services/locale.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlantillaUnoComponent } from './web/shared/plantilla-uno/plantilla-uno.component';
import { ListaInformantesComponent } from './web/shared/lista-informantes/lista-informantes.component';
import { RegistroFundoPlantillaComponent } from './web/shared/registro-fundo-plantilla/registro-fundo-plantilla.component';
import { ListaCamposPlantillaComponent } from './web/shared/registro-fundo-plantilla/lista-campos-plantilla/lista-campos-plantilla.component';

@NgModule({ declarations: [
        AppComponent,
        LayoutComponent,
        VerticalComponent,
        HorizontalComponent,
        TopbarComponent,
        SidebarComponent,
        RightsidebarComponent,
        HorizontaltopbarComponent,        
        FooterComponent,
        InicioComponent/*,
        PlantillaUnoComponent,
        ListaInformantesComponent,
        RegistroFundoPlantillaComponent,
        ListaCamposPlantillaComponent*/
    ],
    
    imports: [AppRoutingModule,     
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        NgxSpinnerModule, 
        SimplebarAngularModule,    
        LightboxModule,
        NgSelectModule,
        BsDropdownModule.forRoot(),
        
        ToastrModule.forRoot(),
        PlantillaUnoComponent,
        ListaInformantesComponent,
        RegistroFundoPlantillaComponent,
    ListaCamposPlantillaComponent],     
    exports:      [  ],
    providers: [LocaleService,
        //{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},//Con este provider hace la consulta mediante Bearer
        //{ provide: APP_INITIALIZER, useFactory: initCommonConfig, deps: [Const], multi: true},
        { provide: LOCALE_ID, useValue: 'es-ES' },
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true, },
        { provide: LocationStrategy, useClass: HashLocationStrategy }, provideHttpClient(withInterceptorsFromDi())], 
    bootstrap: [AppComponent], 
    })
export class AppModule { }
