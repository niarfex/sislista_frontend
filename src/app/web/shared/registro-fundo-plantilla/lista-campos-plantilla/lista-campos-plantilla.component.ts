import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
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
  @Output() enviarSumas = new EventEmitter<any>();
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }

  ngOnInit(): void {
    
  }
  setTwoNumberDecimal(item:CampoGetDto,nombreControl: string) {
    if(nombreControl=="SuperficieCultivada"){
      item.SuperficieCultivada=item.SuperficieCultivada.toString()==""?0:(Number.parseFloat(Number.parseFloat(item.SuperficieCultivada.toString()).toFixed(2)));
    }
    else if(nombreControl=="Superficie"){
      item.Superficie=item.Superficie.toString()==""?0:(Number.parseFloat(Number.parseFloat(item.Superficie.toString()).toFixed(2)));
    }
    this.enviarSumas.emit(nombreControl);
  }
  selUsoTierra(event: any){
    this.enviarSumas.emit("Superficie");
  }
}
