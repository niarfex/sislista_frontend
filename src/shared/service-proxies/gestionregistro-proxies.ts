import { mergeMap as _observableMergeMap, catchError as _observableCatch, timeout, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, processComplete, throwException } from './service-proxies';
import { AppConsts } from '../AppConsts';
import { ResponseGestionRegistroGetDto, ResponseGestionRegistroListDto } from 'src/app/models/GestionRegistro';

@Injectable()
export class GestionRegistroServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getAll(param:String,uuid:String): Observable<ResponseGestionRegistroListDto> {

        let url_ = AppConsts.urlHost + "v1/gestionregistro/GetAll?";  
        if (param!== undefined && param!== null)
            url_ += "param=" + encodeURIComponent("" + param) + "&"; 
        if (uuid!== undefined && uuid!== null)
            url_ += "uuid=" + encodeURIComponent("" + uuid) + "&"; 
        url_ = url_.replace(/[?&]$/, "");
        let options_: any = {
            observe: "response",
            responseType: "blob",            
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processgetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetAll(<any>response_);
                } catch (e) {
                    return <Observable<ResponseGestionRegistroListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseGestionRegistroListDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetAll(response: HttpResponseBase): Observable<ResponseGestionRegistroListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseGestionRegistroListDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseGestionRegistroListDto>(<any>null);
    }

    subirArchivo(formData: FormData): Observable<any> {
        //return this.http.request(new HttpRequest('POST', AppConsts.urlHost + "v1/marcolista/Importar", formData));
        return <any>this.http.post(AppConsts.urlHost + "v1/gestionregistro/SubirArchivo", formData, {
            reportProgress: true,
            observe: 'events',            
            responseType: 'text'
        });
    }

    getGestionRegistroxDatos(numDoc:String,idPeriodo:number): Observable<ResponseGestionRegistroGetDto> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/GetGestionRegistroxDatos?";   
        if (numDoc!== undefined && numDoc!== null)
            url_ += "numDoc=" + encodeURIComponent("" + numDoc) + "&";
        if (idPeriodo!== undefined && idPeriodo!== null)
            url_ += "idPeriodo=" + encodeURIComponent("" + idPeriodo) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_: any = {
            observe: "response",
            responseType: "blob",            
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "*/*"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processgetGestionRegistroxDatos(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetGestionRegistroxDatos(<any>response_);
                } catch (e) {
                    return <Observable<ResponseGestionRegistroGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseGestionRegistroGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetGestionRegistroxDatos(response: HttpResponseBase): Observable<ResponseGestionRegistroGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseGestionRegistroGetDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseGestionRegistroGetDto>(<any>null);
    }

}