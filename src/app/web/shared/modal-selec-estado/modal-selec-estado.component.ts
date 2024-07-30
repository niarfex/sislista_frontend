import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { SelectTipoDto } from 'src/app/models/SelectTipo';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';

@Component({
  standalone: true,
  selector: 'modal-selec-estado',
  templateUrl: './modal-selec-estado.component.html',
  styleUrl: './modal-selec-estado.component.scss',
  providers: [ConfirmationService],
  imports: [CommonModule, ReactiveFormsModule, TableModule,
    FormsModule, ConfirmDialogModule]
})
export class ModalSelecEstadoComponent {
  @Input() exitSubModal = (): void => { };
  @Input() tipo: String = "";
  @Input() listaEstado: SelectTipoDto[] = [];
  @Output() enviarCodigoEstado = new EventEmitter<any>();
  titulo: String = "";
  etiqueta: String = "";
  promtPregunta: String = "";
  modalForm = this.formBuilder.group({
    IdEstado: ['', [Validators.required]]
  });
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private confirmationService: ConfirmationService) {
  }
  get IdEstado() { return this.modalForm.controls['IdEstado']; }
  ngOnInit(): void {
    if (this.tipo == "SUPERVISAR") {
      this.titulo = "Supervisar";
      this.etiqueta = "Resultado de Supervisión";
    }
    else if (this.tipo == "VALIDAR") {
      this.titulo = "Validar";
      this.etiqueta = "Resultado de Validación";
    }
  }
  continuarObservacion() {
    let codigoEstado = this.listaEstado.find(x => x.value == this.IdEstado.value.toString()).codigo;
    switch (codigoEstado) {
      case "APROBADO": this.promtPregunta = "¿Estás seguro de enviar al Especialista para validación?";
        break;
      case "DESAPROBADO":
      case "INVALIDO":
        this.close();
        this.enviarCodigoEstado.emit(codigoEstado);
        break;
      case "RATIFICADO": this.promtPregunta = "¿Estás seguro de reiterar el registro y retornar al Empadronador?";
        break;
      case "DERIVADO": this.promtPregunta = "¿Estás seguro de enviar al Especialista para absolución?";
        break;
      case "VALIDO": this.promtPregunta = "¿Estás seguro de validar el Registro y finalizar el flujo?";
        break;
      case "SUSTITUIR": this.promtPregunta = "¿Estás seguro de reemplazar el elemento de Marco de Lista?";
        break;
      case "DESCARTAR": this.promtPregunta = "¿Estás seguro de descartar el elemento del Regiustro vigente?";
        break;
      default: this.promtPregunta = "";
        break;
    }
    if(codigoEstado!="DESAPROBADO" && codigoEstado!="INVALIDO"){
      this.confirmationService.confirm({
        message: this.promtPregunta.toString(),
        header: 'Guardar',
        icon: 'none',
  
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptLabel: "Si, estoy seguro",
        rejectLabel: "Cancelar",
        acceptIcon: "none",
        rejectIcon: "none",
  
        accept: () => {
          this.close();
          this.enviarCodigoEstado.emit(codigoEstado);
        },
        reject: () => {
  
        }
      });
    }  
  }
  close() {
    this.exitSubModal();
  }
}
