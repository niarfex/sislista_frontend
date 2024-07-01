import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { } from '@angular/common/http';
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppPreBootstrap } from './AppPreBootstrap';
import { AppModule } from './app/app.module';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { AppConsts } from './shared/AppConsts';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ServerModule } from '@angular/platform-server';
import { ServiceProxyModule } from './shared/service-proxies/service-proxy.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { rootReducer } from './app/store/index';
import { StoreModule } from '@ngrx/store';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
};

export function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {
    return () => {


        return new Promise<boolean>((resolve, reject) => {

        });
    };
}

export function getBaseHref(platformLocation: PlatformLocation): string {
    let baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}




@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModule,
        RootRoutingModule,
        ServiceProxyModule,
        ServerModule,
        DropzoneModule,
        StoreModule.forRoot(rootReducer),
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        JwtModule.forRoot({ config: { tokenGetter } })
    ],
    declarations: [RootComponent
    ],
    providers: [provideHttpClient(withFetch()), { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_INITIALIZER, useFactory: initCommonConfig, deps: [AppConsts], multi: true }    
    ],

    bootstrap: [RootComponent],
})
export class RootModule { }

export function tokenGetter() {
    return sessionStorage.getItem('token');
}
export function initCommonConfig(c: AppConsts) {
    return () => c.run();
}
export function valorKey() {
    return AppConsts.siteKeyCaptcha;
}