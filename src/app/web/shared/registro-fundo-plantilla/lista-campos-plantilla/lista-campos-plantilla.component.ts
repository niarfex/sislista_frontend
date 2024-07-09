import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { CampoGetDto } from 'src/app/models/Campo';
import { SelectTipoDto } from 'src/app/models/SelectTipo';

@Component({
  standalone: true,
  selector: 'lista-campos-plantilla',
  templateUrl: './lista-campos-plantilla.component.html',
  styleUrl: './lista-campos-plantilla.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule]
})
export class ListaCamposPlantillaComponent {
  @Input() listaCampos: CampoGetDto[];
  @Input() listTenencia: SelectTipoDto[];
  @Input() listUsoTierra: SelectTipoDto[];
  @Input() listCultivo: SelectTipoDto[];
  @Input() listUsoNoAgricola: SelectTipoDto[];
  campoForm = this.formBuilder.group({
    IdTenencia: [''],
    Superficie: [''],
    IdUsoTierra: [''],
    IdCultivo: [''],
    SuperficieCulivada: [''],
    IdUsoNoAgricola: [''],
    Observacion: ['']
  });
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  get IdTenencia() { return this.campoForm.controls['IdTenencia']; }
  get Superficie() { return this.campoForm.controls['Superficie']; }
  get IdUsoTierra() { return this.campoForm.controls['IdUsoTierra']; }
  get IdCultivo() { return this.campoForm.controls['IdCultivo']; }
  get SuperficieCulivada() { return this.campoForm.controls['SuperficieCulivada']; }
  get IdUsoNoAgricola() { return this.campoForm.controls['IdUsoNoAgricola']; }
  get Observacion() { return this.campoForm.controls['Observacion']; }

  ngOnInit(): void {
    
  }

}
