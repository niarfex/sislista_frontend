import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { InformanteGetDto } from 'src/app/models/Informante';

@Component({
  standalone: true,
  selector: 'lista-informantes',
  templateUrl: './lista-informantes.component.html',
  styleUrl: './lista-informantes.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,FormsModule,ConfirmDialogModule],
  providers: [ConfirmationService]
})
export class ListaInformantesComponent {
  @Input() listaInformantes: InformanteGetDto[];
  @Input() modalActivo: boolean = true;
  @Output() enviarLista = new EventEmitter<any>();
  constructor(private confirmationService: ConfirmationService
  ) {
  }
  eliminarInformante(item: InformanteGetDto) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el archivo?',
      header: 'Eliminar',
      icon: 'none',

      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.listaInformantes = this.listaInformantes.filter(x => x.IdEstado != item.IdEstado);
        this.enviarLista.emit(this.listaInformantes);
      },
      reject: () => {

      }
    });
  }
}
