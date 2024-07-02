import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { GestionRegistroListDto } from 'src/app/models/GestionRegistro';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/auth/services/login.service';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';


@Component({
  selector: 'lista-gestion-registro',
  templateUrl: './lista-gestion-registro.component.html',
  styleUrls: ['./lista-gestion-registro.component.scss'],
  providers: [ConfirmationService]
})
export class ListaGestionRegistroComponent implements OnInit {
  txt_busqueda:string="";
  lista_resultados: GestionRegistroListDto[];
  idRegistro: number;
  usuario:Login;
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private router: Router
    ,private loginService: LoginService) {
    this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
  }

  ngOnInit(): void {
    
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.gestionregistroServiceProxy.getAll(this.txt_busqueda,this.usuario.CodigoUUID)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.lista_resultados = result.datos
          }
        }
      });
  }

  agregarRegistro(uuid:String){
    var numDoc=this.lista_resultados.find(x=>x.CodigoUUID==uuid).NumeroDocumento;
    this.router.navigate(['app','reportes','reporte-mapa',numDoc],{} );
  }

  verRegistro(uuid:String){}

  subsanarRegistro(uuid:String){}

  exportar(){}

}
