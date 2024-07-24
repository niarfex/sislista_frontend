import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { NotificacionListDto } from 'src/app/models/Notificacion';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/auth/services/login.service';
import { NotificacionServiceProxy } from 'src/shared/service-proxies/notificacion-proxies';

@Component({
  selector: 'lista-notificaciones',
  templateUrl: './lista-notificaciones.component.html',
  styleUrls: ['./lista-notificaciones.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ListaNotificacionesComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda: string = "";
  lista_resultados: NotificacionListDto[];
  idRegistro: number;
  modalActivo: boolean;
  usuario: Login;
  private notificacionServiceProxy: NotificacionServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private loginService: LoginService) {
    this.notificacionServiceProxy = _injector.get(NotificacionServiceProxy);
  }

  ngOnInit(): void {
    this.usuario = this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.notificacionServiceProxy.getAll(this.txt_busqueda)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.lista_resultados = result.datos
          }
        }
      });
  }

  abrirModal(viewUserTemplate: TemplateRef<any>, id: number, activo: boolean) {
    this.idRegistro = id;
    this.modalActivo = activo;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-m'
    });
  }
  agregarRegistro(viewUserTemplate: TemplateRef<any>, id: number) {
    this.abrirModal(viewUserTemplate, id, true);
  }
  verRegistro(viewUserTemplate: TemplateRef<any>, id: number) {
    this.abrirModal(viewUserTemplate, id, false);
  }
  eliminarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas cancelar la notificación?',
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
        this.notificacionServiceProxy.DeleteNotificacionxId(id)
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
  notificarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas enviar la notificación?',
      header: 'Notificar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.spinner.show();
        this.notificacionServiceProxy.NotificarNotificacionxId(id)
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
  exportar() {
    this.notificacionServiceProxy.getAllToExcel(this.txt_busqueda).subscribe(async (event) => {
      let data = event as HttpResponse<Blob>;
      const downloadedFile = new Blob([data.body as BlobPart], {
        type: data.body?.type
      });
      if (downloadedFile.type != "") {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = "notificaciones.xlsx";
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      }
    });
  }
  convertDateToString(dateToBeConverted: string) {
    return dateToBeConverted == null ? "" : moment(dateToBeConverted, "YYYY-MM-DD HH:mm:ss").format("DD/MM/yyyy");
  }
}
