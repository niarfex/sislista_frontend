import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ArchivoGetDto } from 'src/app/models/Archivo';

@Component({
  standalone: true,
  selector: 'lista-archivos',
  templateUrl: './lista-archivos.component.html',
  styleUrl: './lista-archivos.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,FormsModule,ConfirmDialogModule],
  providers: [ConfirmationService]
})
export class ListaArchivosComponent {
  @Input() listaArchivos: ArchivoGetDto[];
  @Input() modalActivo:boolean=true;
  @Output() enviarLista = new EventEmitter<any>();
  constructor(private confirmationService: ConfirmationService    
  ) {
  }
  eliminarArchivo(nombre:String) {
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
        this.listaArchivos = this.listaArchivos.filter(x => x.NombreArchivo != nombre);
        this.enviarLista.emit(this.listaArchivos);
      },
      reject: () => {

      }
    });
    
  }
}
