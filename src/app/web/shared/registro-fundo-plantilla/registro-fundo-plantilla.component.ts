import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { FundoGetDto } from 'src/app/models/Fundo';
import { UbigeoServiceProxy } from 'src/shared/service-proxies/ubigeo-proxies';
import { ListaCamposPlantillaComponent } from '../registro-fundo-plantilla/lista-campos-plantilla/lista-campos-plantilla.component';
import { SelectTipoDto } from 'src/app/models/SelectTipo';

@Component({
  standalone: true,
  selector: 'registro-fundo-plantilla',
  templateUrl: './registro-fundo-plantilla.component.html',
  styleUrl: './registro-fundo-plantilla.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    ListaCamposPlantillaComponent]
})
export class RegistroFundoPlantillaComponent {
  @Input() fundo: FundoGetDto;
  @Input() listTenencia: SelectTipoDto[];
  @Input() listUsoTierra: SelectTipoDto[];
  @Input() listCultivo: SelectTipoDto[];
  @Input() listUsoNoAgricola: SelectTipoDto[];
  idNombre: String = "";
  fundoForm = this.formBuilder.group({
    SuperficieTotal: [''],
    SuperficieTotalCalc: [''],
    SuperficieAgricola: [''],
    Observacion: [''],
    IdDepartamento: [''],
    IdProvincia: [''],
    IdDistrito: ['']
  });
  private ubigeoServiceProxy: UbigeoServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.ubigeoServiceProxy = _injector.get(UbigeoServiceProxy);
  }
  get SuperficieTotalCalc() { return this.fundoForm.controls['SuperficieTotalCalc']; }
  get SuperficieTotal() { return this.fundoForm.controls['SuperficieTotal']; }
  get SuperficieAgricola() { return this.fundoForm.controls['SuperficieAgricola']; }
  get Observacion() { return this.fundoForm.controls['Observacion']; }
  get IdDepartamento() { return this.fundoForm.controls['IdDepartamento']; }
  get IdProvincia() { return this.fundoForm.controls['IdProvincia']; }
  get IdDistrito() { return this.fundoForm.controls['IdDistrito']; }

  ngOnInit(): void {
    this.idNombre = "fundo-" + this.fundo.Orden.toString();
    this.SuperficieAgricola.setValue(this.fundo.SuperficieAgricola.toString());
    this.SuperficieTotalCalc.setValue(this.fundo.SuperficieTotalCalc.toString());
    this.SuperficieTotal.setValue(this.fundo.SuperficieTotal.toString());
    this.Observacion.setValue(this.fundo.Observacion.toString());
    this.IdDepartamento.setValue(this.fundo.IdUbigeo.toString().substring(0, 2));
    this.IdProvincia.setValue(this.fundo.IdUbigeo.toString().substring(0, 4));
    this.IdDistrito.setValue(this.fundo.IdUbigeo.toString());
  }

  selDepartamento(event: any) {
    this.spinner.show();
    this.ubigeoServiceProxy.getProvincias(this.IdDepartamento.value)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.fundo.ListProvincia = result.datos;
          }
          else {
            this.toastr.warning(result.message.toString(), 'Aviso');
          }
        }
      });
      this.IdProvincia.setValue("");
      this.IdDistrito.setValue("");
      this.fundo.IdUbigeo="";
  }
  selProvincia(event: any) {
    this.spinner.show();
    this.ubigeoServiceProxy.getDistritos(this.IdProvincia.value)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.fundo.ListDistrito = result.datos;
          }
          else {
            this.toastr.warning(result.message.toString(), 'Aviso');
          }
        }
      });
      this.IdDistrito.setValue("");
      this.fundo.IdUbigeo="";
  }
  selDistrito(event: any) {
    this.fundo.IdUbigeo=this.IdDistrito.value;
  }
  setTwoNumberDecimal(nombreControl: string) {
    this.fundoForm.controls[nombreControl].setValue(parseFloat(this.fundoForm.controls[nombreControl].value==""?0:this.fundoForm.controls[nombreControl].value).toFixed(2));
  }
  actualizarSumas(tipo:string){
    if(tipo=="Superficie"){
      let sumSuperficieTotal:number=0;
      this.fundo.ListCampos.forEach(a => sumSuperficieTotal += a.Superficie);
      this.SuperficieTotal.setValue(sumSuperficieTotal.toString());

      let valAgricola=this.listUsoTierra.find(x=>x.codigo="AGRÍCOLA").value;
      let sumSuperficieAgricola:number=0;
      this.fundo.ListCampos.filter(x =>x.IdUsoTierra.toString()==valAgricola).forEach(a => sumSuperficieAgricola += a.Superficie);
      this.SuperficieAgricola.setValue(sumSuperficieAgricola.toString());

    }
    else if(tipo=="SuperficieCultivada"){
      
    }
  }
}
