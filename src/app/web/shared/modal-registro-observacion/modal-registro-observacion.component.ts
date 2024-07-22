import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { SelectTipoDto } from 'src/app/models/SelectTipo';
import { TrazabilidadGetDto } from 'src/app/models/Trazabilidad';

@Component({
  standalone: true,
  selector: 'modal-registro-observacion',
  templateUrl: './modal-registro-observacion.component.html',
  styleUrl: './modal-registro-observacion.component.scss',
  providers: [ConfirmationService],
  imports: [CommonModule, ReactiveFormsModule, TableModule,
    FormsModule, ConfirmDialogModule]
})
export class ModalRegistroObservacionComponent {

  @Input() exitSubModal = (): void => { };
  @Input() estadoResultado:number=0;
  @Input() perfil:String="";
  @Input() listaSecciones:SelectTipoDto[]=[];
  @Input() listaObservaciones:TrazabilidadGetDto[]=[];
  modalForm = this.formBuilder.group({
    IdSeccion: ['', []],
    Observacion: ['', []]
  });
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  get IdSeccion() { return this.modalForm.controls['IdSeccion']; }
  get Observacion() { return this.modalForm.controls['Observacion']; }

  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
  }
  close(){
    this.exitSubModal();
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
      
       
      },
      reject: () => {

      }
    });

  }  
  agregarObservacion(){
    let observacion= new TrazabilidadGetDto({
      Id:0,
      Cuestionario:0,
      Observacion:this.Observacion.value,
      EstadoResultado:this.estadoResultado,
      Seccion:Number.parseInt(this.IdSeccion.value),
      TipoSeccion:this.listaSecciones.find(x=>x.value==this.IdSeccion.value).label,
      Perfil:this.perfil
    });
  }
  grabar(){

  }
  eliminarObservacion(item:TrazabilidadGetDto){

  }
}
