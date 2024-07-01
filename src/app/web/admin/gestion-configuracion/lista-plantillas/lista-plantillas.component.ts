import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { PlantillaListDto } from 'src/app/models/Plantilla';
import { Login } from 'src/app/models/login';
import { PlantillaUnoComponent } from 'src/app/web/shared/plantilla-uno/plantilla-uno.component';
import { LoginService } from 'src/auth/services/login.service';
import { PlantillaServiceProxy } from 'src/shared/service-proxies/plantilla-proxies';

@Component({
  selector: 'lista-plantillas',
  templateUrl: './lista-plantillas.component.html',
  styleUrls: ['./lista-plantillas.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ListaPlantillasComponent implements OnInit {
  modalRef?: BsModalRef;
  txt_busqueda: string = "";
  lista_resultados: PlantillaListDto[];
  idRegistro: number;
  modalActivo:boolean;
  usuario:Login; 
  private plantillaServiceProxy: PlantillaServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    ,private loginService: LoginService) {
    this.plantillaServiceProxy = _injector.get(PlantillaServiceProxy);
  }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.plantillaServiceProxy.getAll(this.txt_busqueda)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.lista_resultados = result.datos
          }
        }
      });
  }

  abrirModal(viewUserTemplate: TemplateRef<any>, id: number,activo:boolean){
    this.idRegistro = id;
    this.modalActivo=activo;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }
  agregarRegistro(viewUserTemplate: TemplateRef<any>, id: number) {
    this.abrirModal(viewUserTemplate,id,true);
  }
  verRegistro(viewUserTemplate: TemplateRef<any>, id: number){
    this.abrirModal(viewUserTemplate,id,false);
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
        this.plantillaServiceProxy.DesactivarPlantillaxId(id)
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
        this.plantillaServiceProxy.ActivarPlantillaxId(id)
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
        this.plantillaServiceProxy.DeletePlantillaxId(id)
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
    this.plantillaServiceProxy.getAllToExcel(this.txt_busqueda).subscribe(async (event) => {
      let data = event as HttpResponse < Blob > ;
            const downloadedFile = new Blob([data.body as BlobPart], {
                type: data.body?.type
            });         
        if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = "plantillas.xlsx";
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
        }
    });
}
}
