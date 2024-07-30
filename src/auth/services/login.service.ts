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


    constructor(private http: HttpClient
        , private jwtHelper: JwtHelperService
        , private router: Router
        ,private toastr: ToastrService
    ) {

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
                    //console.log(response);
                    if(response.body.success==true){
                        const usuario = response.body.usuario.Usuario;
                        var usuarioActual=response.body.usuario;
                        usuarioActual.isAdministrador=usuarioActual.CodigoPerfil=="PERFILADM"?true:false;
                        usuarioActual.isEmpadronador=usuarioActual.CodigoPerfil=="PERFILEMP"?true:false;
                        usuarioActual.isSupervisor=usuarioActual.CodigoPerfil=="PERFILSUP"?true:false;
                        usuarioActual.isEspecialista=usuarioActual.CodigoPerfil=="PERFILESP"?true:false;
                        usuarioActual.isConsulta=usuarioActual.CodigoPerfil=="PERFILCON"?true:false;
                        sessionStorage.setItem('currentUser', JSON.stringify(usuarioActual));
                        this.currentUserSubject.next({
                        Usuario: response.body.usuario.Usuario,
                        CodigoUUID: response.body.usuario.CodigoUUID,
                        Nombre: response.body.usuario.Nombre,
                        NumeroDocumento: response.body.usuario.NumeroDocumento,
                        CodigoPerfil: response.body.usuario.CodigoPerfil,
                        Perfil: response.body.usuario.Perfil,
                        AccessToken: response.body.usuario.AccessToken,
                        RefreshToken: response.body.usuario.RefreshToken,
                        isAdministrador:usuarioActual.isAdministrador,
                        isEmpadronador:usuarioActual.isEmpadronador,
                        isSupervisor:usuarioActual.isSupervisor,
                        isEspecialista:usuarioActual.isEspecialista,
                        isConsulta:usuarioActual.isConsulta
                    });
                    //console.log("jwt");
                    //console.log(this.jwtHelper.decodeToken(response.body.usuario.AccessToken));
                    sessionStorage.setItem('token', response.body.usuario.AccessToken);
                    sessionStorage.setItem('userId',this.jwtHelper.decodeToken(response.body.usuario.AccessToken).Usuario);
                    sessionStorage.setItem('CodigoPerfil',this.jwtHelper.decodeToken(response.body.usuario.AccessToken).CodigoPerfil);
                    sessionStorage.setItem('Perfil',this.jwtHelper.decodeToken(response.body.usuario.AccessToken).Perfil);
                    
                    this.valToken = response.body.usuario.AccessToken;
                    return response;
                    }
                    else{
                        this.toastr.error('Usuario y/o contraseña incorrecto.', 'Error');
                        return throwError(() => new Error('Usuario y/o contraseña incorrecto.'));
                    }                    
                    
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
        //console.log(error);
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