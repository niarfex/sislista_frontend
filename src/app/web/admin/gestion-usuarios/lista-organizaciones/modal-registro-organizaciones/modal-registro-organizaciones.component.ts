import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { OrganizacionGetDto } from 'src/app/models/Organizacion';
import { OrganizacionServiceProxy } from 'src/shared/service-proxies/organizacion-proxies';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';

@Component({
  selector: 'modal-registro-organizaciones',
  templateUrl: './modal-registro-organizaciones.component.html',
  styleUrls: ['./modal-registro-organizaciones.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroOrganizacionesComponent implements OnInit {

  @Input() exitModal = (): void => { };
  @Input() idRegistro: number;
  @Input() modalActivo: boolean = true;
  objRegistro: OrganizacionGetDto = new OrganizacionGetDto();
  modalForm = this.formBuilder.group({
    IdTipoOrganizacion: ['', [Validators.required]],
    IdDepartamento: [''],
    NumeroDocumento: ['', [Validators.required, Validators.minLength(11)]],
    Organizacion: ['', [Validators.required]],
    DireccionFiscal: ['', [Validators.required]],
    Telefono: [''],
    PaginaWeb: [''],
    CorreoElectronico: [''],
  });
  private usuarioServiceProxy: UsuarioServiceProxy;
  private organizacionServiceProxy: OrganizacionServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.organizacionServiceProxy = _injector.get(OrganizacionServiceProxy);
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
  }
  get IdTipoOrganizacion() { return this.modalForm.controls['IdTipoOrganizacion']; }
  get IdDepartamento() { return this.modalForm.controls['IdDepartamento']; }
  get NumeroDocumento() { return this.modalForm.controls['NumeroDocumento']; }
  get Organizacion() { return this.modalForm.controls['Organizacion']; }
  get DireccionFiscal() { return this.modalForm.controls['DireccionFiscal']; }
  get Telefono() { return this.modalForm.controls['Telefono']; }
  get PaginaWeb() { return this.modalForm.controls['PaginaWeb']; }
  get CorreoElectronico() { return this.modalForm.controls['CorreoElectronico']; }

  ngOnInit(): void {
    this.spinner.show();
    this.organizacionServiceProxy.getOrganizacionxId(this.idRegistro)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            if (this.objRegistro.Id > 0) {
              this.modalForm.controls['IdTipoOrganizacion'].setValue(this.objRegistro.IdTipoOrganizacion.toString());
              this.modalForm.controls['IdDepartamento'].setValue(this.objRegistro.IdDepartamento.toString());
              this.modalForm.controls['NumeroDocumento'].setValue(this.objRegistro.NumeroDocumento.toString());
              this.modalForm.controls['Organizacion'].setValue(this.objRegistro.Organizacion.toString());
              this.modalForm.controls['DireccionFiscal'].setValue(this.objRegistro.DireccionFiscal.toString());
              this.modalForm.controls['Telefono'].setValue(this.objRegistro.Telefono==null?null:this.objRegistro.Telefono.toString());
              this.modalForm.controls['PaginaWeb'].setValue(this.objRegistro.PaginaWeb==null?null:this.objRegistro.PaginaWeb.toString());
              this.modalForm.controls['CorreoElectronico'].setValue(this.objRegistro.CorreoElectronico==null?null:this.objRegistro.CorreoElectronico.toString());
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
    if(nombreControl!="CorreoElectronico"){
      this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
    }    
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
        this.objRegistro.IdTipoOrganizacion = Number.parseInt(this.IdTipoOrganizacion.value);
        this.objRegistro.IdDepartamento = this.IdDepartamento.value;
        this.objRegistro.NumeroDocumento = this.NumeroDocumento.value;
        this.objRegistro.Organizacion = this.Organizacion.value;
        this.objRegistro.DireccionFiscal = this.DireccionFiscal.value;
        this.objRegistro.Telefono = this.Telefono.value;
        this.objRegistro.PaginaWeb = this.PaginaWeb.value;
        this.objRegistro.CorreoElectronico = this.CorreoElectronico.value;
        this.spinner.show();
        this.organizacionServiceProxy.CreateOrganizacion(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');
                this.idRegistro = Number.parseInt(result.datos.toString());
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

  show() {

  }
  close() {    
    if(this.objRegistro.IdTipoOrganizacion!=(this.IdTipoOrganizacion.value==""?null:Number.parseInt(this.IdTipoOrganizacion.value))
    || (this.objRegistro.NumeroDocumento==null?"":this.objRegistro.NumeroDocumento)!= (this.NumeroDocumento.value==null?"":this.NumeroDocumento.value)
    || (this.objRegistro.Organizacion==null?"":this.objRegistro.Organizacion)!= (this.Organizacion.value==null?"":this.Organizacion.value)
    || (this.objRegistro.DireccionFiscal==null?"":this.objRegistro.DireccionFiscal)!= (this.DireccionFiscal.value==null?"":this.DireccionFiscal.value)
    || this.objRegistro.IdDepartamento!=(this.IdDepartamento.value==""?null:this.IdDepartamento.value) 
    || (this.objRegistro.Telefono==null?"":this.objRegistro.Telefono)!= (this.Telefono.value==null?"":this.Telefono.value)
    || (this.objRegistro.PaginaWeb==null?"":this.objRegistro.PaginaWeb)!= (this.PaginaWeb.value==null?"":this.PaginaWeb.value)
    || (this.objRegistro.CorreoElectronico==null?"":this.objRegistro.CorreoElectronico)!= (this.CorreoElectronico.value==null?"":this.CorreoElectronico.value)
    
  ){
      this.confirmationService.confirm({
        message: '¿Se perderan los datos no guardados, está seguro de salir?',
        header: 'Salir',
        icon: 'none',  
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptLabel: "Si, estoy seguro",
        rejectLabel: "Cancelar",
        acceptIcon: "none",
        rejectIcon: "none",   
        accept: () => {   
          this.exitModal();  
        },
        reject: () => {  
        }
      });
    }
    else{
      this.exitModal();
    }

    

    
  }
  getDatosSUNAT(){
    if(this.NumeroDocumento.value.length==11){
    this.spinner.show();
        this.usuarioServiceProxy.GetDatosSUNAT(this.NumeroDocumento.value)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                var sunat= JSON.parse(result.datos.toString());                
                if(sunat.datos!=null && sunat.datos!=undefined){
                  this.Organizacion.setValue(sunat.datos.ddp_nombre);
                  this.DireccionFiscal.setValue(sunat.datos.ddp_nomvia+" "+(sunat.ddp_numer1===undefined?"":sunat.ddp_numer1));
                  this.Organizacion.disable();
                  this.toastr.success(result.message.toString(), 'Información');
                }
                else{
                  console.log(sunat);
                  this.toastr.error("Hay un error en la consulta del RUC: "+this.NumeroDocumento.value, 'Error');
                }
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
