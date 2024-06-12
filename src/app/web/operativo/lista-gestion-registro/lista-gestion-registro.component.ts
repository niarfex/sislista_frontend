import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lista-gestion-registro',
  templateUrl: './lista-gestion-registro.component.html',
  styleUrls: ['./lista-gestion-registro.component.css'],
  providers: [BsModalService]
})
export class ListaGestionRegistroComponent implements OnInit {
  txt_busqueda:string="";
  lista_resultados:string[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  getData(){}

}
