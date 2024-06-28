import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { PanelRegistroGetDto } from 'src/app/models/PanelRegistro';
import { PanelRegistroServiceProxy } from 'src/shared/service-proxies/panelregistro-proxies';

@Component({
  selector: 'modal-programacion-registro',
  templateUrl: './modal-programacion-registro.component.html',
  styleUrls: ['./modal-programacion-registro.component.scss']
})
export class ModalProgramacionRegistroComponent implements OnInit {

  @Input() exitModal = (): void => {};
  @Input() idRegistro:number;
  objRegistro:PanelRegistroGetDto = new PanelRegistroGetDto();
  active: boolean = true;
  modalForm=this.formBuilder.group({
    IdPlantilla:['',[Validators.required]],
    IdAnio:['',[Validators.required]],
    ProgramacionRegistro:['',[Validators.required]],
    FechaInicio:['',[Validators.required]],
    FechaFin:['',[Validators.required]],
    DecretoNorma:['',[Validators.required]],
    Objetivo:['',[Validators.required]],
    EnteRector:['',[Validators.required]]
  });
  private organizacionServiceProxy: PanelRegistroServiceProxy;
  constructor(_injector: Injector
    ,private formBuilder:FormBuilder
    ,private confirmationService: ConfirmationService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService) { 
    this.organizacionServiceProxy = _injector.get(PanelRegistroServiceProxy); 
  }
  get IdPlantilla(){return this.modalForm.controls['IdPlantilla'];}
  get IdAnio(){return this.modalForm.controls['IdAnio'];}
  get ProgramacionRegistro(){return this.modalForm.controls['ProgramacionRegistro'];}
  get FechaInicio(){return this.modalForm.controls['FechaInicio'];}
  get FechaFin(){return this.modalForm.controls['FechaFin'];}
  get DecretoNorma(){return this.modalForm.controls['DecretoNorma'];}
  get Objetivo(){return this.modalForm.controls['Objetivo'];}
  get EnteRector(){return this.modalForm.controls['EnteRector'];}
  
  ngOnInit(): void {
    this.spinner.show();
    this.organizacionServiceProxy.getPanelRegistroxId(this.idRegistro)
        .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
        .subscribe({
          next: (result) => {
            if(result.success){
              this.objRegistro = result.datos;
              if(this.objRegistro.Id>0){
                this.modalForm.controls['IdPlantilla'].setValue(this.objRegistro.IdPlantilla.toString());
                this.modalForm.controls['IdAnio'].setValue(this.objRegistro.IdAnio.toString());
                this.modalForm.controls['ProgramacionRegistro'].setValue(this.objRegistro.ProgramacionRegistro.toString());
                this.modalForm.controls['FechaInicio'].setValue(this.objRegistro.FechaInicio.toString());
                this.modalForm.controls['FechaFin'].setValue(this.objRegistro.FechaFin.toString());
                this.modalForm.controls['DecretoNorma'].setValue(this.objRegistro.DecretoNorma.toString());
                this.modalForm.controls['Objetivo'].setValue(this.objRegistro.Objetivo.toString());
                this.modalForm.controls['EnteRector'].setValue(this.objRegistro.EnteRector.toString());
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
        this.objRegistro.IdPlantilla=Number.parseInt(this.IdPlantilla.value);
        this.objRegistro.IdAnio=Number.parseInt(this.IdAnio.value);
        this.objRegistro.ProgramacionRegistro=this.ProgramacionRegistro.value;
        this.objRegistro.FechaInicio=new Date(this.FechaInicio.value);
        this.objRegistro.FechaFin=new Date(this.FechaFin.value);
        this.objRegistro.DecretoNorma=this.DecretoNorma.value;
        this.objRegistro.Objetivo=this.Objetivo.value;
        this.objRegistro.EnteRector=this.EnteRector.value;
        this.spinner.show();
        this.organizacionServiceProxy.CreatePanelRegistro(this.objRegistro)
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
