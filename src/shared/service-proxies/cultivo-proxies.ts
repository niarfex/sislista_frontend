import { mergeMap as _observableMergeMap, catchError as _observableCatch, timeout, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, processComplete, throwException } from './service-proxies';
import { AppConsts } from '../AppConsts';
import { ResponseCultivoListDto } from 'src/app/models/Cultivo';

@Injectable()
export class CultivoServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getAll(param:String): Observable<ResponseCultivoListDto> {
        let url_ = AppConsts.urlHost + "v1/cultivo/GetAll?";  
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
                    return <Observable<ResponseCultivoListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponseCultivoListDto>><any>_observableThrow(response_);
        }));
    }
    getAllToExcel(param: string) {
        return this.http.get(AppConsts.urlHost + "v1/cultivo/GetAllToExcel??param=" + param, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        });
      }
    protected processgetAll(response: HttpResponseBase): Observable<ResponseCultivoListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);       
                result200 = ResponseCultivoListDto.fromJS(resultData200);

                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponseCultivoListDto>(<any>null);
    }

}