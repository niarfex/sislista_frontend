import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { TipoExplotacionGetDto } from 'src/app/models/TipoExplotacion';
import { TipoExplotacionServiceProxy } from 'src/shared/service-proxies/tipoexplotacion-proxies';

@Component({
  selector: 'modal-registro-tipo-explotacion',
  templateUrl: './modal-registro-tipo-explotacion.component.html',
  styleUrls: ['./modal-registro-tipo-explotacion.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroTipoExplotacionComponent implements OnInit {

  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  objRegistro:TipoExplotacionGetDto = new TipoExplotacionGetDto();
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    CodigoCondicionJuridica:['',[Validators.required]],
    CondicionJuridica:['',[Validators.required]],
    DescripcionCondicionJuridica:['',[Validators.required]]
  });
  private tipoexplotacionServiceProxy: TipoExplotacionServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
      this.tipoexplotacionServiceProxy = _injector.get(TipoExplotacionServiceProxy); 
  }
  get CodigoTipoExplotacion(){return this.modalForm.controls['CodigoTipoExplotacion'];}
  get TipoExplotacion(){return this.modalForm.controls['TipoExplotacion'];}
  get DescripcionTipoExplotacion(){return this.modalForm.controls['DescripcionTipoExplotacion'];}
  ngOnInit(): void {
    this.spinner.show();
    this.tipoexplotacionServiceProxy.getTipoExplotacionxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['CodigoTipoExplotacion'].setValue(this.objRegistro.CodigoTipoExplotacion.toString());
                this.modalForm.controls['TipoExplotacion'].setValue(this.objRegistro.TipoExplotacion.toString());
                this.modalForm.controls['DescripcionTipoExplotacion'].setValue(this.objRegistro.DescripcionTipoExplotacion.toString());               
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
        this.objRegistro.CodigoTipoExplotacion=this.CodigoTipoExplotacion.value;
        this.objRegistro.TipoExplotacion=this.TipoExplotacion.value;
        this.objRegistro.DescripcionTipoExplotacion=this.DescripcionTipoExplotacion.value;     
        this.spinner.show();
        this.tipoexplotacionServiceProxy.CreateTipoExplotacion(this.objRegistro)
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
