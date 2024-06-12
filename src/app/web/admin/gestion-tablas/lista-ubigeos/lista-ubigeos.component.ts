import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api';
import { UbigeoModel } from 'src/app/models/Ubigeo';
import { UbigeoServiceProxy } from 'src/shared/service-proxies/ubigeo-proxies';

@Component({
  selector: 'lista-ubigeos',
  templateUrl: './lista-ubigeos.component.html',
  styleUrls: ['./lista-ubigeos.component.css'],
  providers: [BsModalService]
})
export class ListaUbigeosComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:String="";
  lista_resultados:UbigeoModel[];
  private ubigeoServiceProxy: UbigeoServiceProxy;
  constructor(_injector: Injector,private modalService: BsModalService) { 
    this.ubigeoServiceProxy = _injector.get(UbigeoServiceProxy); 
  }

  ngOnInit(): void {
    this.getData();
    
  }

  getData(event?: LazyLoadEvent){
    this.ubigeoServiceProxy.getAll(this.txt_busqueda)
    //.pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
    .subscribe({
        next: (result) => {    
          if(result.success)
          {
            console.log(result.datos)
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
  };

}
