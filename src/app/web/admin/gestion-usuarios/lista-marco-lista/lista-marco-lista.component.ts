import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


@Component({
  selector: 'lista-marco-lista',
  templateUrl: './lista-marco-lista.component.html',
  styleUrls: ['./lista-marco-lista.component.css'],
  providers: [BsModalService],
})
export class ListaMarcoListaComponent implements OnInit {
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
