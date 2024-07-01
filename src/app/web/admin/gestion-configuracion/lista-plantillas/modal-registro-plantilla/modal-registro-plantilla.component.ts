import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { PlantillaGetDto } from 'src/app/models/Plantilla';
import { PlantillaServiceProxy } from 'src/shared/service-proxies/plantilla-proxies';

@Component({
  selector: 'modal-registro-plantilla',
  templateUrl: './modal-registro-plantilla.component.html',
  styleUrls: ['./modal-registro-plantilla.component.scss'],
})
export class ModalRegistroPlantillaComponent implements OnInit {

  @Input() exitModal = (): void => { };
  @Input() idRegistro:number;
  @Input() modalActivo: boolean = true;
  indiceCuestionario: number = 1;
  totalCuestionario: number=2;
  
  objRegistro:PlantillaGetDto = new PlantillaGetDto();
  active: boolean = true;
  modalForm=this.formBuilder.group({
    Plantilla:['',[Validators.required]],
    Descripcion:['',[Validators.required]]
  });
  private organizacionServiceProxy: PlantillaServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
    this.organizacionServiceProxy = _injector.get(PlantillaServiceProxy); 
  }
  get Plantilla(){return this.modalForm.controls['Plantilla'];}
  get Descripcion(){return this.modalForm.controls['Descripcion'];}
  
  ngOnInit(): void {
    this.spinner.show();
    this.organizacionServiceProxy.getPlantillaxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['Plantilla'].setValue(this.objRegistro.Plantilla.toString());
                this.modalForm.controls['Descripcion'].setValue(this.objRegistro.Descripcion.toString());    
                this.indiceCuestionario=this.objRegistro.Id==0?1:this.objRegistro.NumCuestionario; 
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
        this.objRegistro.Plantilla=this.Plantilla.value;
        this.objRegistro.Descripcion=this.Descripcion.value;      
        this.objRegistro.NumCuestionario=this.indiceCuestionario;
        this.spinner.show();
        this.organizacionServiceProxy.CreatePlantilla(this.objRegistro)
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

  slideLeft() {
    this.indiceCuestionario-=1;
  }
  slideRight() {
    this.indiceCuestionario+=1;
  }
}
