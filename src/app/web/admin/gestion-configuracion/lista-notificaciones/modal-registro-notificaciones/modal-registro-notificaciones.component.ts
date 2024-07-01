import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { NotificacionGetDto } from 'src/app/models/Notificacion';
import { NotificacionServiceProxy } from 'src/shared/service-proxies/notificacion-proxies';

@Component({
  selector: 'modal-registro-notificaciones',
  templateUrl: './modal-registro-notificaciones.component.html',
  styleUrls: ['./modal-registro-notificaciones.component.scss']
})
export class ModalRegistroNotificacionesComponent implements OnInit {

  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  @Input() modalActivo: boolean = true;
  objRegistro:NotificacionGetDto = new NotificacionGetDto();
  active: boolean = true;
  modalForm=this.formBuilder.group({
    Asunto:['',[Validators.required]],
    IdFrecuencia:['',[Validators.required]],
    IdProgramacionRegistro:['',[Validators.required]],
    IdEtapa:['',[Validators.required]],
    Descripcion:['',[Validators.required]],
    IdPerfil:['',[Validators.required]]
  });
  private organizacionServiceProxy: NotificacionServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
    this.organizacionServiceProxy = _injector.get(NotificacionServiceProxy); 
  }
  get Asunto(){return this.modalForm.controls['Asunto'];}
  get IdFrecuencia(){return this.modalForm.controls['IdFrecuencia'];}
  get IdProgramacionRegistro(){return this.modalForm.controls['IdProgramacionRegistro'];}
  get IdEtapa(){return this.modalForm.controls['IdEtapa'];}
  get Descripcion(){return this.modalForm.controls['Descripcion'];}
  get IdPerfil(){return this.modalForm.controls['IdPerfil'];}
  
  ngOnInit(): void {
    this.spinner.show();
    this.organizacionServiceProxy.getNotificacionxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['Asunto'].setValue(this.objRegistro.Asunto==null?null:this.objRegistro.Asunto.toString());
                this.modalForm.controls['IdFrecuencia'].setValue(this.objRegistro.IdFrecuencia.toString());
                this.modalForm.controls['IdProgramacionRegistro'].setValue(this.objRegistro.IdProgramacionRegistro.toString());
                this.modalForm.controls['IdEtapa'].setValue(this.objRegistro.IdEtapa.toString());
                this.modalForm.controls['Descripcion'].setValue(this.objRegistro.Descripcion.toString());
                this.modalForm.controls['IdPerfil'].setValue(this.objRegistro.IdPerfil.toString());
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
        this.objRegistro.IdFrecuencia=Number.parseInt(this.IdFrecuencia.value);
        this.objRegistro.IdProgramacionRegistro=Number.parseInt(this.IdProgramacionRegistro.value);
        this.objRegistro.IdEtapa=Number.parseInt(this.IdEtapa.value);
        this.objRegistro.IdPerfil=Number.parseInt(this.IdPerfil.value);
        this.objRegistro.Descripcion=this.Descripcion.value;     
        this.objRegistro.Asunto=this.Asunto.value;
        this.spinner.show();
        this.organizacionServiceProxy.CreateNotificacion(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');   
                this.idRegistro=Number.parseInt(result.datos.toString());   
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

  show(){
    
  }
  close(){
    this.exitModal();
  }

}
