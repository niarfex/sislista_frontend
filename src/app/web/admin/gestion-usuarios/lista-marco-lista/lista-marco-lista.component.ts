import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { MarcoListaListDto } from 'src/app/models/MarcoLista';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/auth/services/login.service';
import { MarcoListaServiceProxy } from 'src/shared/service-proxies/marcolista-proxies';



@Component({
  selector: 'lista-marco-lista',
  templateUrl: './lista-marco-lista.component.html',
  styleUrls: ['./lista-marco-lista.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ListaMarcoListaComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda: string = "";
  lista_resultados: MarcoListaListDto[];
  idRegistro: number;
  modalActivo: boolean;
  usuario:Login;  

  private marcolistaServiceProxy: MarcoListaServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    ,private loginService: LoginService) {
    this.marcolistaServiceProxy = _injector.get(MarcoListaServiceProxy);
  }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.marcolistaServiceProxy.getAll(this.txt_busqueda)
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
  desactivarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea deshabilitar el registro?',
      header: 'Deshabilitar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.spinner.show();
        this.marcolistaServiceProxy.DesactivarMarcoListaxId(id)
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
  activarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea habilitar el registro?',
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
        this.marcolistaServiceProxy.ActivarMarcoListaxId(id)
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
        this.marcolistaServiceProxy.DeleteMarcoListaxId(id)
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
    this.marcolistaServiceProxy.getAllToExcel(this.txt_busqueda).subscribe(async (event) => {
      let data = event as HttpResponse < Blob > ;
            const downloadedFile = new Blob([data.body as BlobPart], {
                type: data.body?.type
            });         
        if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = "marcolistas.xlsx";
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
        }
    });
}
}
