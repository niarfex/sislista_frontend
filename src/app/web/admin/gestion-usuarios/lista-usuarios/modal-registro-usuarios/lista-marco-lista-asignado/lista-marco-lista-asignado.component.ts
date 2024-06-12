import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lista-marco-lista-asignado',
  templateUrl: './lista-marco-lista-asignado.component.html',
  styleUrl: './lista-marco-lista-asignado.component.css'
})
export class ListaMarcoListaAsignadoComponent implements OnInit {
  lista_asignados:string[]=[];
  ngOnInit(): void {
  }

}
