import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GestionRegistroGetDto } from 'src/app/models/GestionRegistro';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';

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
  condicionJuridica:String;
  tipoExplotacion:String;
  objRegistro: GestionRegistroGetDto = new GestionRegistroGetDto();
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    ,private _route: ActivatedRoute
    ,private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
   }

  ngOnInit(): void {
    this.numDoc = this._route.snapshot.paramMap.get('numDoc');
    this.idPeriodo =  Number.parseInt(this._route.snapshot.paramMap.get('idPeriodo'));
    this.spinner.show();
    this.gestionregistroServiceProxy.getGestionRegistroxDatos(this.numDoc, this.idPeriodo)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            this.condicionJuridica=this.objRegistro.ListCondicionJuridica.find(x=>x.value==this.objRegistro.IdCondicionJuridica.toString()).label;
            this.tipoExplotacion=this.objRegistro.ListTipoExplotacion.find(x=>x.value==this.objRegistro.IdTipoExplotacion.toString()).label;
          }
          else {
            this.toastr.error(result.message.toString(), 'Error');
          }          
        }
      });
  }
  mostrarCuestionario(viewUserTemplate: TemplateRef<any>){
    this.numDoc = this.numDoc;
    this.modalActivo=true;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-xl'
    });
  }
  exitModal = (): void => {
    this.modalRef?.hide();
  };
}
