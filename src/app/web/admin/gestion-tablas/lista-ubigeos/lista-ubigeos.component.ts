import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lista-ubigeos',
  templateUrl: './lista-ubigeos.component.html',
  styleUrls: ['./lista-ubigeos.component.css'],
  providers: [BsModalService]
})
export class ListaUbigeosComponent implements OnInit {
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
