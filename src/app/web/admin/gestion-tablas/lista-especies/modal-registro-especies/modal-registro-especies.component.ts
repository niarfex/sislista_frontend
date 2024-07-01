import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { EspecieGetDto } from 'src/app/models/Especie';
import { EspecieServiceProxy } from 'src/shared/service-proxies/especie-proxies';

@Component({
  selector: 'modal-registro-especies',
  templateUrl: './modal-registro-especies.component.html',
  styleUrls: ['./modal-registro-especies.component.scss']
})
export class ModalRegistroEspeciesComponent implements OnInit {

  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  objRegistro:EspecieGetDto = new EspecieGetDto();
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    CodigoEspecie:['',[Validators.required]],
    Especie:['',[Validators.required]],
    DescripcionEspecie:['',[Validators.required]]
  });
  private especieServiceProxy: EspecieServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
      this.especieServiceProxy = _injector.get(EspecieServiceProxy); 
  }
  get CodigoEspecie(){return this.modalForm.controls['CodigoEspecie'];}
  get Especie(){return this.modalForm.controls['Especie'];}
  get DescripcionEspecie(){return this.modalForm.controls['DescripcionEspecie'];}
  ngOnInit(): void {
    this.spinner.show();
    this.especieServiceProxy.getEspeciexId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['CodigoEspecie'].setValue(this.objRegistro.CodigoEspecie.toString());
                this.modalForm.controls['Especie'].setValue(this.objRegistro.Especie.toString());
                this.modalForm.controls['DescripcionEspecie'].setValue(this.objRegistro.DescripcionEspecie.toString());                
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
        this.objRegistro.CodigoEspecie=this.CodigoEspecie.value;
        this.objRegistro.Especie=this.Especie.value;
        this.objRegistro.DescripcionEspecie=this.DescripcionEspecie.value;     
        this.spinner.show();
        this.especieServiceProxy.CreateEspecie(this.objRegistro)
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
