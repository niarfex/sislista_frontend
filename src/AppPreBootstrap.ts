import { CompilerOptions, NgModuleRef, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { XmlHttpRequestHelper } from './shared/helpers/XmlHttpRequestHelper';
import { environment } from './environments/environment';
import { AppConsts } from './shared/AppConsts';
import { Injector } from '@angular/core';

export class AppPreBootstrap {
    static run(appRootUrl: string, injector: Injector, callback: () => void, resolve: any, reject: any): void {
        AppPreBootstrap.getApplicationConfig(appRootUrl, injector, () => {
                      
        });
    } 

    private static getApplicationConfig(appRootUrl: string, injector: Injector, callback: () => void) {
        let type = 'GET';
        let url = appRootUrl + '/assets/' + environment.appConfig;      

        XmlHttpRequestHelper.ajax(type, url, null, null, (result) => {     
            
            AppConsts.urlHost = result.urlHost;          
            AppConsts.urlBaseApp = result.urlBaseApp;            
            AppConsts.siteKeyCaptcha = result.siteKeyCaptcha; 
            callback();
            
        });
    }
}
