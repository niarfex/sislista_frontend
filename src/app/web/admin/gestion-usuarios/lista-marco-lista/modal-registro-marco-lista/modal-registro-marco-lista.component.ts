import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { MarcoListaGetDto } from 'src/app/models/MarcoLista';
import { MarcoListaServiceProxy } from 'src/shared/service-proxies/marcolista-proxies';
import { UbigeoServiceProxy } from 'src/shared/service-proxies/ubigeo-proxies';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

@Component({
  selector: 'modal-registro-marco-lista',
  templateUrl: './modal-registro-marco-lista.component.html',
  styleUrls: ['./modal-registro-marco-lista.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroMarcoListaComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() idRegistro: number;
  @Input() modalActivo: boolean = true;
  objRegistro: MarcoListaGetDto = new MarcoListaGetDto();
  txt_campo: string = "";
  active: boolean = true;
  perSA: boolean = false;
  perPN: boolean = false;
  perSAOtro: boolean = false;
  modalForm = this.formBuilder.group({
    IdCondicionJuridica: ['', [Validators.required]],
    IdCondicionJuridicaOtros: ['', this.perSAOtro ? [Validators.required] : []],
    NumeroDocumentoSA: ['', this.perSA ? [Validators.required] : []],
    NumeroDocumentoPN: ['', this.perPN ? [Validators.required] : []],
    IdTipoDocumento: ['', this.perPN ? [Validators.required] : []],
    RazonSocial: ['', this.perSA ? [Validators.required] : []],
    DireccionFiscalDomicilioSA: ['', this.perSA ? [Validators.required] : []],
    DireccionFiscalDomicilioPN: ['', this.perPN ? [Validators.required] : []],
    Nombre: ['', this.perPN ? [Validators.required] : []],
    ApellidoPaterno: ['', this.perPN ? [Validators.required] : []],
    ApellidoMaterno: ['', this.perPN ? [Validators.required] : []],
    TieneRuc: ['', this.perPN ? [Validators.required] : []],
    IdDepartamentoPer: ['', [Validators.required]],
    IdProvinciaPer: ['', [Validators.required]],
    IdDistritoPer: ['', [Validators.required]],
    IdTipoExplotacion: ['', [Validators.required]],
    Telefono: [''],
    Celular: ['', [Validators.required]],
    CorreoElectronico: ['', [Validators.required, Validators.email]],
    PaginaWeb: [''],
    NombreRepLegal: ['', this.perSA ? [Validators.required] : []],
    CelularRepLegal: ['', this.perSA ? [Validators.required] : []],
    CorreoRepLegal: ['', this.perSA ? [Validators.required, Validators.email] : []],
    Direccion: ['', [Validators.required]],
    IdDepartamento: ['', [Validators.required]],
    IdAnio: ['', [Validators.required]],
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  private marcolistaServiceProxy: MarcoListaServiceProxy;
  private ubigeoServiceProxy: UbigeoServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.marcolistaServiceProxy = _injector.get(MarcoListaServiceProxy);
    this.ubigeoServiceProxy = _injector.get(UbigeoServiceProxy);
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
  }
  get IdCondicionJuridica() { return this.modalForm.controls['IdCondicionJuridica']; }
  get IdCondicionJuridicaOtros() { return this.modalForm.controls['IdCondicionJuridicaOtros']; }
  get NumeroDocumentoSA() { return this.modalForm.controls['NumeroDocumentoSA']; }
  get NumeroDocumentoPN() { return this.modalForm.controls['NumeroDocumentoPN']; }
  get IdTipoDocumento() { return this.modalForm.controls['IdTipoDocumento']; }
  get RazonSocial() { return this.modalForm.controls['RazonSocial']; }
  get DireccionFiscalDomicilioSA() { return this.modalForm.controls['DireccionFiscalDomicilioSA']; }
  get DireccionFiscalDomicilioPN() { return this.modalForm.controls['DireccionFiscalDomicilioPN']; }
  get Nombre() { return this.modalForm.controls['Nombre']; }
  get ApellidoPaterno() { return this.modalForm.controls['ApellidoPaterno']; }
  get ApellidoMaterno() { return this.modalForm.controls['ApellidoMaterno']; }
  get TieneRuc() { return this.modalForm.controls['TieneRuc']; }
  get IdDepartamentoPer() { return this.modalForm.controls['IdDepartamentoPer']; }
  get IdProvinciaPer() { return this.modalForm.controls['IdProvinciaPer']; }
  get IdDistritoPer() { return this.modalForm.controls['IdDistritoPer']; }
  get IdTipoExplotacion() { return this.modalForm.controls['IdTipoExplotacion']; }
  get Telefono() { return this.modalForm.controls['Telefono']; }
  get Celular() { return this.modalForm.controls['Celular']; }
  get CorreoElectronico() { return this.modalForm.controls['CorreoElectronico']; }
  get PaginaWeb() { return this.modalForm.controls['PaginaWeb']; }
  get NombreRepLegal() { return this.modalForm.controls['NombreRepLegal']; }
  get CelularRepLegal() { return this.modalForm.controls['CelularRepLegal']; }
  get CorreoRepLegal() { return this.modalForm.controls['CorreoRepLegal']; }
  get Direccion() { return this.modalForm.controls['Direccion']; }
  get IdDepartamento() { return this.modalForm.controls['IdDepartamento']; }
  get IdAnio() { return this.modalForm.controls['IdAnio']; }
  ngOnInit(): void {
    this.spinner.show();
    this.marcolistaServiceProxy.getMarcoListaxId(this.idRegistro)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;

            if (this.objRegistro.Id > 0) {
              this.modalForm.controls['IdDepartamento'].setValue(this.objRegistro.IdDepartamento.toString());
              this.modalForm.controls['IdCondicionJuridica'].setValue(this.objRegistro.IdCondicionJuridica.toString());
              this.modalForm.controls['IdCondicionJuridicaOtros'].setValue(this.objRegistro.IdCondicionJuridicaOtros==null?null:this.objRegistro.IdCondicionJuridicaOtros.toString());
              this.selCondicionJuridica(null);
              this.modalForm.controls['IdTipoDocumento'].setValue(this.objRegistro.IdTipoDocumento.toString());
              this.modalForm.controls['IdDepartamentoPer'].setValue(this.objRegistro.IdUbigeo.toString().substring(0, 2));
              this.modalForm.controls['IdProvinciaPer'].setValue(this.objRegistro.IdUbigeo.toString().substring(0, 4));
              this.modalForm.controls['IdDistritoPer'].setValue(this.objRegistro.IdUbigeo.toString());
              this.modalForm.controls['IdTipoExplotacion'].setValue(this.objRegistro.IdTipoExplotacion.toString());
              this.modalForm.controls['Telefono'].setValue(this.objRegistro.Telefono.toString());
              this.modalForm.controls['Celular'].setValue(this.objRegistro.Celular.toString());
              this.modalForm.controls['CorreoElectronico'].setValue(this.objRegistro.CorreoElectronico.toString());
              this.modalForm.controls['PaginaWeb'].setValue(this.objRegistro.PaginaWeb.toString());
              this.modalForm.controls['Direccion'].setValue(this.objRegistro.Direccion==null?null:this.objRegistro.Direccion.toString());
              this.modalForm.controls['IdDepartamento'].setValue(this.objRegistro.IdDepartamento.toString());
              this.modalForm.controls['IdAnio'].setValue(this.objRegistro.IdAnio==null?null:this.objRegistro.IdAnio.toString());
              if (this.perSA) {
                this.modalForm.controls['NumeroDocumentoSA'].setValue(this.objRegistro.NumeroDocumento.toString());
                this.modalForm.controls['RazonSocial'].setValue(this.objRegistro.RazonSocial==null?null:this.objRegistro.RazonSocial.toString());
                this.modalForm.controls['DireccionFiscalDomicilioSA'].setValue(this.objRegistro.DireccionFiscalDomicilio.toString());
                this.modalForm.controls['NombreRepLegal'].setValue(this.objRegistro.NombreRepLegal==null?null:this.objRegistro.NombreRepLegal.toString());
                this.modalForm.controls['CelularRepLegal'].setValue(this.objRegistro.CelularRepLegal==null?null:this.objRegistro.CelularRepLegal.toString());
                this.modalForm.controls['CorreoRepLegal'].setValue(this.objRegistro.CorreoRepLegal==null?null:this.objRegistro.CorreoRepLegal.toString());
              }
              else if (this.perPN) {
                this.modalForm.controls['NumeroDocumentoPN'].setValue(this.objRegistro.NumeroDocumento.toString());
                this.modalForm.controls['DireccionFiscalDomicilioPN'].setValue(this.objRegistro.DireccionFiscalDomicilio.toString());
                this.modalForm.controls['Nombre'].setValue(this.objRegistro.Nombre.toString());
                this.modalForm.controls['ApellidoPaterno'].setValue(this.objRegistro.ApellidoPaterno.toString());
                this.modalForm.controls['ApellidoMaterno'].setValue(this.objRegistro.ApellidoMaterno.toString());
                this.modalForm.controls['TieneRuc'].setValue(this.objRegistro.TieneRuc.toString());
              }
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
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
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
        this.objRegistro.IdCondicionJuridica = Number.parseInt(this.IdCondicionJuridica.value);
        if (this.perSAOtro) { this.objRegistro.IdCondicionJuridicaOtros = Number.parseInt(this.IdCondicionJuridicaOtros.value); }
        if (this.perSA) {
          this.objRegistro.NumeroDocumento = this.NumeroDocumentoSA.value;
          this.objRegistro.IdTipoDocumento = Number.parseInt(this.objRegistro.ListTipoDocumento.find(x => x.codigo == "RUC").value);
          this.objRegistro.RazonSocial = this.RazonSocial.value;
          this.objRegistro.DireccionFiscalDomicilio = this.DireccionFiscalDomicilioSA.value;
          this.objRegistro.NombreRepLegal = this.NombreRepLegal.value;
          this.objRegistro.CelularRepLegal = this.CelularRepLegal.value;
          this.objRegistro.CorreoRepLegal = this.CorreoRepLegal.value;
        }
        else if (this.perPN) {
          this.objRegistro.NumeroDocumento = this.NumeroDocumentoPN.value;
          this.objRegistro.IdTipoDocumento = Number.parseInt(this.IdTipoDocumento.value);
          this.objRegistro.DireccionFiscalDomicilio = this.DireccionFiscalDomicilioPN.value;
          this.objRegistro.Nombre = this.Nombre.value;
          this.objRegistro.ApellidoPaterno = this.ApellidoPaterno.value;
          this.objRegistro.ApellidoMaterno = this.ApellidoMaterno.value;
          this.objRegistro.TieneRuc = this.TieneRuc.value;
          
        }
        this.objRegistro.IdUbigeo = this.IdDistritoPer.value;
        this.objRegistro.IdTipoExplotacion = Number.parseInt(this.IdTipoExplotacion.value);
        this.objRegistro.Telefono = this.Telefono.value;
        this.objRegistro.Celular = this.Celular.value;
        this.objRegistro.CorreoElectronico = this.CorreoElectronico.value;
        this.objRegistro.PaginaWeb = this.PaginaWeb.value;
        this.objRegistro.Direccion = this.Direccion.value;
        this.objRegistro.IdDepartamento = this.IdDepartamento.value;
        this.objRegistro.IdAnio = Number.parseInt(this.IdAnio.value);
        this.spinner.show();
        this.marcolistaServiceProxy.CreateMarcoLista(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.idRegistro = Number.parseInt(result.datos.toString());
                this.close();
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
  selCondicionJuridica(event: any) {
    var codCondJur = this.objRegistro.ListCondicionJuridica.find(x => x.value == this.IdCondicionJuridica.value).codigo;
    switch (codCondJur) {
      case "PN": {
        this.perSA = false;
        this.perPN = true;
        this.perSAOtro = false;
        break;
      }
      case "SAC":
      case "SAA":
      case "SRL":
      case "EIRL":
      case "CA":
      case "SA": {
        this.perSA = true;
        this.perPN = false;
        this.perSAOtro = false;
        break;
      }
      case "OTRO": {
        this.perSA = true;
        this.perPN = false;
        this.perSAOtro = true;
        break;
      }
      default: {
        this.perSA = false;
        this.perPN = false;
        this.perSAOtro = false;
        break;
      }
    }

  }
  show() {

  }
  close() {
    this.exitModal();
  }
  selDepartamento(event: any) {
    this.spinner.show();
    this.ubigeoServiceProxy.getProvincias(this.IdDepartamentoPer.value)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro.ListProvincia = result.datos;
          }
          else {
            this.toastr.warning(result.message.toString(), 'Aviso');
          }
        }
      });
  }
  selProvincia(event: any) {
    this.spinner.show();
    this.ubigeoServiceProxy.getDistritos(this.IdProvinciaPer.value)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro.ListDistrito = result.datos;
          }
          else {
            this.toastr.warning(result.message.toString(), 'Aviso');
          }
        }
      });
  }
  getDatosRENIEC(){
    if(this.NumeroDocumentoPN.value.length==8){
    this.spinner.show();
        this.usuarioServiceProxy.GetDatosRENIEC(this.NumeroDocumentoPN.value)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                var reniec = JSON.parse(result.datos.toString());
                this.Nombre.setValue(reniec.datos.prenombres);
                this.ApellidoPaterno.setValue(reniec.datos.apPrimer);
                this.ApellidoMaterno.setValue(reniec.datos.apSegundo);
                this.toastr.success(result.message.toString(), 'Información');
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
  getDatosSUNAT(){
    if(this.NumeroDocumentoSA.value.length==11){
    this.spinner.show();
        this.usuarioServiceProxy.GetDatosSUNAT(this.NumeroDocumentoSA.value)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                var sunat= JSON.parse(result.datos.toString());
                this.RazonSocial.setValue(sunat.datos.ddp_nombre);
                this.toastr.success(result.message.toString(), 'Información');
              }
              else {
                this.toastr.error(result.message.toString(), 'Error');
              }
            }
          });
        }
        else{
          this.toastr.error("El RUC debe tener 11 dígitos", 'Error');
        }
  }
}
