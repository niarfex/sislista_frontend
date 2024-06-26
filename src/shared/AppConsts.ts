import { XmlHttpRequestHelper } from './helpers/XmlHttpRequestHelper';
import { environment } from '../environments/environment';
import { Injectable,Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConsts {
    static urlHost: String;
    static urlBaseApp: String; 
    static siteKeyCaptcha: String;

    constructor() {
        
    }

    public run(): void {
        
        let injector: Injector;
        let appRootUrl = getDocumentOrigin();
        this.getApplicationConfig(appRootUrl, injector, () => {
                      
        });
    } 
    
    public  getApplicationConfig(appRootUrl: string, injector: Injector, callback: () => void) {
        let type = 'GET';
        let url = appRootUrl + 'assets/' + environment.appConfig;      
        //console.log(url);
        XmlHttpRequestHelper.ajax(type, url, null, null, (result) => {              
            AppConsts.urlHost = result.urlHost;          
            AppConsts.urlBaseApp = result.urlBaseApp;            
            AppConsts.siteKeyCaptcha = result.siteKeyCaptcha;      
            callback();
            
        });
    }

    

}
// Para recuperar la ruta raiz de la aplicación

function getDocumentOrigin() {
    if (!document.location.origin) {       
        return (
            document.location.protocol +
            '//' +
            document.location.hostname +
            (document.location.port ? ':' + document.location.port : '') +
            document.location.pathname
        );

    }    
    return document.location.origin + document.location.pathname ;
}
