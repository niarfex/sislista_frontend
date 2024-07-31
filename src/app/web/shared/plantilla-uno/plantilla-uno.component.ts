import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ListaInformantesComponent } from '../lista-informantes/lista-informantes.component';
import { RegistroFundoPlantillaComponent } from '../registro-fundo-plantilla/registro-fundo-plantilla.component';
import { ListaCamposPlantillaComponent } from '../registro-fundo-plantilla/lista-campos-plantilla/lista-campos-plantilla.component';
import { ModalRegistroInformantesComponent } from '../modal-registro-informantes/modal-registro-informantes.component';
import { ModalMetodoInsercionComponent } from '../modal-metodo-insercion/modal-metodo-insercion.component';
import { ListaArchivosComponent } from '../lista-archivos/lista-archivos.component';
import { GestionRegistroGetDto } from 'src/app/models/GestionRegistro';
import { UbigeoServiceProxy } from 'src/shared/service-proxies/ubigeo-proxies';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, interval, map } from 'rxjs';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';
import { InformanteGetDto } from 'src/app/models/Informante';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FundoGetDto, ResponseFundoGetDto } from 'src/app/models/Fundo';
import { SelectTipoDto } from 'src/app/models/SelectTipo';
import { CampoGetDto } from 'src/app/models/Campo';
import { ArchivoGetDto } from 'src/app/models/Archivo';
import { ModalCargarArchivoComponent } from "../modal-cargar-archivo/modal-cargar-archivo.component";
import { ModalDibujarPoligonoComponent } from "../modal-dibujar-poligono/modal-dibujar-poligono.component";
import { ListaSistemaPecuarioComponent } from '../lista-sistema-pecuario/lista-sistema-pecuario.component';

