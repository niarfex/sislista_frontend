import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { MarcoListaListDto } from 'src/app/models/MarcoLista';
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
  @Input() modalActivo: boolean = true;
  SubmodalRef?: BsModalRef;
  objRegistro: UsuarioGetDto = new UsuarioGetDto();
  txt_campo: string = "";
  active: boolean = true;
  contacto: boolean = false;
  contactoMarco: boolean = false;
  selDNI:boolean=false;
  modalForm = this.formBuilder.group({
    IdPerfil: ['', [Validators.required]],
    IdTipoDocumento: ['', [Validators.required]],
    NumeroDocumento: ['', this.selDNI?[Validators.required, Validators.min(8)]: [Validators.required]],
    Nombre: ['', [Validators.required]],
    ApellidoPaterno: ['', [Validators.required]],
    ApellidoMaterno: ['', [Validators.required]],
    Celular: [''],
    CorreoElectronico: ['', [Validators.required,Validators.email]],
    IdOrganizacion: ['', this.contacto ? [Validators.required] : []],
    Cargo: ['', this.contacto ? [Validators.required] : []],
    OficinaArea: ['', this.contacto ? [Validators.required] : []],
    IdDepartamento: ['']
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
            //console.log(result);
            if (this.objRegistro.CodigoUUIDUsuario != null) {
              this.modalForm.controls['IdPerfil'].setValue(this.objRegistro.IdPerfil.toString());
              this.selPerfil(null);
              this.modalForm.controls['IdTipoDocumento'].setValue(this.objRegistro.IdTipoDocumento.toString());
              this.selTipoDocumento();
              this.modalForm.controls['NumeroDocumento'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.modalForm.controls['Nombre'].setValue(this.objRegistro.Nombre.toString());
              this.modalForm.controls['ApellidoPaterno'].setValue(this.objRegistro.ApellidoPaterno.toString());
              this.modalForm.controls['ApellidoMaterno'].setValue(this.objRegistro.ApellidoMaterno.toString());
              this.modalForm.controls['Celular'].setValue(this.objRegistro.Celular.toString());
              this.modalForm.controls['CorreoElectronico'].setValue(this.objRegistro.CorreoElectronico.toString());
              this.modalForm.controls['IdOrganizacion'].setValue(this.objRegistro.IdOrganizacion == null ? null : this.objRegistro.IdOrganizacion.toString());
              this.modalForm.controls['Cargo'].setValue(this.objRegistro.Cargo == null ? null : this.objRegistro.Cargo.toString());
              this.modalForm.controls['OficinaArea'].setValue(this.objRegistro.OficinaArea == null ? null : this.objRegistro.OficinaArea.toString());
              this.IdTipoDocumento.disable();
              this.NumeroDocumento.disable();
            }
          }
          else {
            this.toastr.error(result.message.toString(), 'Error');
          }
          if (!this.modalActivo) {
            this.modalForm.disable();  
          }
        }
      });
  }


  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim());
  }

  onClickSubmit(data) {
    if(this.selDNI){
      if(this.NumeroDocumento.value.length!=8){
        this.toastr.error("El número de DNI debe tener 8 dígitios", 'Error');
        return;
      }
    }
    if(this.objRegistro.ListMarcoListaAsignados.length==0){
      this.toastr.error("Se debe asignar por lo menos un elemento de marco de lista al usuario", 'Error');
        return;
    }
    
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
        this.objRegistro.CodigoUUIDUsuario = this.uuidRegistro;
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
                this.close();
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
  close() {
    this.exitModal();
  }
  consultarElementos(viewUserTemplate: TemplateRef<any>) {
    if(this.IdDepartamento.value==""){this.toastr.warning("Debe Seleccionar un departamento", 'Aviso');return;}
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }

  exitSubModal = (): void => {
    this.SubmodalRef?.hide();
  };

  selPerfil(event: any) {
    var codPerfil = this.objRegistro.ListPerfil.find(x => x.value == this.IdPerfil.value).codigo;
    if(this.IdPerfil.value!=""){
      this.spinner.show();
      this.usuarioServiceProxy.getDepartamentosMarcoLista(Number.parseInt(this.IdPerfil.value))
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.objRegistro.ListDepartamento = result.datos;
            }
            else {
              this.toastr.warning(result.message.toString(), 'Aviso');
            }
          }
        });
    }   
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
    if(event!=null){
      this.objRegistro.ListMarcoListaAsignados=[];
    }
  }
  actualizarAsignados(lista: MarcoListaListDto[]){
    console.log("asignados1");
    this.spinner.show();
    this.objRegistro.ListMarcoListaAsignados=lista;
    this.spinner.hide();
  }
  agregarAsignados(lista: MarcoListaListDto[]) {
    console.log("asignados2");
    lista.forEach((currentValue, index) => {
      this.objRegistro.ListMarcoListaAsignados.push(currentValue);
    });

  }
  getDatosRENIEC(){
    if(this.NumeroDocumento.value.length==8){
    this.spinner.show();
        this.usuarioServiceProxy.GetDatosRENIEC(this.NumeroDocumento.value)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                var reniec = JSON.parse(result.datos.toString());
                if(reniec.respuesta=="OK"){
                  this.Nombre.setValue(reniec.datos.prenombres);
                  this.ApellidoPaterno.setValue(reniec.datos.apPrimer);
                  this.ApellidoMaterno.setValue(reniec.datos.apSegundo);
                  this.toastr.success(result.message.toString(), 'Información');
                  this.Nombre.disable();
                  this.ApellidoPaterno.disable();
                  this.ApellidoMaterno.disable();
                }
                else{
                  this.toastr.error(reniec.mensaje, 'Error');
                }
                
              }
              else {
                this.toastr.error(result.message.toString(), 'Error');
              }
            }
          });
        }
        else{
          this.toastr.error("El DNI debe tener 8 dígitos", 'Error');
        }
  }
  selTipoDocumento(){
    var tipoDoc = this.objRegistro.ListTipoDocumento.find(x => x.value == this.IdTipoDocumento.value).codigo;
    if(tipoDoc=="DNI"){this.selDNI=true;}else{this.selDNI=false;}
  }
}
