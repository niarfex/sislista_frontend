import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError, catchError, BehaviorSubject, tap, map, timeout } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AppConsts } from 'src/shared/AppConsts';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private currentUserSubject: BehaviorSubject<Login>;
    public currentUser: Observable<Login>;
    private valToken: string = null;


    constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {

        //console.log("session");
        //console.log(sessionStorage.getItem('currentUser'));
        this.currentUserSubject = 
        this.currentUserSubject = new BehaviorSubject<Login>(
            JSON.parse(sessionStorage.getItem('currentUser'))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get getCurrentUserValue(): Login {
        return this.currentUserSubject.value;
    }


    login(login: string, clave: string): Observable<any> {
        this.currentUserSubject.next(null);
        return this.GeneraTokenUserPass(login, clave);
    }

    GeneraTokenUserPass(login: string, clave: string): Observable<any> {
        sessionStorage.clear();
        const param = {
            username: login,
            password: clave
        };
        const url = `${AppConsts.urlHost}v1/auth/login`;
        //console.log(url);
        return this.http
            .post<any>(url, param, { 
                //headers: header,
                observe: 'response',
            })
            .pipe(
                timeout(20000),
                map((response: any) => {
                    
                    const usuario = response.body.usuario.username;
                    sessionStorage.setItem('currentUser', usuario);//almacenamos temporalmente el string, luego esto debe volver desde el back
                    this.currentUserSubject.next({
                        numeroDocumento: Number(usuario),
                        token: response.body.usuario.accessToken,
                    });
                    
                    sessionStorage.setItem('token', response.body.usuario.accessToken);
                    /*sessionStorage.setItem(
                        'userId',
                        this.jwtHelper.decodeToken(response.body.usuario.accessToken)
                            .usuario.usuarioId
                    );*/
                    
                    this.valToken = response.body.usuario.accessToken;
                    return response;
                }),
                catchError((e) => {
                    if (e.code === 'PTMP') {
                        sessionStorage.setItem('userDocument', login);
                    }
                    throw e;
                })
            );
    }

    logout(): void {
        sessionStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigate(['auth/login'],
        { queryParams: { sesion: 'logout' }});
        //console.log('Se cierra la sesión');        
        //window.location.reload();
        
    }
    private handleError(error: HttpErrorResponse) {
        console.log(error);
        /*if (error.status === 0) {
            console.error('Se ha producio un error ', error.error);
        }
        else {
            console.error('Servicio retornó el código de estado ', error);
        }*/
        return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
    }
    get userToken(): String {
        return sessionStorage.getItem('token');
    }

}