import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LineaProduccionGetDto } from 'src/app/models/LineaProduccion';
import { LineaProduccionServiceProxy } from 'src/shared/service-proxies/lineaproduccion-proxies';

@Component({
  selector: 'modal-registro-linea-produccion',
  templateUrl: './modal-registro-linea-produccion.component.html',
  styleUrls: ['./modal-registro-linea-produccion.component.scss'],
  providers: [ConfirmationService]
})
export class ModalRegistroLineaProduccionComponent implements OnInit {

  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  objRegistro:LineaProduccionGetDto = new LineaProduccionGetDto();
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    CodigoLineaProduccion:['',[Validators.required]],
    LineaProduccion:['',[Validators.required]],
    DescripcionLineaProduccion:['',[Validators.required]]
  });
  private lineaproduccionServiceProxy: LineaProduccionServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
      this.lineaproduccionServiceProxy = _injector.get(LineaProduccionServiceProxy); 
  }
  get CodigoLineaProduccion(){return this.modalForm.controls['CodigoLineaProduccion'];}
  get LineaProduccion(){return this.modalForm.controls['LineaProduccion'];}
  get DescripcionLineaProduccion(){return this.modalForm.controls['DescripcionLineaProduccion'];}
  ngOnInit(): void {
    this.spinner.show();
    this.lineaproduccionServiceProxy.getLineaProduccionxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['CodigoLineaProduccion'].setValue(this.objRegistro.CodigoLineaProduccion.toString());
                this.modalForm.controls['LineaProduccion'].setValue(this.objRegistro.LineaProduccion.toString());
                this.modalForm.controls['DescripcionLineaProduccion'].setValue(this.objRegistro.DescripcionLineaProduccion.toString());               
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
        this.objRegistro.CodigoLineaProduccion=this.CodigoLineaProduccion.value;
        this.objRegistro.LineaProduccion=this.LineaProduccion.value;
        this.objRegistro.DescripcionLineaProduccion=this.DescripcionLineaProduccion.value;       
        this.spinner.show();
        this.lineaproduccionServiceProxy.CreateLineaProduccion(this.objRegistro)
          .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
          .subscribe({
            next: (result) => {
              if (result.success) {
                this.toastr.success(result.message.toString(), 'Información');   
                this.idRegistro=Number.parseInt(result.datos.toString());          
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
