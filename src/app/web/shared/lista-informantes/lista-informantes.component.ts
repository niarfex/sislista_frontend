import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { InformanteGetDto } from 'src/app/models/Informante';

@Component({
  standalone: true,
  selector: 'lista-informantes',
  templateUrl: './lista-informantes.component.html',
  styleUrl: './lista-informantes.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule]
})
export class ListaInformantesComponent {
  @Input() listaInformantes: InformanteGetDto[];
}
