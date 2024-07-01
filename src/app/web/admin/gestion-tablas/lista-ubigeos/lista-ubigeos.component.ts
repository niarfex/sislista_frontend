import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { UbigeoListDto } from 'src/app/models/Ubigeo';
import { UbigeoServiceProxy } from 'src/shared/service-proxies/ubigeo-proxies';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from 'src/auth/services/login.service';
import { Login } from 'src/app/models/login';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'lista-ubigeos',
  templateUrl: './lista-ubigeos.component.html',
  styleUrls: ['./lista-ubigeos.component.scss'],
  providers: [BsModalService]
})
export class ListaUbigeosComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:string="";
  lista_resultados:UbigeoListDto[];
  usuario:Login; 
  private ubigeoServiceProxy: UbigeoServiceProxy;
  constructor(_injector: Injector
    ,private modalService: BsModalService
    ,private spinner: NgxSpinnerService
    ,private loginService: LoginService) { 
    this.ubigeoServiceProxy = _injector.get(UbigeoServiceProxy); 
  }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();    
  }

  getData(event?: LazyLoadEvent){
    this.spinner.show();
    this.ubigeoServiceProxy.getAll(this.txt_busqueda)
    .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
    .subscribe({
        next: (result) => {    
          if(result.success)
          {
            this.lista_resultados=result.datos
          }
        }
    }); 
  }

  agregarRegistro(viewUserTemplate: TemplateRef<any>){

    this.modalRef = this.modalService.show(viewUserTemplate,{
      backdrop : 'static',
      keyboard : false
    });
  }
  exitModal = (): void => {
    this.modalRef?.hide();
    this.getData();
  };
  exportar(){
    this.ubigeoServiceProxy.getAllToExcel(this.txt_busqueda).subscribe(async (event) => {
      let data = event as HttpResponse < Blob > ;
            const downloadedFile = new Blob([data.body as BlobPart], {
                type: data.body?.type
            });         
        if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = "ubigeos.xlsx";
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
        }
    });
}
}
