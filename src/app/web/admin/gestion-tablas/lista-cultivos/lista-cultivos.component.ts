import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/auth/services/login.service';

@Component({
  selector: 'lista-cultivos',
  templateUrl: './lista-cultivos.component.html',
  styleUrls: ['./lista-cultivos.component.scss'],
  providers: [BsModalService]
})
export class ListaCultivosComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:string="";
  lista_resultados:string[]=[];
  usuario:Login; 
  constructor(private modalService: BsModalService
    ,private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
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
