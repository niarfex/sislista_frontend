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
import { finalize, interval, map } from 'rxjs';
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
  inicio: number = 0;
  time!: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  plantillaForm = this.formBuilder.group({
    IdCondicionJuridica: ['', [Validators.required]],
    IdCondicionJuridicaOtrosSA: ['', this.perSAOtro ? [Validators.required] : []],
    IdCondicionJuridicaOtrosPN: ['', this.perSAOtro ? [Validators.required] : []],
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
    IdDepartamentoPerSA: ['', [Validators.required]],
    IdProvinciaPerSA: ['', [Validators.required]],
    IdDistritoPerSA: ['', [Validators.required]],
    IdDepartamentoPerPN: ['', [Validators.required]],
    IdProvinciaPerPN: ['', [Validators.required]],
    IdDistritoPerPN: ['', [Validators.required]],
    IdTipoExplotacionSA: ['', [Validators.required]],
    IdTipoExplotacionPN: ['', [Validators.required]],
    TelefonoSA: [''],
    Telefonopn: [''],
    CelularSA: ['', [Validators.required]],
    CelularPN: ['', [Validators.required]],
    CorreoElectronicoSA: ['', [Validators.required, Validators.email]],
    CorreoElectronicoPN: ['', [Validators.required, Validators.email]],
    PaginaWebSA: [''],
    PaginaWebPN: [''],
    NombreRepLegal: ['', this.perSA ? [Validators.required] : []],
    CelularRepLegal: ['', this.perSA ? [Validators.required] : []],
    CorreoRepLegal: ['', this.perSA ? [Validators.required, Validators.email] : []],
    CantidadFundo: [''],
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
  get IdDepartamentoPerSA() { return this.plantillaForm.controls['IdDepartamentoPerSA']; }
  get IdDepartamentoPerPN() { return this.plantillaForm.controls['IdDepartamentoPerPN']; }
  get IdProvinciaPerSA() { return this.plantillaForm.controls['IdProvinciaPerSA']; }
  get IdProvinciaPerPN() { return this.plantillaForm.controls['IdProvinciaPerPN']; }
  get IdDistritoPerSA() { return this.plantillaForm.controls['IdDistritoPerSA']; }
  get IdDistritoPerPN() { return this.plantillaForm.controls['IdDistritoPerPN']; }
  get IdTipoExplotacionSA() { return this.plantillaForm.controls['IdTipoExplotacionSA']; }
  get IdTipoExplotacionPN() { return this.plantillaForm.controls['IdTipoExplotacionPN']; }
  get TelefonoSA() { return this.plantillaForm.controls['TelefonoSA']; }
  get TelefonoPN() { return this.plantillaForm.controls['TelefonoPN']; }
  get CelularSA() { return this.plantillaForm.controls['CelularSA']; }
  get CelularPN() { return this.plantillaForm.controls['CelularPN']; }
  get CorreoElectronicoSA() { return this.plantillaForm.controls['CorreoElectronicoSA']; }
  get CorreoElectronicoPN() { return this.plantillaForm.controls['CorreoElectronicoPN']; }
  get PaginaWebSA() { return this.plantillaForm.controls['PaginaWebSA']; }
  get PaginaWebPN() { return this.plantillaForm.controls['PaginaWebPN']; }
  get NombreRepLegal() { return this.plantillaForm.controls['NombreRepLegal']; }
  get CelularRepLegal() { return this.plantillaForm.controls['CelularRepLegal']; }
  get CorreoRepLegal() { return this.plantillaForm.controls['CorreoRepLegal']; }
  get CantidadFundo() { return this.plantillaForm.controls['CantidadFundo']; }
  ngOnInit(): void {
    this.time = { hours: 0, minutes: 0, seconds: this.inicio };
    this.start().subscribe();
    this.spinner.show();
    this.gestionregistroServiceProxy.getGestionRegistroxDatos(this.numDoc, this.idPeriodo)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            this.CantidadFundo.setValue(this.objRegistro.ListFundos.length.toString());
            this.plantillaForm.controls['IdCondicionJuridica'].setValue(this.objRegistro.IdCondicionJuridica.toString());
            this.plantillaForm.controls['IdCondicionJuridica'].disable();
            this.selCondicionJuridica(null);
            if (this.perSA) {
              this.plantillaForm.controls['NumeroDocumentoSA'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.plantillaForm.controls['NumeroDocumentoSA'].disable();
              this.plantillaForm.controls['RazonSocial'].setValue(this.objRegistro.RazonSocial.toString());
              this.plantillaForm.controls['RazonSocial'].disable();
              this.plantillaForm.controls['DireccionFiscalDomicilioSA'].setValue(this.objRegistro.DireccionFiscalDomicilio.toString());
              this.plantillaForm.controls['DireccionFiscalDomicilioSA'].disable();
              this.plantillaForm.controls['IdDepartamentoPerSA'].setValue(this.objRegistro.IdUbigeo.toString().substring(0, 2));
              this.plantillaForm.controls['IdDepartamentoPerSA'].disable();
              this.plantillaForm.controls['IdProvinciaPerSA'].setValue(this.objRegistro.IdUbigeo.toString().substring(0, 4));
              this.plantillaForm.controls['IdProvinciaPerSA'].disable();
              this.plantillaForm.controls['IdDistritoPerSA'].setValue(this.objRegistro.IdUbigeo.toString());
              this.plantillaForm.controls['IdDistritoPerSA'].disable();
              this.plantillaForm.controls['IdTipoExplotacionSA'].setValue(this.objRegistro.IdTipoExplotacion.toString());
              this.plantillaForm.controls['IdTipoExplotacionSA'].disable();
              this.plantillaForm.controls['TelefonoSA'].setValue(this.objRegistro.Telefono.toString());
              this.plantillaForm.controls['TelefonoSA'].disable();
              this.plantillaForm.controls['CelularSA'].setValue(this.objRegistro.Celular.toString());
              this.plantillaForm.controls['CelularSA'].disable();
              this.plantillaForm.controls['CorreoElectronicoSA'].setValue(this.objRegistro.CorreoElectronico.toString());
              this.plantillaForm.controls['CorreoElectronicoSA'].disable();
              this.plantillaForm.controls['PaginaWebSA'].setValue(this.objRegistro.PaginaWeb.toString());
              this.plantillaForm.controls['PaginaWebSA'].disable();
              this.plantillaForm.controls['NombreRepLegal'].setValue(this.objRegistro.NombreRepLegal == null ? null : this.objRegistro.NombreRepLegal.toString());
              this.plantillaForm.controls['NombreRepLegal'].disable();
              this.plantillaForm.controls['CelularRepLegal'].setValue(this.objRegistro.CelularRepLegal == null ? null : this.objRegistro.CelularRepLegal.toString());
              this.plantillaForm.controls['CelularRepLegal'].disable();
              this.plantillaForm.controls['CorreoRepLegal'].setValue(this.objRegistro.CorreoRepLegal == null ? null : this.objRegistro.CorreoRepLegal.toString());
              this.plantillaForm.controls['CorreoRepLegal'].disable();
            }
            if (this.perPN) {
              this.plantillaForm.controls['NumeroDocumentoPN'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.plantillaForm.controls['NumeroDocumentoPN'].disable();
              this.plantillaForm.controls['Nombre'].setValue(this.objRegistro.Nombre.toString());
              this.plantillaForm.controls['Nombre'].disable();
              this.plantillaForm.controls['ApellidoPaterno'].setValue(this.objRegistro.ApellidoPaterno.toString());
              this.plantillaForm.controls['ApellidoPaterno'].disable();
              this.plantillaForm.controls['ApellidoMaterno'].setValue(this.objRegistro.ApellidoMaterno.toString());
              this.plantillaForm.controls['ApellidoMaterno'].disable();
              this.plantillaForm.controls['TieneRuc'].setValue(this.objRegistro.TieneRuc.toString());
              this.plantillaForm.controls['TieneRuc'].disable();
              this.plantillaForm.controls['IdTipoDocumento'].setValue(this.objRegistro.IdTipoDocumento.toString());
              this.plantillaForm.controls['IdTipoDocumento'].disable();
              this.plantillaForm.controls['DireccionFiscalDomicilioSA'].setValue(this.objRegistro.DireccionFiscalDomicilio.toString());
              this.plantillaForm.controls['DireccionFiscalDomicilioSA'].disable();
              this.plantillaForm.controls['IdDepartamentoPerPN'].setValue(this.objRegistro.IdUbigeo.toString().substring(0, 2));
              this.plantillaForm.controls['IdDepartamentoPerPN'].disable();
              this.plantillaForm.controls['IdProvinciaPerPN'].setValue(this.objRegistro.IdUbigeo.toString().substring(0, 4));
              this.plantillaForm.controls['IdProvinciaPerPN'].disable();
              this.plantillaForm.controls['IdDistritoPerPN'].setValue(this.objRegistro.IdUbigeo.toString());
              this.plantillaForm.controls['IdDistritoPerPN'].disable();
              this.plantillaForm.controls['IdTipoExplotacionPN'].setValue(this.objRegistro.IdTipoExplotacion.toString());
              this.plantillaForm.controls['IdTipoExplotacionPN'].disable();
              this.plantillaForm.controls['TelefonoPN'].setValue(this.objRegistro.Telefono.toString());
              this.plantillaForm.controls['TelefonoPN'].disable();
              this.plantillaForm.controls['CelularPN'].setValue(this.objRegistro.Celular.toString());
              this.plantillaForm.controls['CelularPN'].disable();
              this.plantillaForm.controls['CorreoElectronicoPN'].setValue(this.objRegistro.CorreoElectronico.toString());
              this.plantillaForm.controls['CorreoElectronicoPN'].disable();
              this.plantillaForm.controls['PaginaWebPN'].setValue(this.objRegistro.PaginaWeb.toString());
              this.plantillaForm.controls['PaginaWebPN'].disable();
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
  updateTime() {
    this.inicio = this.inicio + 1;

    // Cálculos para sacar lo que resta hasta ese tiempo objetivo / final
    const hours = Math.floor(this.inicio / (60 * 60));
    const mins = Math.floor(this.inicio / (60));
    const secs = this.inicio;

    // La diferencia que se asignará para mostrarlo en la pantalla
    this.time.hours = hours * 24;
    this.time.minutes = mins - (hours * 60);
    this.time.seconds = secs - (mins * 60);
  }
  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
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
    this.ubigeoServiceProxy.getProvincias(this.IdDepartamentoPerSA.value)
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
    this.ubigeoServiceProxy.getDistritos(this.IdProvinciaPerSA.value)
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
