import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { CampoGetDto } from 'src/app/models/Campo';
import { SelectTipoDto } from 'src/app/models/SelectTipo';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  standalone: true,
  selector: 'lista-campos-plantilla',
  templateUrl: './lista-campos-plantilla.component.html',
  styleUrl: './lista-campos-plantilla.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    MultiSelectModule]
})
export class ListaCamposPlantillaComponent {
  @Input() listaCampos: CampoGetDto[];
  @Input() listTenencia: SelectTipoDto[];
  @Input() listUsoTierra: SelectTipoDto[];
  @Input() listCultivo: SelectTipoDto[];
  @Input() listUsoAgricola: SelectTipoDto[];
  @Input() listUsoNoAgricola: SelectTipoDto[];
  @Input() modalActivo:boolean=true;
  @Output() enviarSumas = new EventEmitter<any>();
  //listado:SelectTipoDto[]=[];
  //obsDisable:boolean=true;
  //idusoNoAgricolaDisable:boolean=true;
  //agricolaDisable:boolean=true;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  ngOnInit(): void {
    //this.selUsoTierra();
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
  selUsoTierra(item:CampoGetDto){
    if(this.listUsoTierra.find(x=>x.value==item.IdUsoTierra.toString()).codigo=="AGRÍCOLA"){
      item.ListTipoUso=this.listUsoAgricola;
      item.agricolaDisable=false;
      item.IdUsoNoAgricola=[];
      item.Observacion="";
    }
    else if (this.listUsoTierra.find(x=>x.value==item.IdUsoTierra.toString()).codigo=="NO AGRÍCOLA"){
      item.ListTipoUso=this.listUsoNoAgricola;
      item.agricolaDisable=true;
      item.IdCultivo=0;
      item.SuperficieCultivada=0;
      
    }
    else{
      item.agricolaDisable=true;
    }
    this.enviarSumas.emit("Superficie");
  }
  selUsoNoAgricola(item:CampoGetDto){
    /*if(this.listUsoNoAgricola.find(x=>x.value==item.IdUsoNoAgricola.toString()).codigo=="INFRAESTRUCTURA") 
    { }
    else{ item.Observacion=""; }*/
  }
  onFocusOutEventObs(item:CampoGetDto) {
    item.Observacion=(item.Observacion.trim().toUpperCase());
  }
}
