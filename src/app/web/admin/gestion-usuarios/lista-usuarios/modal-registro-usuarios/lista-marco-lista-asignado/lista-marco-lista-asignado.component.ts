import { Component, EventEmitter, Injector, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { MarcoListaListDto } from 'src/app/models/MarcoLista';

@Component({
  selector: 'lista-marco-lista-asignado',
  templateUrl: './lista-marco-lista-asignado.component.html',
  styleUrl: './lista-marco-lista-asignado.component.scss',
  providers: [BsModalService, ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class ListaMarcoListaAsignadoComponent implements OnInit {
  @Input() lista_asignados: MarcoListaListDto[] = [];
  @Input() modalActivo: boolean = true;
  @Output() enviarAsignados = new EventEmitter<any>();
  modalRef?: BsModalRef;  
  idRegistroML: number;
  private lastTableLazyLoadEvent: LazyLoadEvent;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private modalService: BsModalService
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.loadUserData(this.lastTableLazyLoadEvent);
  }
  ngOnInit(): void {
  }
  loadUserData(event: LazyLoadEvent): void {
    this.lastTableLazyLoadEvent = event;
    // Lots of beautifull data loading code here 
    // (like calling a server trough a service and so on)...
  }
  visualizarElemento(viewUserTemplate: TemplateRef<any>,id:number) {
    this.idRegistroML = id;
    this.modalActivo = false;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
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
  exitModal = (): void => {
    this.modalRef?.hide();
  };
}
