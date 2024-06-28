import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { PanelRegistroListDto } from 'src/app/models/PanelRegistro';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/auth/services/login.service';
import { PanelRegistroServiceProxy } from 'src/shared/service-proxies/panelregistro-proxies';

@Component({
  selector: 'lista-panel-registro',
  templateUrl: './lista-panel-registro.component.html',
  styleUrls: ['./lista-panel-registro.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ListaPanelRegistroComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda: string = "";
  lista_resultados: PanelRegistroListDto[];
  idRegistro: number;
  usuario:Login; 
  private panelregistroServiceProxy: PanelRegistroServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    ,private loginService: LoginService) {
    this.panelregistroServiceProxy = _injector.get(PanelRegistroServiceProxy);
  }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.panelregistroServiceProxy.getAll(this.txt_busqueda)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.lista_resultados = result.datos
          }
        }
      });
  }

  agregarRegistro(viewUserTemplate: TemplateRef<any>, id: number) {
    this.idRegistro = id;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-m'
    });
  }
  
  
  eliminarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el registro?',
      header: 'Eliminar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.spinner.show();
        this.panelregistroServiceProxy.DeletePanelRegistroxId(id)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.getData();
                this.toastr.success(result.message.toString(), 'Información');
              }
              else {
                this.toastr.error(result.message.toString(), 'Error');
              }
            }
          });
      },
      reject: () => {

      }
    });
  }
  verRegistro(id:number){

  }
  exitModal = (): void => {
    this.modalRef?.hide();
    this.getData();
  };

}
