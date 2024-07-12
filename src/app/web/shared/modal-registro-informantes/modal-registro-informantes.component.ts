import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { InformanteGetDto } from 'src/app/models/Informante';
import { SelectTipoDto } from 'src/app/models/SelectTipo';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

@Component({
  standalone: true,
  selector: 'modal-registro-informantes',
  templateUrl: './modal-registro-informantes.component.html',
  styleUrl: './modal-registro-informantes.component.scss',
  providers: [ConfirmationService]
})
export class ModalRegistroInformantesComponent {
  @Input() exitSubModal = (): void => {};
  @Input() listTipoDocumento: SelectTipoDto[];
  @Input() listEstadoEntrevista: SelectTipoDto[];
  @Output() enviarInformante = new EventEmitter<any>();
  objRegistro: InformanteGetDto = new InformanteGetDto();

  selDNI:boolean=false;
  modalForm = this.formBuilder.group({
    IdTipoDocumento: ['', [Validators.required]],
    NumeroDocumento: ['', this.selDNI?[Validators.required, Validators.min(8)]: [Validators.required]],
    Nombre: ['', [Validators.required]],
    ApellidoPaterno: ['', [Validators.required]],
    ApellidoMaterno: ['', [Validators.required]],
    Cargo: ['', [Validators.required]],
    CorreoElectronico: ['', [Validators.required]],
    Celular: ['', [Validators.required]],
    Telefono: ['', []],
    IdEstado: ['', [Validators.required]],
    Observacion: ['', []],
    Direccion: ['', [Validators.required]],
    CoordenadaEste: ['', [Validators.required]],
    CoordenadaNorte: ['', [Validators.required]]
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
      this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
    }
    get IdTipoDocumento() { return this.modalForm.controls['IdTipoDocumento']; }
    get NumeroDocumento() { return this.modalForm.controls['NumeroDocumento']; }
    get Nombre() { return this.modalForm.controls['Nombre']; }
    get ApellidoPaterno() { return this.modalForm.controls['ApellidoPaterno']; }
    get ApellidoMaterno() { return this.modalForm.controls['ApellidoMaterno']; }
    get Cargo() { return this.modalForm.controls['Cargo']; }
    get CorreoElectronico() { return this.modalForm.controls['CorreoElectronico']; }
    get Celular() { return this.modalForm.controls['Celular']; }
    get Telefono() { return this.modalForm.controls['Telefono']; }
    get IdEstado() { return this.modalForm.controls['IdEstado']; }
    get Observacion() { return this.modalForm.controls['Observacion']; }
    get Direccion() { return this.modalForm.controls['Direccion']; }
    get CoordenadaEste() { return this.modalForm.controls['CoordenadaEste']; }
    get CoordenadaNorte() { return this.modalForm.controls['CoordenadaNorte']; }
    ngOnInit(): void {
      
    }
    onFocusOutEvent(event: any, nombreControl: string) {
      this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
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
                  this.Nombre.setValue(reniec.datos.prenombres);
                  this.ApellidoPaterno.setValue(reniec.datos.apPrimer);
                  this.ApellidoMaterno.setValue(reniec.datos.apSegundo);
                  this.Nombre.disable();
                  this.ApellidoPaterno.disable();
                  this.ApellidoMaterno.disable();
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
    selTipoDocumento(){
      var tipoDoc = this.listTipoDocumento.find(x => x.value == this.IdTipoDocumento.value).codigo;
      if(tipoDoc=="DNI"){this.selDNI=true;}else{this.selDNI=false;}
    }


    onClickSubmit(data) {
      if(this.selDNI){
        if(this.NumeroDocumento.value.length!=8){
          this.toastr.error("El número de DNI debe tener 8 dígitios", 'Error');
          return;
        }
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
          this.asignarInformante();
         
        },
        reject: () => {
  
        }
      });
  
    }  
    close(){
      this.exitSubModal();
    }
    asignarInformante(){
      this.enviarInformante.emit(this.objRegistro);
      this.close();
    }
}
