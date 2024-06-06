import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lista-panel-registro',
  templateUrl: './lista-panel-registro.component.html',
  styleUrls: ['./lista-panel-registro.component.css'],
  providers: [BsModalService]
})
export class ListaPanelRegistroComponent implements OnInit {
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
      keyboard : false
    });
  }
  exitModal = (): void => {
    this.modalRef?.hide();
  };

}
