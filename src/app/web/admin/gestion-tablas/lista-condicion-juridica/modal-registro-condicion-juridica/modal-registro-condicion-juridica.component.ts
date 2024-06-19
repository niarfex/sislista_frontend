import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CondicionJuridicaGetDto } from 'src/app/models/CondicionJuridica';
import { CondicionJuridicaServiceProxy } from 'src/shared/service-proxies/condicionjuridica-proxies';

@Component({
  selector: 'modal-registro-condicion-juridica',
  templateUrl: './modal-registro-condicion-juridica.component.html',
  styleUrls: ['./modal-registro-condicion-juridica.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroCondicionJuridicaComponent implements OnInit {

  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  objRegistro:CondicionJuridicaGetDto = new CondicionJuridicaGetDto();
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    CodigoCondicionJuridica:['',[Validators.required]],
    CondicionJuridica:['',[Validators.required]],
    DescripcionCondicionJuridica:['',[Validators.required]]
  });
  private condicionjuridicaServiceProxy: CondicionJuridicaServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
      this.condicionjuridicaServiceProxy = _injector.get(CondicionJuridicaServiceProxy); 
  }
  get CodigoCondicionJuridica(){return this.modalForm.controls['CodigoCondicionJuridica'];}
  get CondicionJuridica(){return this.modalForm.controls['CondicionJuridica'];}
  get DescripcionCondicionJuridica(){return this.modalForm.controls['DescripcionCondicionJuridica'];}
  ngOnInit(): void {
    this.spinner.show();
    this.condicionjuridicaServiceProxy.getCondicionJuridicaxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['CodigoCondicionJuridica'].setValue(this.objRegistro.CodigoCondicionJuridica.toString());
                this.modalForm.controls['CondicionJuridica'].setValue(this.objRegistro.CondicionJuridica.toString());
                this.modalForm.controls['DescripcionCondicionJuridica'].setValue(this.objRegistro.DescripcionCondicionJuridica.toString());                
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
        this.objRegistro.CodigoCondicionJuridica=this.CodigoCondicionJuridica.value;
        this.objRegistro.CondicionJuridica=this.CondicionJuridica.value;
        this.objRegistro.DescripcionCondicionJuridica=this.DescripcionCondicionJuridica.value;     
        this.spinner.show();
        this.condicionjuridicaServiceProxy.CreateCondicionJuridica(this.objRegistro)
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
