import { Component, Injector, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListaInformantesComponent } from '../lista-informantes/lista-informantes.component';
import { RegistroFundoPlantillaComponent } from '../registro-fundo-plantilla/registro-fundo-plantilla.component';
import { ListaCamposPlantillaComponent } from '../registro-fundo-plantilla/lista-campos-plantilla/lista-campos-plantilla.component';
import { GestionRegistroGetDto } from 'src/app/models/GestionRegistro';
import { UbigeoServiceProxy } from 'src/shared/service-proxies/ubigeo-proxies';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

@Component({
  standalone: true,
  selector: 'plantilla-uno',
  templateUrl: './plantilla-uno.component.html',
  styleUrl: './plantilla-uno.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    ListaInformantesComponent,
    RegistroFundoPlantillaComponent,
    ListaCamposPlantillaComponent]
})
export class PlantillaUnoComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() numDoc: String;
  @Input() idPeriodo: number;
  @Input() modalActivo: boolean = true;
  perSA: boolean = false;
  perPN: boolean = false;
  perSAOtro: boolean = false;
  objRegistro: GestionRegistroGetDto = new GestionRegistroGetDto();
  plantillaForm = this.formBuilder.group({
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
    campo: ['', [Validators.required]],
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  private ubigeoServiceProxy: UbigeoServiceProxy;
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.ubigeoServiceProxy = _injector.get(UbigeoServiceProxy);
    this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
  }
  get IdCondicionJuridica() { return this.plantillaForm.controls['IdCondicionJuridica']; }
  get IdCondicionJuridicaOtros() { return this.plantillaForm.controls['IdCondicionJuridicaOtros']; }
  get NumeroDocumentoSA() { return this.plantillaForm.controls['NumeroDocumentoSA']; }
  get NumeroDocumentoPN() { return this.plantillaForm.controls['NumeroDocumentoPN']; }
  get IdTipoDocumento() { return this.plantillaForm.controls['IdTipoDocumento']; }
  get RazonSocial() { return this.plantillaForm.controls['RazonSocial']; }
  get DireccionFiscalDomicilioSA() { return this.plantillaForm.controls['DireccionFiscalDomicilioSA']; }
  get DireccionFiscalDomicilioPN() { return this.plantillaForm.controls['DireccionFiscalDomicilioPN']; }
  get Nombre() { return this.plantillaForm.controls['Nombre']; }
  get ApellidoPaterno() { return this.plantillaForm.controls['ApellidoPaterno']; }
  get ApellidoMaterno() { return this.plantillaForm.controls['ApellidoMaterno']; }
  get TieneRuc() { return this.plantillaForm.controls['TieneRuc']; }
  get IdDepartamentoPer() { return this.plantillaForm.controls['IdDepartamentoPer']; }
  get IdProvinciaPer() { return this.plantillaForm.controls['IdProvinciaPer']; }
  get IdDistritoPer() { return this.plantillaForm.controls['IdDistritoPer']; }
  get IdTipoExplotacion() { return this.plantillaForm.controls['IdTipoExplotacion']; }
  get Telefono() { return this.plantillaForm.controls['Telefono']; }
  get Celular() { return this.plantillaForm.controls['Celular']; }
  get CorreoElectronico() { return this.plantillaForm.controls['CorreoElectronico']; }
  get PaginaWeb() { return this.plantillaForm.controls['PaginaWeb']; }
  get NombreRepLegal() { return this.plantillaForm.controls['NombreRepLegal']; }
  get CelularRepLegal() { return this.plantillaForm.controls['CelularRepLegal']; }
  get CorreoRepLegal() { return this.plantillaForm.controls['CorreoRepLegal']; }
  get Direccion() { return this.plantillaForm.controls['Direccion']; }
  get IdDepartamento() { return this.plantillaForm.controls['IdDepartamento']; }
  get IdAnio() { return this.plantillaForm.controls['IdAnio']; }
  get campo() {
    return this.plantillaForm.controls['campo'];
  }
  ngOnInit(): void {
    this.spinner.show();
    this.gestionregistroServiceProxy.getGestionRegistroxDatos(this.numDoc, this.idPeriodo)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            //console.log(result);

            var codCondJur = this.objRegistro.ListCondicionJuridica.find(x => x.value == this.objRegistro.IdCondicionJuridica.toString()).codigo;
            switch (codCondJur) {
              case "PN": { this.perSA = false; this.perPN = true; this.perSAOtro = false; break; }
              case "SAC": case "SAA": case "SRL": case "EIRL": case "CA": case "SA": {
                this.perSA = true; this.perPN = false; this.perSAOtro = false; break;
              }
              case "OTRO": { this.perSA = true; this.perPN = false; this.perSAOtro = true; break; }
              default: { this.perSA = false; this.perPN = false; this.perSAOtro = false; break; }
            }

            if (this.objRegistro.CodigoUUID != null) {
              //this.modalForm.controls['IdPerfil'].setValue(this.objRegistro.IdPerfil.toString());

            }

            
          }
          else {
            this.toastr.error(result.message.toString(), 'Error');
          }
          if (!this.modalActivo) {
            this.plantillaForm.disable();
          }
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
  getDatosRENIEC() {
    if (this.NumeroDocumentoPN.value.length == 8) {
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
    else {
      this.toastr.error("El DNI debe tener 8 dígitos", 'Error');
    }
  }
  getDatosSUNAT() {
    if (this.NumeroDocumentoSA.value.length == 11) {
      this.spinner.show();
      this.usuarioServiceProxy.GetDatosSUNAT(this.NumeroDocumentoSA.value)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if (result.success) {
              var sunat = JSON.parse(result.datos.toString());
              this.RazonSocial.setValue(sunat.datos.ddp_nombre);
              this.toastr.success(result.message.toString(), 'Información');
            }
            else {
              this.toastr.error(result.message.toString(), 'Error');
            }
          }
        });
    }
    else {
      this.toastr.error("El RUC debe tener 11 dígitos", 'Error');
    }
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.plantillaForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
  }
  close() {
    this.exitModal();
  }
}
