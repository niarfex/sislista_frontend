import { mergeMap as _observableMergeMap, catchError as _observableCatch, timeout, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, processComplete, throwException } from './service-proxies';
import { AppConsts } from '../AppConsts';
import { ResponseUsuarioGetDto, ResponseUsuarioListDto, UsuarioGetDto } from 'src/app/models/Usuario';
import { Respuesta } from 'src/app/models/Respuesta';
import { ResponseMenuItemGetDto } from 'src/app/models/MenuItem';
import { ResponseSelectTipoDto } from 'src/app/models/SelectTipo';

@Injectable()
export class UsuarioServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getAll(param:String): Observable<ResponseUsuarioListDto> {
        let url_ = AppConsts.urlHost + "v1/usuario/GetAll?";  
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
                    return <Observable<ResponseUsuarioListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseUsuarioListDto>><any>_observableThrow(response_);
        }));
    }
    getAllToExcel(param: string) {
        return this.http.get(AppConsts.urlHost + "v1/usuario/GetAllToExcel??param=" + param, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        });
      }

    protected processgetAll(response: HttpResponseBase): Observable<ResponseUsuarioListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseUsuarioListDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseUsuarioListDto>(<any>null);
    }
    GetMenuItemxUsuario(): Observable<ResponseMenuItemGetDto> {
        let url_ = AppConsts.urlHost + "v1/usuario/GetMenuItemxUsuario?";  
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
            return this.processGetMenuItemxUsuario(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetMenuItemxUsuario(<any>response_);
                } catch (e) {
                    return <Observable<ResponseMenuItemGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseMenuItemGetDto>><any>_observableThrow(response_);
        }));
    }
    protected processGetMenuItemxUsuario(response: HttpResponseBase): Observable<ResponseMenuItemGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseMenuItemGetDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseMenuItemGetDto>(<any>null);
    }

    getUsuarioxUUID(uuid:String): Observable<ResponseUsuarioGetDto> {
        let url_ = AppConsts.urlHost + "v1/usuario/GetUsuarioxUUID?";   
        if (uuid!== undefined && uuid!== null)
            url_ += "uuid=" + encodeURIComponent("" + uuid) + "&";
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
            return this.processgetUsuarioxUUID(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetUsuarioxUUID(<any>response_);
                } catch (e) {
                    return <Observable<ResponseUsuarioGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseUsuarioGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetUsuarioxUUID(response: HttpResponseBase): Observable<ResponseUsuarioGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseUsuarioGetDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseUsuarioGetDto>(<any>null);
    }


    getDepartamentosMarcoLista(idPerfil:number): Observable<ResponseSelectTipoDto> {
        let url_ = AppConsts.urlHost + "v1/usuario/GetDepartamentosMarcoLista?";  
        if (idPerfil!== undefined && idPerfil!== null)
            url_ += "idPerfil=" + encodeURIComponent("" + idPerfil.toString()) + "&"; 
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
            return this.processgetDepartamentosMarcoLista(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetDepartamentosMarcoLista(<any>response_);
                } catch (e) {
                    return <Observable<ResponseSelectTipoDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseSelectTipoDto>><any>_observableThrow(response_);
        }));
    }

    protected processgetDepartamentosMarcoLista(response: HttpResponseBase): Observable<ResponseSelectTipoDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseSelectTipoDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseSelectTipoDto>(<any>null);
    }



    CreateUsuario(parametro:UsuarioGetDto): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/CreateUsuario?";
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

    DeleteUsuarioxUUID(uuid:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/DeleteUsuarioxUUID?";
        if (uuid!== undefined && uuid!== null)
            url_ += "uuid=" + encodeURIComponent("" + uuid) + "&";
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

    ActivarUsuarioxUUID(uuid:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/ActivarUsuarioxUUID?";
        if (uuid!== undefined && uuid!== null)
            url_ += "uuid=" + encodeURIComponent("" + uuid) + "&";
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

    DesactivarUsuarioxUUID(uuid:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/DesactivarUsuarioxUUID?";
        if (uuid!== undefined && uuid!== null)
            url_ += "uuid=" + encodeURIComponent("" + uuid) + "&";
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

    EnviarCredencialesxUUID(uuid:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/EnviarCredencialesxUUID?";
        if (uuid!== undefined && uuid!== null)
            url_ += "uuid=" + encodeURIComponent("" + uuid) + "&";
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

    ReestablecerClave(correo:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/auth/ReestablecerClave?";
        if (correo!== undefined && correo!== null)
            url_ += "correo=" + encodeURIComponent("" + correo) + "&";
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

    ValidarTokenReseteo(token:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/auth/ValidarTokenReseteo?";
        if (token!== undefined && token!== null)
            url_ += "token=" + encodeURIComponent("" + token) + "&";
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

    ActualizarClave(newPassword:String,renewPassword:String,token:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/auth/ActualizarClave?";    
        url_ = url_.replace(/[?&]$/, "");
        
        const param = {
            NewPassword: newPassword,
            ReNewPassword: renewPassword,
            Token:token
        };

        let options_: any = {
            observe: "response",
            body: param,
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

    GetDatosRENIEC(dni:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/GetDatosRENIEC?";
        if (dni!== undefined && dni!== null)
            url_ += "dni=" + encodeURIComponent("" + dni) + "&";
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

    GetDatosSUNAT(ruc:String): Observable<Respuesta> {
        let url_ = AppConsts.urlHost + "v1/usuario/GetDatosSUNAT?";
        if (ruc!== undefined && ruc!== null)
            url_ += "ruc=" + encodeURIComponent("" + ruc) + "&";
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