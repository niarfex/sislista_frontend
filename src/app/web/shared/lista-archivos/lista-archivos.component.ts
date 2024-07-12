import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ArchivoGetDto } from 'src/app/models/Archivo';

@Component({
  standalone: true,
  selector: 'app-lista-archivos',
  templateUrl: './lista-archivos.component.html',
  styleUrl: './lista-archivos.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule]
})
export class ListaArchivosComponent {
  @Input() listaArchivos: ArchivoGetDto[];
}
