import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { MarcoListaGetDto } from 'src/app/models/MarcoLista';
import { MarcoListaServiceProxy } from 'src/shared/service-proxies/marcolista-proxies';

@Component({
  selector: 'modal-registro-marco-lista',
  templateUrl: './modal-registro-marco-lista.component.html',
  styleUrls: ['./modal-registro-marco-lista.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroMarcoListaComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() idRegistro: number;
  
  objRegistro: MarcoListaGetDto = new MarcoListaGetDto();
  txt_campo: string = "";
  active: boolean = true;
  perSA:boolean=false;
  perPN:boolean=false;
  perSAOtro:boolean=false;
  modalForm = this.formBuilder.group({
    IdCondicionJuridica: ['', [Validators.required]],
    IdCondicionJuridicaOtros: ['', this.perSAOtro ? [Validators.required]:[]],
    NumeroDocumentoSA: ['', this.perSA ? [Validators.required]:[]],
    NumeroDocumentoPN: ['', this.perPN ? [Validators.required]:[]],
    IdTipoDocumento: ['', this.perPN ? [Validators.required]:[]],
    RazonSocial: ['', this.perSA ? [Validators.required]:[]],
    DireccionFiscalDomicilioSA: ['', this.perSA ? [Validators.required]:[]],
    DireccionFiscalDomicilioPN: ['', this.perPN ? [Validators.required]:[]],
    Nombre: ['', this.perPN ? [Validators.required]:[]],
    ApellidoPaterno: ['', this.perPN ? [Validators.required]:[]],
    ApellidoMaterno: ['', this.perPN ? [Validators.required]:[]],
    TieneRuc: ['', this.perPN ? [Validators.required]:[]],
    IdDepartamentoPer: ['', [Validators.required]],
    IdProvinciaPer: ['', ],
    IdDistritoPer: ['', ],
    IdTipoExplotacion: ['', [Validators.required]],
    Telefono: ['', [Validators.required]],
    Celular: ['', [Validators.required]],
    CorreoElectronico: ['', [Validators.required, Validators.email]],
    PaginaWeb: ['', [Validators.required]],
    NombreRepLegal: ['', this.perSA ? [Validators.required]:[]],
    CelularRepLegal: ['', this.perSA ? [Validators.required]:[]],
    CorreoRepLegal: ['', this.perSA ? [Validators.required, Validators.email]:[]],
    Direccion: ['', [Validators.required]],
    IdDepartamento: ['', [Validators.required]],
  });
  private marcolistaServiceProxy: MarcoListaServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.marcolistaServiceProxy = _injector.get(MarcoListaServiceProxy);
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
  get Direccion() { return this.modalForm.controls['CorreoRepLegal']; }
  get IdDepartamento() { return this.modalForm.controls['IdDepartamento']; }
  ngOnInit(): void {
    this.spinner.show();
    this.marcolistaServiceProxy.getMarcoListaxId(this.idRegistro)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            console.log(result);
            if (this.objRegistro.Id > 0) {
              this.modalForm.controls['IdDepartamento'].setValue(this.objRegistro.IdDepartamento.toString());
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
        this.objRegistro.IdDepartamento = this.IdDepartamento.value;

        this.spinner.show();
        this.marcolistaServiceProxy.CreateMarcoLista(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.idRegistro = result.datos;
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
    var codCondJur=this.objRegistro.ListCondicionJuridica.find(x => x.value==this.IdCondicionJuridica.value).codigo;
    switch(codCondJur){
      case "PN": { 
        this.perSA=false;
        this.perPN=true;
        this.perSAOtro=false;
        break; 
      }
      case "SAC":
      case "SAA":
        case "SRL":
        case "EIRL":
        case "CA":
        case "SA": { 
        this.perSA=true;
        this.perPN=false;
        this.perSAOtro=false;
        break; 
      }
      case "OTRO": { 
        this.perSA=true;
        this.perPN=false;
        this.perSAOtro=true;
        break; 
      }
      default: { 
        this.perSA=false;
        this.perPN=false;
        this.perSAOtro=false;
        break; 
     } 
    }
    
  }
  show() {

  }
  close() {
    this.exitModal();
  }
}
