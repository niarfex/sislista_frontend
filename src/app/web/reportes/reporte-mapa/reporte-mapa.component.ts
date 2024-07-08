import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'reporte-mapa',
  templateUrl: './reporte-mapa.component.html',
  styleUrls: ['./reporte-mapa.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ReporteMapaComponent implements OnInit {
  modalRef?: BsModalRef;
  numDoc: String;
  idPeriodo: number;
  modalActivo:boolean;
  constructor(private _route: ActivatedRoute,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.numDoc = this._route.snapshot.paramMap.get('numDoc');
    this.idPeriodo =  Number.parseInt(this._route.snapshot.paramMap.get('idPeriodo'));
  }
  mostrarCuestionario(viewUserTemplate: TemplateRef<any>){
    this.numDoc = this.numDoc;
    this.modalActivo=true;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }
  exitModal = (): void => {
    this.modalRef?.hide();
  };
}
