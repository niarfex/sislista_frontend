import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { UsuarioGetDto } from 'src/app/models/Usuario';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

@Component({
  selector: 'modal-registro-usuarios',
  templateUrl: './modal-registro-usuarios.component.html',
  styleUrls: ['./modal-registro-usuarios.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ModalRegistroUsuariosComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() uuidRegistro: String;
  SubmodalRef?: BsModalRef;
  objRegistro: UsuarioGetDto = new UsuarioGetDto();
  txt_campo: string = "";
  active: boolean = true;
  contacto: boolean = false;
  contactoMarco: boolean = false;
  modalForm = this.formBuilder.group({
    IdPerfil: ['', [Validators.required]],
    IdTipoDocumento: ['', [Validators.required]],
    NumeroDocumento: ['', [Validators.required]],
    Nombre: ['', [Validators.required]],
    ApellidoPaterno: ['', [Validators.required]],
    ApellidoMaterno: ['', [Validators.required]],
    Celular: ['', [Validators.required]],
    CorreoElectronico: ['', [Validators.required]],
    IdOrganizacion: ['', this.contacto?  [Validators.required]:[]],
    Cargo: ['', this.contacto ? [Validators.required]:[]],
    OficinaArea: ['', this.contacto ? [Validators.required]:[]],
    IdDepartamento:['']
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private SubmodalService: BsModalService) {
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
  }

  get IdPerfil() { return this.modalForm.controls['IdPerfil']; }
  get IdTipoDocumento() { return this.modalForm.controls['IdTipoDocumento']; }
  get NumeroDocumento() { return this.modalForm.controls['NumeroDocumento']; }
  get Nombre() { return this.modalForm.controls['Nombre']; }
  get ApellidoPaterno() { return this.modalForm.controls['ApellidoPaterno']; }
  get ApellidoMaterno() { return this.modalForm.controls['ApellidoMaterno']; }
  get Celular() { return this.modalForm.controls['Celular']; }
  get CorreoElectronico() { return this.modalForm.controls['CorreoElectronico']; }
  get IdOrganizacion() { return this.modalForm.controls['IdOrganizacion']; }
  get Cargo() { return this.modalForm.controls['Cargo']; }
  get OficinaArea() { return this.modalForm.controls['OficinaArea']; }
  get IdDepartamento() { return this.modalForm.controls['IdDepartamento']; }
  ngOnInit(): void {
    this.spinner.show();
    this.usuarioServiceProxy.getUsuarioxUUID(this.uuidRegistro)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            console.log(result);
            if (this.objRegistro.CodigoUUIDUsuario != null) {
              this.modalForm.controls['IdPerfil'].setValue(this.objRegistro.IdPerfil.toString());
              this.modalForm.controls['IdTipoDocumento'].setValue(this.objRegistro.IdTipoDocumento.toString());
              this.modalForm.controls['NumeroDocumento'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.modalForm.controls['Nombre'].setValue(this.objRegistro.Nombre.toString());
              this.modalForm.controls['ApellidoPaterno'].setValue(this.objRegistro.ApellidoPaterno.toString());
              this.modalForm.controls['ApellidoMaterno'].setValue(this.objRegistro.ApellidoMaterno.toString());
              this.modalForm.controls['Celular'].setValue(this.objRegistro.Celular.toString());
              this.modalForm.controls['CorreoElectronico'].setValue(this.objRegistro.CorreoElectronico.toString());
              this.modalForm.controls['IdOrganizacion'].setValue(this.objRegistro.IdOrganizacion.toString());
              this.modalForm.controls['Cargo'].setValue(this.objRegistro.Cargo.toString());
              this.modalForm.controls['OficinaArea'].setValue(this.objRegistro.OficinaArea.toString());
            }
          }
          else {
            this.toastr.error(result.message.toString(), 'Error');
          }
        }
      });
  }


  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim());
  }

  onClickSubmit(data) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de guardar los datos ingresados?',
      header: 'Guardar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",


      accept: () => {

        this.objRegistro.IdPerfil = Number.parseInt(this.IdPerfil.value);
        this.objRegistro.IdTipoDocumento = Number.parseInt(this.IdTipoDocumento.value);
        this.objRegistro.CodigoUUIDPersona = this.uuidRegistro;
        this.objRegistro.NumeroDocumento = this.NumeroDocumento.value;
        this.objRegistro.Nombre = this.Nombre.value;
        this.objRegistro.ApellidoPaterno = this.ApellidoPaterno.value;
        this.objRegistro.ApellidoMaterno = this.ApellidoMaterno.value;
        this.objRegistro.Celular = this.Celular.value;
        this.objRegistro.CorreoElectronico = this.CorreoElectronico.value;
        this.objRegistro.IdOrganizacion = Number.parseInt(this.IdOrganizacion.value);
        this.objRegistro.Cargo = this.Cargo.value;
        this.objRegistro.OficinaArea = this.OficinaArea.value;

        this.spinner.show();
        this.usuarioServiceProxy.CreateUsuario(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.uuidRegistro = result.datos.toString();
              }
              else {
                this.toastr.warning(result.message.toString(), 'Aviso');
              }
            }
          });
      },
      reject: () => {

      }
    });

  }
  show() {

  }
  close() {
    this.exitModal();
  }
  consultarElementos(viewUserTemplate: TemplateRef<any>) {
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false
    });
  }

  exitSubModal = (): void => {
    this.SubmodalRef?.hide();
  };

  selPerfil(event: any) {
    var codPerfil = this.objRegistro.ListPerfil.find(x => x.value == this.IdPerfil.value).codigo;
    switch (codPerfil) {
      case "PERFILADM":
      case "PERFILCON": {
        this.contacto = true;
        this.contactoMarco = false;
        break;
      }
      case "PERFILEMP":
      case "PERFILSUP":
      case "PERFILESP": {
        this.contacto = false;
        this.contactoMarco = true;
        break;
      }
      default: {
        this.contacto = false;
        this.contactoMarco = false;
        break;
      }

    }

  }

}
