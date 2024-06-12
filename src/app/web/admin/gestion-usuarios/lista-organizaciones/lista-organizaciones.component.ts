import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'lista-organizaciones',
  templateUrl: './lista-organizaciones.component.html',
  styleUrls: ['./lista-organizaciones.component.css'],
  providers: [BsModalService],
  
})
export class ListaOrganizacionesComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:string="";
  lista_resultados:string[]=[];

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getData(){}

  agregarRegistro(viewUserTemplate: TemplateRef<any>){

    this.modalRef = this.modalService.show(viewUserTemplate,{
      backdrop : 'static',
      keyboard : false,
      class: 'modal-m'
    });
  }
  exitModal = (): void => {
    this.modalRef?.hide();
  };

}
