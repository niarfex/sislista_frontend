import { mergeMap as _observableMergeMap, catchError as _observableCatch, timeout, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, processComplete, throwException } from './service-proxies';
import { AppConsts } from '../AppConsts';
import { PanelRegistroGetDto, ResponsePanelRegistroGetDto, ResponsePanelRegistroListDto } from 'src/app/models/PanelRegistro';
import { Respuesta } from 'src/app/models/Respuesta';

@Injectable()
export class PanelRegistroServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getAll(param:String): Observable<ResponsePanelRegistroListDto> {
        let url_ = AppConsts.urlHost + "v1/panelregistro/GetAll?";  
        if (param!== undefined && param!== null)
            url_ += "param=" + encodeURIComponent("" + param) + "&"; 
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
                    return <Observable<ResponsePanelRegistroListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponsePanelRegistroListDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetAll(response: HttpResponseBase): Observable<ResponsePanelRegistroListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponsePanelRegistroListDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponsePanelRegistroListDto>(<any>null);
    }

    getPanelRegistroxId(id:number): Observable<ResponsePanelRegistroGetDto> {
        let url_ = AppConsts.urlHost + "v1/panelregistro/GetPanelRegistroxId?";   
        if (id!== undefined && id!== null)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
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
            return this.processgetPanelRegistroxId(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetPanelRegistroxId(<any>response_);
                } catch (e) {
                    return <Observable<ResponsePanelRegistroGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponsePanelRegistroGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetPanelRegistroxId(response: HttpResponseBase): Observable<ResponsePanelRegistroGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponsePanelRegistroGetDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponsePanelRegistroGetDto>(<any>null);
    }

    CreatePanelRegistro(parametro:PanelRegistroGetDto): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/panelregistro/CreatePanelRegistro?";
        url_ = url_.replace(/[?&]$/, "");
        
        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: parametro?.toJSON(),
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "*/*"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processguardarRegistro(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processguardarRegistro(<any>response_);
                } catch (e) {
                    return <Observable<Respuesta>><any>_observableThrow(e);
                }
            } else
                return <Observable<Respuesta>><any>_observableThrow(response_);
        }));
    }

    DeletePanelRegistroxId(id:number): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/panelregistro/DeletePanelRegistroxId?";
        if (id!== undefined && id!== null)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
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
            return this.processguardarRegistro(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processguardarRegistro(<any>response_);
                } catch (e) {
                    return <Observable<Respuesta>><any>_observableThrow(e);
                }
            } else
                return <Observable<Respuesta>><any>_observableThrow(response_);
        }));
    }    

    protected processguardarRegistro(response: HttpResponseBase): Observable<Respuesta> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = Respuesta.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Respuesta>(<any>null);
    }

}