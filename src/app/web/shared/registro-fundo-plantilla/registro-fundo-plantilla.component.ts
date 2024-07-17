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
  idNombre:String="";
  fundoForm = this.formBuilder.group({
    SuperficieTotal: [''],
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
  get SuperficieTotal() { return this.fundoForm.controls['SuperficieTotal']; }
  get SuperficieAgricola() { return this.fundoForm.controls['SuperficieAgricola']; }
  get Observacion() { return this.fundoForm.controls['Observacion']; }
  get IdDepartamento() { return this.fundoForm.controls['IdDepartamento']; }
  get IdProvincia() { return this.fundoForm.controls['IdProvincia']; }
  get IdDistrito() { return this.fundoForm.controls['IdDistrito']; }

  ngOnInit(): void {
    this.idNombre="panelsStayOpen-"+this.fundo.Orden.toString();
    this.SuperficieAgricola.setValue(this.fundo.SuperficieAgricola.toString());
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
  }

}