import { ModalSelecEstadoComponent } from '../modal-selec-estado/modal-selec-estado.component';
import { ModalRegistroObservacionComponent } from '../modal-registro-observacion/modal-registro-observacion.component';
import { PecuarioGetDto } from 'src/app/models/Pecuario';
import { LoginService } from 'src/auth/services/login.service';
import { Login } from 'src/app/models/login';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'plantilla-uno',
  templateUrl: './plantilla-uno.component.html',
  styleUrl: './plantilla-uno.component.scss',
  providers: [ConfirmationService],
  imports: [CommonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ListaInformantesComponent,
    RegistroFundoPlantillaComponent,
    ListaCamposPlantillaComponent,
    ModalRegistroInformantesComponent,
    ListaArchivosComponent,
    ModalMetodoInsercionComponent,
    ModalCargarArchivoComponent,
    ModalDibujarPoligonoComponent,
    ListaSistemaPecuarioComponent,
    ModalSelecEstadoComponent,
    ModalRegistroObservacionComponent]
})
export class PlantillaUnoComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() numDoc: String;
  @Input() idPeriodo: number;
  @Input() listFields: any[];
  modalActivoEmp: boolean = true;
  campos: CampoGetDto[];
  perSA: boolean = false;
  perPN: boolean = false;
  perSAOtro: boolean = false;
  bArchivoOk: boolean;
  cadPeriodo: String;
  nombreElemento: String = "";
  listLineaProd: SelectTipoDto[] = [];
  listEspecie: SelectTipoDto[] = [];
  listEstados: SelectTipoDto[] = [];
  viewUserTemplate1: TemplateRef<any>;
  viewUserTemplate2: TemplateRef<any>;
  viewUserTemplate5: TemplateRef<any>;
  usuario: Login;
  estadoResultado: number = 0;
  tipoPerfil: String = "";
  objPecuario: PecuarioGetDto = new PecuarioGetDto();
  objRegistro: GestionRegistroGetDto = new GestionRegistroGetDto();
  inicio: number = 0;
  today: Date;
  changedDate = '';
  changedHour = '';
  pipe = new DatePipe('en-ES');
  time!: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  SubmodalRef?: BsModalRef;
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
    file: new FormControl(null, []),
    IdTipoInformacion: [''],
    NombreArchivo: [''],
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  private ubigeoServiceProxy: UbigeoServiceProxy;
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private SubmodalService: BsModalService
    , private loginService: LoginService
    , private router: Router) {
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
  get IdTipoInformacion() { return this.plantillaForm.controls['IdTipoInformacion']; }
  get NombreArchivo() { return this.plantillaForm.controls['NombreArchivo']; }
  ngOnInit(): void {
    this.usuario = this.loginService.getCurrentUserValue;
    this.time = { hours: 0, minutes: 0, seconds: this.inicio };
    this.start().subscribe();
    this.spinner.show();

    this.gestionregistroServiceProxy.getGestionRegistroxDatos(this.numDoc, this.idPeriodo)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            console.log(this.objRegistro);
            this.cadPeriodo = this.objRegistro.ListPeriodos.find(x => x.value == this.idPeriodo.toString()).label;
            this.CantidadFundo.setValue(this.objRegistro.ListFundos.length.toString());
            this.plantillaForm.controls['IdCondicionJuridica'].setValue(this.objRegistro.IdCondicionJuridica.toString());
            this.plantillaForm.controls['IdCondicionJuridica'].disable();
            this.selCondicionJuridica(null);
            if (this.perSA) {
              this.plantillaForm.controls['NumeroDocumentoSA'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.plantillaForm.controls['NumeroDocumentoSA'].disable();
              this.plantillaForm.controls['RazonSocial'].setValue(this.objRegistro.RazonSocial.toString());
              this.plantillaForm.controls['DireccionFiscalDomicilioSA'].setValue(this.objRegistro.DireccionFiscalDomicilio == null ? null : this.objRegistro.DireccionFiscalDomicilio.toString());
              this.plantillaForm.controls['IdDepartamentoPerSA'].setValue(this.objRegistro.IdUbigeo == null ? null : this.objRegistro.IdUbigeo.toString().substring(0, 2));
              this.plantillaForm.controls['IdProvinciaPerSA'].setValue(this.objRegistro.IdUbigeo == null ? null : this.objRegistro.IdUbigeo.toString().substring(0, 4));
              this.plantillaForm.controls['IdDistritoPerSA'].setValue(this.objRegistro.IdUbigeo == null ? null : this.objRegistro.IdUbigeo.toString());
              this.plantillaForm.controls['IdTipoExplotacionSA'].setValue(this.objRegistro.IdTipoExplotacion == null ? "" : this.objRegistro.IdTipoExplotacion.toString());
              this.plantillaForm.controls['TelefonoSA'].setValue(this.objRegistro.Telefono == null ? null : this.objRegistro.Telefono.toString());
              this.plantillaForm.controls['CelularSA'].setValue(this.objRegistro.Celular == null ? null : this.objRegistro.Celular.toString());
              this.plantillaForm.controls['CorreoElectronicoSA'].setValue(this.objRegistro.CorreoElectronico == null ? null : this.objRegistro.CorreoElectronico.toString());
              this.plantillaForm.controls['PaginaWebSA'].setValue(this.objRegistro.PaginaWeb == null ? null : this.objRegistro.PaginaWeb.toString());
              this.plantillaForm.controls['NombreRepLegal'].setValue(this.objRegistro.NombreRepLegal == null ? null : this.objRegistro.NombreRepLegal.toString());
              this.plantillaForm.controls['CelularRepLegal'].setValue(this.objRegistro.CelularRepLegal == null ? null : this.objRegistro.CelularRepLegal.toString());
              this.plantillaForm.controls['CorreoRepLegal'].setValue(this.objRegistro.CorreoRepLegal == null ? null : this.objRegistro.CorreoRepLegal.toString());
              this.nombreElemento = this.objRegistro.RazonSocial.toString();
            }
            if (this.perPN) {
              this.plantillaForm.controls['NumeroDocumentoPN'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.plantillaForm.controls['NumeroDocumentoPN'].disable();
              this.plantillaForm.controls['Nombre'].setValue(this.objRegistro.Nombre == null ? null : this.objRegistro.Nombre.toString());
              this.plantillaForm.controls['ApellidoPaterno'].setValue(this.objRegistro.ApellidoPaterno == null ? null : this.objRegistro.ApellidoPaterno.toString());
              this.plantillaForm.controls['ApellidoMaterno'].setValue(this.objRegistro.ApellidoMaterno == null ? null : this.objRegistro.ApellidoMaterno.toString());
              this.plantillaForm.controls['TieneRuc'].setValue(this.objRegistro.TieneRuc == null ? null : this.objRegistro.TieneRuc.toString());
              this.plantillaForm.controls['IdTipoDocumento'].setValue(this.objRegistro.IdTipoDocumento == null ? null : this.objRegistro.IdTipoDocumento.toString());
              this.plantillaForm.controls['IdTipoDocumento'].disable();
              this.plantillaForm.controls['DireccionFiscalDomicilioSA'].setValue(this.objRegistro.DireccionFiscalDomicilio == null ? null : this.objRegistro.DireccionFiscalDomicilio.toString());
              this.plantillaForm.controls['IdDepartamentoPerPN'].setValue(this.objRegistro.IdUbigeo == null ? null : this.objRegistro.IdUbigeo.toString().substring(0, 2));
              this.plantillaForm.controls['IdProvinciaPerPN'].setValue(this.objRegistro.IdUbigeo == null ? null : this.objRegistro.IdUbigeo.toString().substring(0, 4));
              this.plantillaForm.controls['IdDistritoPerPN'].setValue(this.objRegistro.IdUbigeo == null ? null : this.objRegistro.IdUbigeo.toString());
              this.plantillaForm.controls['IdTipoExplotacionPN'].setValue(this.objRegistro.IdTipoExplotacion == null ? "" : this.objRegistro.IdTipoExplotacion.toString());
              this.plantillaForm.controls['TelefonoPN'].setValue(this.objRegistro.Telefono == null ? null : this.objRegistro.Telefono.toString());
              this.plantillaForm.controls['CelularPN'].setValue(this.objRegistro.Celular == null ? null : this.objRegistro.Celular.toString());
              this.plantillaForm.controls['CorreoElectronicoPN'].setValue(this.objRegistro.CorreoElectronico == null ? null : this.objRegistro.CorreoElectronico.toString());
              this.plantillaForm.controls['PaginaWebPN'].setValue(this.objRegistro.PaginaWeb == null ? null : this.objRegistro.PaginaWeb.toString());
              this.nombreElemento = this.objRegistro.Nombre.toString() + " " + this.objRegistro.ApellidoPaterno.toString() + " " + this.objRegistro.ApellidoMaterno.toString();
            }
            if (this.objRegistro.CodigoUUID != null) {
              if (this.objRegistro.CodigoEstadoRegistro != "TRABAJOGABINETE"
                && this.objRegistro.CodigoEstadoRegistro != "PARAREGISTRAR2"
                && this.objRegistro.CodigoEstadoRegistro != "OBSERVADOSUPERVISOR"
                && this.objRegistro.CodigoEstadoRegistro != "REEMPLAZADO"
                && this.objRegistro.CodigoEstadoRegistro != "OBSERVADOESPECIALISTA") {
                this.plantillaForm.disable();
                this.modalActivoEmp = false;
              }
              //this.modalForm.controls['IdPerfil'].setValue(this.objRegistro.IdPerfil.toString());

            }
            if (this.objRegistro.ListFundos.length == 0) {
              //console.log(this.listFields);
              let listaFundos = new Set(this.listFields.map(obj => obj["NOMBRE_FUNDO"]));
              let contFundos = 0;
              listaFundos.forEach(myObject => {
                this.campos = [];
                let ListCampos = (new Set(this.listFields.filter(obj => obj["NOMBRE_FUNDO"] == myObject).map(obj => obj)));
                let superficieFundo = 0;
                let contCampos = 0;
                ListCampos.forEach(myObject2 => {
                  superficieFundo = superficieFundo + Number.parseFloat(myObject2["SUPERFICIE"]);
                  this.campos.push(new CampoGetDto({
                    Id: 0,
                    IdFundo: 0,
                    Campo: myObject2["NOMRE_CAMPO"],
                    IdTenencia: 0,
                    IdUsoTierra: 0,
                    IdCultivo: 0,
                    IdUsoNoAgricola: 0,
                    Observacion: "",
                    SuperficieCalc: Number.parseFloat(Number.parseFloat(myObject2["SUPERFICIE"]).toFixed(2)),
                    Superficie: 0.00,
                    SuperficieCultivada: 0.00,
                    Orden: contCampos + 1,
                    idusoNoAgricolaDisable: true,
                    agricolaDisable: true,
                  }));
                  contCampos = contCampos + 1;
                });


                this.objRegistro.ListFundos.push(new FundoGetDto({
                  Id: 0,
                  IdCuestionario: 0,
                  Fundo: myObject,
                  SuperficieTotalCalc: Number.parseFloat(superficieFundo.toFixed(2)),
                  SuperficieTotal: 0.00,
                  SuperficieAgricola: 0.00,
                  IdUbigeo: "",
                  Observacion: "",
                  Orden: contFundos + 1,
                  ListDepartamento: this.objRegistro.ListDepartamento,
                  ListProvincia: null,
                  ListDistrito: null,
                  ListCampos: this.campos
                }));
                contFundos = contFundos + 1;
              });
              this.CantidadFundo.setValue(this.objRegistro.ListFundos.length.toString());
            }
          }
          else {
            this.toastr.error(result.message.toString(), 'Error');
          }
        }
      });
  }
  updateTime() {
    this.today = new Date();
    let ChangedFormatDate = this.pipe.transform(this.today, 'dd/MM/YYYY');
    let ChangedFormatHour = this.pipe.transform(this.today, 'HH:mm:ss');
    this.changedDate = ChangedFormatDate;
    this.changedHour = ChangedFormatHour;

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
  exitSubModal = (): void => {
    this.SubmodalRef?.hide();
  };
  agregarInformante(informante: InformanteGetDto) {
    this.objRegistro.ListInformantes.push(informante);

  }
  agregarPecuario(pecuario: PecuarioGetDto) {
    //console.log(pecuario);
    //console.log(this.objRegistro.ListPecuarios);
    if (this.objRegistro.ListPecuarios.filter(x => x.OrdenCampo == pecuario.OrdenCampo && x.OrdenFundo == pecuario.OrdenFundo
      && (x.IdLineaProduccion == pecuario.IdLineaProduccion && x.IdEspecie == pecuario.IdEspecie)).length > 0) {
      this.objRegistro.ListPecuarios.find(x => x.OrdenCampo == pecuario.OrdenCampo && x.OrdenFundo == pecuario.OrdenFundo
        && (x.IdLineaProduccion == pecuario.IdLineaProduccion && x.IdEspecie == pecuario.IdEspecie)) == pecuario;
    }
    else {
      this.objRegistro.ListPecuarios.push(pecuario);
    }


  }
  actualizarPecuarios(lista: PecuarioGetDto[]) {
    this.objRegistro.ListPecuarios = lista;

  }
  registrarInformante(viewUserTemplate: TemplateRef<any>) {
    if (this.objRegistro.ListInformantes.length > 0) {
      this.toastr.error("Ya se ha registrado los datos de la entrevista", 'Aviso');
      return;
    }
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }

  selectMetodoInsercion(viewUserTemplate: TemplateRef<any>, viewUserTemplateA: TemplateRef<any>, viewUserTemplateB: TemplateRef<any>) {
    this.viewUserTemplate1 = viewUserTemplateA;
    this.viewUserTemplate2 = viewUserTemplateB;
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-m'
    });
  }
  mostrarVentanaMetodo(tipo: String) {
    if (tipo == "1") {
      this.mostrarCargarArchivo(this.viewUserTemplate1);
    }
    else if (tipo == "2") {
      this.mostrarCargarArchivo(this.viewUserTemplate2);
    }
  }
  mostrarCargarArchivo(viewUserTemplate: TemplateRef<any>) {
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }
  mostrarDibujarPoligono(viewUserTemplate: TemplateRef<any>) {
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }
  importar($event: any) {
    this.bArchivoOk = false;
    this.plantillaForm.patchValue({
      file: $event.target.files[0]
    })
    //this.saveFile();
    //const formData = new FormData();
    //formData.append('file', this.plantillaForm.get('file')?.value);    
    this.NombreArchivo.setValue(this.plantillaForm.get('file')?.value.name);
  }
  adjuntarArchivo() {
    console.log(this.objRegistro.ListArchivos);
    if (this.plantillaForm.get('file')?.value == null) {
      this.toastr.error("Debe seleccionar el archivo a adjuntar", 'Error');
      return;
    }
    if (this.IdTipoInformacion.value == "") {
      this.toastr.error("Debe seleccionar el tipo de información a adjuntar", 'Error');
      return;
    }
    //
    //if(this.fileForm.invalid){
    //  this.notify.error('Debe seleccionar un archivo')
    //  return;
    //}        
    const formData = new FormData();
    formData.append('file', this.plantillaForm.get('file')?.value);
    formData.append('numdoc', this.numDoc.toString());
    formData.append('periodo', this.idPeriodo.toString());
    //this.toastr.success("Se subio el archivo correctamente", 'Información');
    this.gestionregistroServiceProxy.subirArchivo(formData).subscribe(async (res: any) => {

      if (res.partialText != "" && !(res.partialText === undefined)) {
        this.toastr.success("Se adjunto el archivo correctamente", 'Información');
        this.bArchivoOk = true;
        let adjunto: ArchivoGetDto = new ArchivoGetDto();
        adjunto.Id = 0;
        adjunto.DescripcionArchivo = this.NombreArchivo.value;
        adjunto.NombreArchivo = res.partialText;
        adjunto.Archivo = res.partialText;
        adjunto.CuestionarioPrincipal = 1;
        adjunto.IdTipoInformacion = Number.parseInt(this.IdTipoInformacion.value);
        adjunto.TipoInformacion = this.objRegistro.ListTipoInformacion.find(x => x.value == this.IdTipoInformacion.value).label;
        adjunto.Peso = Number.parseFloat((this.plantillaForm.get('file')?.value.size / (1000)).toFixed(2));
        this.objRegistro.ListArchivos.push(adjunto);
        this.plantillaForm.get('file').setValue(null);
        this.IdTipoInformacion.setValue("");
        this.NombreArchivo.setValue("");
      }
      if (res.status === 200) {
        //this.getData();
      }
    },
      (err: any) => {
        this.bArchivoOk = false;
      });
  }
  actualizarArchivos(lista: ArchivoGetDto[]) {
    this.objRegistro.ListArchivos = lista;

  }
  previsualizarCuestionario() {

  }
  grabarCuestionario() {

    //console.log(this.objRegistro);
    let tieneErrores: boolean = false;
    let valAgricola = this.objRegistro.ListUsoTierra.find(x => x.codigo == "AGRÍCOLA").value;
    let valNoAgricola = this.objRegistro.ListUsoTierra.find(x => x.codigo == "NO AGRÍCOLA").value;
    let valPecuario = this.objRegistro.ListUsoNoAgricola.find(x => x.codigo == "PECUARIA").value;
    this.objRegistro.ListFundos.forEach(objFundo => {
      objFundo.ListCampos.forEach(objCampo => {
        if (objCampo.IdTenencia == 0) {
          this.toastr.error("El dato de tenencia es obligatorio para todos los campos", 'Error');
          tieneErrores = true;
        }
        if (objCampo.IdUsoTierra.toString() == valAgricola) {
          if (objCampo.SuperficieCultivada > objCampo.Superficie) {
            this.toastr.error("La Superficie cultivada no debe ser mayor a la Superficie reportada para el campo " + (objCampo.Campo == null ? "" : objCampo.Campo), 'Error');
            tieneErrores = true;
          }
          if (objCampo.IdCultivo == 0 || (objCampo.SuperficieCultivada.toString() == "" ? 0 : objCampo.SuperficieCultivada) == 0) {
            this.toastr.error("Para los campos donde seleccionó el Uso de la tierra de tipo Agrícola, se debe seleccionar el tipo de Cultivo e ingresar la Superficie cultivada", 'Error');
            tieneErrores = true;
          }
        }

        else if (objCampo.IdUsoTierra.toString() == valNoAgricola) {
          if (objCampo.IdUsoNoAgricola == 0) {
            this.toastr.error("Para los campos donde seleccionó el Uso de la tierra de tipo No Agrícola, se debe seleccionar el tipo de Uso no agrícola", 'Error');
            tieneErrores = true;
          }
          if (objCampo.Observacion.length == 0) {
            this.toastr.error("El campo Observación es obligatorio en el registro de Campos cuando el Uso de la tierra es de tipo No Agrícola", 'Error');
            tieneErrores = true;
          }
        }
        else {
          this.toastr.error("Para cada Campo se debe seleccionar el tipo de Uso de la tierra (Agrícola o No Agrícola)", 'Error');
          tieneErrores = true;
        }
        if (objCampo.IdUsoNoAgricola.toString() == valPecuario) {
          if (this.objRegistro.ListPecuarios.filter(x => x.OrdenFundo == objFundo.Orden && x.OrdenCampo == objCampo.Orden).length == 0) {
            this.toastr.error("Para los campos donde seleccionó el Uso no agrícola de tipo Pecuario, se debe registrar el Capítulo III", 'Error');
            tieneErrores = true;
          }
        }
      });
    });


    if (this.objRegistro.ListFundos.filter(x => x.IdUbigeo == "").length > 0) {
      this.toastr.error("Existen fundos sin registro de ubigeo", 'Error');
      tieneErrores = true;
    }
    if (this.objRegistro.ListInformantes.length == 0) {
      this.toastr.error("Se debe agregar datos de la entrevista", 'Error');
      tieneErrores = true;
    }
    if (tieneErrores) {
      return;
    }
    this.objRegistro.CantidadFundo = this.objRegistro.ListFundos.length.toString();

    if (this.perSA) {
      this.objRegistro.RazonSocial = this.plantillaForm.controls['RazonSocial'].value;
      this.objRegistro.DireccionFiscalDomicilio = this.plantillaForm.controls['DireccionFiscalDomicilioSA'].value;
      this.objRegistro.IdUbigeo = this.plantillaForm.controls['IdDistritoPerSA'].value;
      this.objRegistro.IdTipoExplotacion = Number.parseInt(this.plantillaForm.controls['IdTipoExplotacionSA'].value);
      this.objRegistro.Telefono = this.plantillaForm.controls['TelefonoSA'].value;
      this.objRegistro.Celular = this.plantillaForm.controls['CelularSA'].value;
      this.objRegistro.CorreoElectronico = this.plantillaForm.controls['CorreoElectronicoSA'].value;
      this.objRegistro.PaginaWeb = this.plantillaForm.controls['PaginaWebSA'].value;
      this.objRegistro.NombreRepLegal = this.plantillaForm.controls['NombreRepLegal'].value;
      this.objRegistro.CelularRepLegal = this.plantillaForm.controls['CelularRepLegal'].value;
      this.objRegistro.CorreoRepLegal = this.plantillaForm.controls['CorreoRepLegal'].value;
    }
    if (this.perPN) {
      this.objRegistro.Nombre = this.plantillaForm.controls['Nombre'].value;
      this.objRegistro.ApellidoPaterno = this.plantillaForm.controls['ApellidoPaterno'].value;
      this.objRegistro.ApellidoMaterno = this.plantillaForm.controls['ApellidoMaterno'].value;
      this.objRegistro.TieneRuc = this.plantillaForm.controls['TieneRuc'].value;
      this.objRegistro.DireccionFiscalDomicilio = this.plantillaForm.controls['DireccionFiscalDomicilioSA'].value;
      this.objRegistro.IdUbigeo = this.plantillaForm.controls['IdDistritoPerPN'].value;
      this.objRegistro.IdTipoExplotacion = Number.parseInt(this.plantillaForm.controls['IdTipoExplotacionPN'].value);
      this.objRegistro.Telefono = this.plantillaForm.controls['TelefonoPN'].value;
      this.objRegistro.Celular = this.plantillaForm.controls['CelularPN'].value;
      this.objRegistro.CorreoElectronico = this.plantillaForm.controls['CorreoElectronicoPN'].value;
      this.objRegistro.PaginaWeb = this.plantillaForm.controls['PaginaWebPN'].value;
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

        this.spinner.show();
        this.gestionregistroServiceProxy.CreateCuestionario(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.objRegistro.CodigoUUID = result.datos.toString();
                this.close();
                this.router.navigate(['app', 'operativo', 'lista-gestion-registro'], {});
                //console.log(result.datos);

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
  supervisarValidar(viewUserTemplate, viewUserTemplateA, tipo: String) {
    this.viewUserTemplate1 = viewUserTemplateA;
    this.tipoPerfil = tipo;
    this.listEstados = this.objRegistro.ListEstadosCuestionario
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-m'
    });
  }

  accionSupervisionValidacion(codigoEstado: String) {
    switch (codigoEstado) {
      case "APROBADO":
        this.spinner.show();
        this.gestionregistroServiceProxy.AprobarCuestionarioxUUID(this.objRegistro.CodigoUUID)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({ next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.objRegistro.CodigoUUID = result.datos.toString();
                this.close();
                this.router.navigate(['app', 'operativo', 'lista-gestion-registro'], {});
              }
              else {this.toastr.warning(result.message.toString(), 'Aviso');}
            }});
        break;
      case "DESAPROBADO":        
      case "INVALIDO":
        this.SubmodalRef = this.SubmodalService.show(this.viewUserTemplate1, {
          backdrop: 'static',
          keyboard: false,
          class: 'modal-lg'
        });
        break;
      case "RATIFICADO":
        this.spinner.show();
        this.gestionregistroServiceProxy.RatificarCuestionarioxUUID(this.objRegistro.CodigoUUID)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({ next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.objRegistro.CodigoUUID = result.datos.toString();
                this.close();
                this.router.navigate(['app', 'operativo', 'lista-gestion-registro'], {});
              }
              else {this.toastr.warning(result.message.toString(), 'Aviso');}
            }});
        break;
      case "DERIVADO":
        this.spinner.show();
        this.gestionregistroServiceProxy.DerivarCuestionarioxUUID(this.objRegistro.CodigoUUID)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({ next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.objRegistro.CodigoUUID = result.datos.toString();
                this.close();
                this.router.navigate(['app', 'operativo', 'lista-gestion-registro'], {});
              }
              else {this.toastr.warning(result.message.toString(), 'Aviso');}
            }});
        break;
      case "VALIDO":
        this.spinner.show();
        this.gestionregistroServiceProxy.ValidarCuestionarioxUUID(this.objRegistro.CodigoUUID)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({ next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.objRegistro.CodigoUUID = result.datos.toString();
                this.close();
                this.router.navigate(['app', 'operativo', 'lista-gestion-registro'], {});
              }
              else {this.toastr.warning(result.message.toString(), 'Aviso');}
            }});
        break;
      case "SUSTITUIR":       
        break;
      case "DESCARTAR":
        this.spinner.show();
        this.gestionregistroServiceProxy.DescartarCuestionarioxUUID(this.objRegistro.CodigoUUID)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({ next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.objRegistro.CodigoUUID = result.datos.toString();
                this.close();
                this.router.navigate(['app', 'operativo', 'lista-gestion-registro'], {});
              }
              else {this.toastr.warning(result.message.toString(), 'Aviso');}
            }});
        break;
      default:
        this.toastr.warning("Ocurrió un error, tipo de Estado no identificado", 'Aviso');
        break;
    }
  }

  convertDateToString(dateToBeConverted: string) {
    return dateToBeConverted == null ? "" : moment(dateToBeConverted, "YYYY-MM-DD HH:mm:ss").format("DD/MM/yyyy");
  }

}
