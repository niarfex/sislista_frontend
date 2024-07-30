import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MarcoListaListDto } from 'src/app/models/MarcoLista';

@Component({
  selector: 'lista-marco-lista-asignado',
  templateUrl: './lista-marco-lista-asignado.component.html',
  styleUrl: './lista-marco-lista-asignado.component.scss',
  providers: [ConfirmationService],
  encapsulation : ViewEncapsulation.None
})
export class ListaMarcoListaAsignadoComponent implements OnInit {
  @Input() lista_asignados: MarcoListaListDto[] = [];
  @Output() enviarAsignados = new EventEmitter<any>();
  constructor(private confirmationService: ConfirmationService    
  ) {
  }
  ngOnInit(): void {
  }
  eliminarElemento(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el elemento?',
      header: 'Eliminar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.lista_asignados = this.lista_asignados.filter(x => x.Id != id);
        this.enviarAsignados.emit(this.lista_asignados);
      },
      reject: () => {

      }
    });
    
  }
}
