import { mergeMap as _observableMergeMap, catchError as _observableCatch, timeout, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, processComplete, throwException } from './service-proxies';
import { AppConsts } from '../AppConsts';
import { GestionRegistroGetDto, ResponseGestionRegistroGetDto, ResponseGestionRegistroListDto } from 'src/app/models/GestionRegistro';
import { Respuesta } from 'src/app/models/Respuesta';

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
    getAllToExcel(param: string) {
        return this.http.get(AppConsts.urlHost + "v1/gestionregistro/GetAllToExcel??param=" + param, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        });
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

    CreateCuestionario(parametro:GestionRegistroGetDto): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/CreateCuestionario?";
        url_ = url_.replace(/[?&]$/, "");
        //console.log(parametro?.toJSON());
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
    DesaprobarCuestionario(parametro:GestionRegistroGetDto): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/DesaprobarCuestionario?";
        url_ = url_.replace(/[?&]$/, "");
        //console.log(parametro?.toJSON());
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
    InvalidarCuestionario(parametro:GestionRegistroGetDto): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/InvalidarCuestionario?";
        url_ = url_.replace(/[?&]$/, "");
        //console.log(parametro?.toJSON());
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

    /************/
    AprobarCuestionarioxUUID(uuid:String,fechaInicio:Date): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/AprobarCuestionarioxUUID?";        
        url_ = url_.replace(/[?&]$/, "");
        
        let cuestionario:GestionRegistroGetDto= new GestionRegistroGetDto();
        cuestionario.CodigoUUID=uuid;
        cuestionario.FechaInicio=fechaInicio;

        let options_: any = {
            observe: "response",
            body: cuestionario.toJSON(),
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
    RatificarCuestionarioxUUID(uuid:String,fechaInicio:Date): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/RatificarCuestionarioxUUID?";       
        url_ = url_.replace(/[?&]$/, "");
        
        let cuestionario:GestionRegistroGetDto= new GestionRegistroGetDto();
        cuestionario.CodigoUUID=uuid;
        cuestionario.FechaInicio=fechaInicio;  

        let options_: any = {
            observe: "response",
            body: cuestionario.toJSON(),
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
    DerivarCuestionarioxUUID(uuid:String,fechaInicio:Date): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/DerivarCuestionarioxUUID?";        
        url_ = url_.replace(/[?&]$/, "");
        
        let cuestionario:GestionRegistroGetDto= new GestionRegistroGetDto();
        cuestionario.CodigoUUID=uuid;
        cuestionario.FechaInicio=fechaInicio;   

        let options_: any = {
            observe: "response",
            body: cuestionario.toJSON(),
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
    ValidarCuestionarioxUUID(uuid:String,fechaInicio:Date): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/ValidarCuestionarioxUUID?";       
        url_ = url_.replace(/[?&]$/, "");
        
        let cuestionario:GestionRegistroGetDto= new GestionRegistroGetDto();
        cuestionario.CodigoUUID=uuid;
        cuestionario.FechaInicio=fechaInicio;        

        let options_: any = {
            observe: "response",
            body: cuestionario.toJSON(),
            responseType: "blob",
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
    DescartarCuestionarioxUUID(uuid:String,fechaInicio:Date): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/gestionregistro/DescartarCuestionarioxUUID?";        
        url_ = url_.replace(/[?&]$/, "");
        
        let cuestionario:GestionRegistroGetDto= new GestionRegistroGetDto();
        cuestionario.CodigoUUID=uuid;
        cuestionario.FechaInicio=fechaInicio;    

        let options_: any = {
            observe: "response",
            body: cuestionario.toJSON(),
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
    /************/

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