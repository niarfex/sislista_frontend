import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { UsuarioListDto } from 'src/app/models/Usuario';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ListaUsuariosComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda:string="";
  lista_resultados: UsuarioListDto[];
  uuidRegistro: String;
  private usuarioServiceProxy: UsuarioServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) { 
      this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
    }

  ngOnInit(): void {
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.usuarioServiceProxy.getAll(this.txt_busqueda)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.lista_resultados = result.datos
          }
        }
      });
  }

  agregarRegistro(viewUserTemplate: TemplateRef<any>, uuid: String) {
    this.uuidRegistro = uuid;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }
desactivarRegistro(uuid: String) {
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
      this.usuarioServiceProxy.DesactivarUsuarioxUUID(uuid)
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
activarRegistro(uuid: String) {
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
      this.usuarioServiceProxy.ActivarUsuarioxUUID(uuid)
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
eliminarRegistro(uuid: String) {
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
      this.usuarioServiceProxy.DeleteUsuarioxUUID(uuid)
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
verRegistro(uuid:String){
  
}
exitModal = (): void => {
  this.modalRef?.hide();
};

}
