import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { OrganizacionListDto } from 'src/app/models/Organizacion';
import { OrganizacionServiceProxy } from 'src/shared/service-proxies/organizacion-proxies';

@Component({
  selector: 'lista-organizaciones',
  templateUrl: './lista-organizaciones.component.html',
  styleUrls: ['./lista-organizaciones.component.scss'],
  providers: [BsModalService],
  
})
export class ListaOrganizacionesComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:string="";
  lista_resultados:OrganizacionListDto[];
  idRegistro:number;
  private organizacionServiceProxy: OrganizacionServiceProxy;
  constructor(_injector: Injector
    ,private modalService: BsModalService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) {
    this.organizacionServiceProxy = _injector.get(OrganizacionServiceProxy); 
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(event?: LazyLoadEvent){
    this.spinner.show();
    this.organizacionServiceProxy.getAll(this.txt_busqueda)
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

  agregarRegistro(viewUserTemplate: TemplateRef<any>,id:number){
    this.idRegistro=id;
    this.modalRef = this.modalService.show(viewUserTemplate,{
      backdrop : 'static',
      keyboard : false,
      class: 'modal-m'
    });
  }
  desactivarRegistro(id:number){

  }
  activarRegistro(id:number){

  }
  eliminarRegistro(id:number){
    /*this.spinner.show();
    this.organizacionServiceProxy.deleteOrganizacionxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              
            }
            else{
              this.toastr.error(result.message.toString(), 'Error');
            }            
          }
        });*/
  }
  exitModal = (): void => {
    this.modalRef?.hide();
    this.getData();
  };

}
