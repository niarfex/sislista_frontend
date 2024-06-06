import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
  providers: [BsModalService],
})
export class ListaUsuariosComponent implements OnInit {
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
