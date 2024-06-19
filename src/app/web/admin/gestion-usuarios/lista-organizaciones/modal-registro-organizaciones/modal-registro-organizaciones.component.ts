import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { OrganizacionGetDto } from 'src/app/models/Organizacion';
import { OrganizacionServiceProxy } from 'src/shared/service-proxies/organizacion-proxies';

@Component({
  selector: 'modal-registro-organizaciones',
  templateUrl: './modal-registro-organizaciones.component.html',
  styleUrls: ['./modal-registro-organizaciones.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroOrganizacionesComponent implements OnInit {
  
  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  objRegistro:OrganizacionGetDto = new OrganizacionGetDto();
  active: boolean = true;
  modalForm=this.formBuilder.group({
    IdTipoOrganizacion:['',[Validators.required]],
    IdDepartamento:['',[Validators.required]],
    NumeroDocumento:['',[Validators.required,Validators.minLength(11)]],
    Organizacion:['',[Validators.required]],
    DireccionFiscal:['',[Validators.required]],
    Telefono:['',[Validators.required]],
    PaginaWeb:['',[Validators.required]],
    CorreoElectronico:['',[Validators.required, Validators.email]],
  });
  private organizacionServiceProxy: OrganizacionServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
    this.organizacionServiceProxy = _injector.get(OrganizacionServiceProxy); 
  }
  get IdTipoOrganizacion(){return this.modalForm.controls['IdTipoOrganizacion'];}
  get IdDepartamento(){return this.modalForm.controls['IdDepartamento'];}
  get NumeroDocumento(){return this.modalForm.controls['NumeroDocumento'];}
  get Organizacion(){return this.modalForm.controls['Organizacion'];}
  get DireccionFiscal(){return this.modalForm.controls['DireccionFiscal'];}
  get Telefono(){return this.modalForm.controls['Telefono'];}
  get PaginaWeb(){return this.modalForm.controls['PaginaWeb'];}
  get CorreoElectronico(){return this.modalForm.controls['CorreoElectronico'];}
  
  ngOnInit(): void {
    this.spinner.show();
    this.organizacionServiceProxy.getOrganizacionxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['IdTipoOrganizacion'].setValue(this.objRegistro.IdTipoOrganizacion.toString());
                this.modalForm.controls['IdDepartamento'].setValue(this.objRegistro.IdDepartamento.toString());
                this.modalForm.controls['NumeroDocumento'].setValue(this.objRegistro.NumeroDocumento.toString());
                this.modalForm.controls['Organizacion'].setValue(this.objRegistro.Organizacion.toString());
                this.modalForm.controls['DireccionFiscal'].setValue(this.objRegistro.DireccionFiscal.toString());
                this.modalForm.controls['Telefono'].setValue(this.objRegistro.Telefono.toString());
                this.modalForm.controls['PaginaWeb'].setValue(this.objRegistro.PaginaWeb.toString());
                this.modalForm.controls['CorreoElectronico'].setValue(this.objRegistro.CorreoElectronico.toString());
              }
            }
            else{
              this.toastr.error(result.message.toString(), 'Error');
            }            
          }
        });
  }
 

  onFocusOutEvent(event: any,nombreControl:string){
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
        this.objRegistro.IdTipoOrganizacion=Number.parseInt(this.IdTipoOrganizacion.value);
        this.objRegistro.IdDepartamento=this.IdDepartamento.value;
        this.objRegistro.NumeroDocumento=this.NumeroDocumento.value;
        this.objRegistro.Organizacion=this.Organizacion.value;
        this.objRegistro.DireccionFiscal=this.DireccionFiscal.value;
        this.objRegistro.Telefono=this.Telefono.value;
        this.objRegistro.PaginaWeb=this.PaginaWeb.value;
        this.objRegistro.CorreoElectronico=this.CorreoElectronico.value;
        this.spinner.show();
        this.organizacionServiceProxy.CreateOrganizacion(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');   
                this.idRegistro=result.datos;          
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

  show(){
    
  }
  close(){
    this.exitModal();
  }

}
