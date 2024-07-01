import { mergeMap as _observableMergeMap, catchError as _observableCatch, timeout, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, processComplete, throwException } from './service-proxies';
import { AppConsts } from '../AppConsts';
import { ResponseTipoExplotacionGetDto, ResponseTipoExplotacionListDto, TipoExplotacionGetDto } from 'src/app/models/TipoExplotacion';
import { Respuesta } from 'src/app/models/Respuesta';

@Injectable()
export class TipoExplotacionServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getAll(param:String): Observable<ResponseTipoExplotacionListDto> {
        let url_ = AppConsts.urlHost + "v1/tipoexplotacion/GetAll?";  
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
                    return <Observable<ResponseTipoExplotacionListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseTipoExplotacionListDto>><any>_observableThrow(response_);
        }));
    }
    getAllToExcel(param: string) {
        return this.http.get(AppConsts.urlHost + "v1/tipoexplotacion/GetAllToExcel??param=" + param, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        });
      }
    protected processgetAll(response: HttpResponseBase): Observable<ResponseTipoExplotacionListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseTipoExplotacionListDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseTipoExplotacionListDto>(<any>null);
    }

    getTipoExplotacionxId(id:number): Observable<ResponseTipoExplotacionGetDto> {
        let url_ = AppConsts.urlHost + "v1/tipoexplotacion/GetTipoExplotacionxId?";   
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
            return this.processgetTipoExplotacionxId(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetTipoExplotacionxId(<any>response_);
                } catch (e) {
                    return <Observable<ResponseTipoExplotacionGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseTipoExplotacionGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetTipoExplotacionxId(response: HttpResponseBase): Observable<ResponseTipoExplotacionGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseTipoExplotacionGetDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseTipoExplotacionGetDto>(<any>null);
    }

    CreateTipoExplotacion(parametro:TipoExplotacionGetDto): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/tipoexplotacion/CreateTipoExplotacion?";
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

    DeleteTipoExplotacionxId(id:number): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/tipoexplotacion/DeleteTipoExplotacionxId?";
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

    ActivarTipoExplotacionxId(id:number): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/tipoexplotacion/ActivarTipoExplotacionxId?";
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

    DesactivarTipoExplotacionxId(id:number): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/tipoexplotacion/DesactivarTipoExplotacionxId?";
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