import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { SelectTipoDto } from 'src/app/models/SelectTipo';

@Component({
  standalone: true,
  selector: 'modal-selec-estado',
  templateUrl: './modal-selec-estado.component.html',
  styleUrl: './modal-selec-estado.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,
    FormsModule,ConfirmDialogModule]
})
export class ModalSelecEstadoComponent {
  @Input() exitSubModal = (): void => {};
  @Input() tipo: String="";
  @Input() listaEstado: SelectTipoDto[]=[];
  @Output() enviarMetodo = new EventEmitter<any>();
  titulo:String="";
  etiqueta:String="";
  modalForm = this.formBuilder.group({
    IdEstado: ['', []]
  });

  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  get IdEstado() { return this.modalForm.controls['IdEstado']; }
  ngOnInit(): void {
    if(this.tipo=="SUPERVISAR"){
      this.titulo="Supervisar";
      this.etiqueta="Resultado de Supervisión";
    }
    else if(this.tipo=="VALIDAR"){
      this.titulo="Validar";
      this.etiqueta="Resultado de Validación";
    }
  }

  onClickSubmit(data) {

  }
  continuarObservacion(){
    this.close();
    this.enviarMetodo.emit(this.IdEstado.value);    
  }
  close() {
    this.exitSubModal();
  }
}
