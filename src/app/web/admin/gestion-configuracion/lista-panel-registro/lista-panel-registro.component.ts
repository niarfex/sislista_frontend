import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import moment from 'moment';
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
  modalActivo:boolean;
  usuario:Login; 
  estadoRegistro:number;
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

  abrirModal(viewUserTemplate: TemplateRef<any>, id: number,activo:boolean,estado:number){
    this.idRegistro = id;
    this.modalActivo=activo;
    this.estadoRegistro=estado;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-m'
    });
  }
  agregarRegistro(viewUserTemplate: TemplateRef<any>, id: number,estado:number) {
    this.abrirModal(viewUserTemplate,id,true,estado);
  }
  verRegistro(viewUserTemplate: TemplateRef<any>, id: number){
    this.abrirModal(viewUserTemplate,id,false,0);
  }
  
  
  eliminarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea cancelar la programación?',
      header: 'Cancelar',
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
  publicarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea publicar la programación?',
      header: 'Publicar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.spinner.show();
        this.panelregistroServiceProxy.PublicarPanelRegistroxId(id)
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
  pausarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea pausar el registro?',
      header: 'Pausar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.spinner.show();
        this.panelregistroServiceProxy.PausarPanelRegistroxId(id)
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
  reiniciarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea reiniciar el registro?',
      header: 'Reiniciar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.spinner.show();
        this.panelregistroServiceProxy.ReiniciarPanelRegistroxId(id)
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
  exitModal = (): void => {
    this.modalRef?.hide();
    this.getData();
  };
  exportar(){
    this.panelregistroServiceProxy.getAllToExcel(this.txt_busqueda).subscribe(async (event) => {
      let data = event as HttpResponse < Blob > ;
            const downloadedFile = new Blob([data.body as BlobPart], {
                type: data.body?.type
            });         
        if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = "panelregistro.xlsx";
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
        }
    });
}
convertDateToString(dateToBeConverted: string) {
  return moment(dateToBeConverted, "YYYY-MM-DD HH:mm:ss").format("DD/MM/yyyy");
  }
}
