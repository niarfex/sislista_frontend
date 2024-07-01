import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { CultivoListDto } from 'src/app/models/Cultivo';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/auth/services/login.service';
import { CultivoServiceProxy } from 'src/shared/service-proxies/cultivo-proxies';

@Component({
  selector: 'lista-cultivos',
  templateUrl: './lista-cultivos.component.html',
  styleUrls: ['./lista-cultivos.component.scss'],
  providers: [BsModalService]
})
export class ListaCultivosComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:string="";
  lista_resultados:CultivoListDto[];
  usuario:Login; 
  private cultivoServiceProxy: CultivoServiceProxy;
  constructor(_injector: Injector
    ,private modalService: BsModalService
    ,private spinner: NgxSpinnerService
    ,private loginService: LoginService) { 
    this.cultivoServiceProxy = _injector.get(CultivoServiceProxy); 
  }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();    
  }

  getData(event?: LazyLoadEvent){
    this.spinner.show();
    this.cultivoServiceProxy.getAll(this.txt_busqueda)
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
    this.cultivoServiceProxy.getAllToExcel(this.txt_busqueda).subscribe(async (event) => {
      let data = event as HttpResponse < Blob > ;
            const downloadedFile = new Blob([data.body as BlobPart], {
                type: data.body?.type
            });         
        if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = "cultivos.xlsx";
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
        }
    });
}
}
