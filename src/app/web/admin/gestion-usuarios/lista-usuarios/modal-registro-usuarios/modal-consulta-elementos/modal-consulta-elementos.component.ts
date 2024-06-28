import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { MarcoListaListDto } from 'src/app/models/MarcoLista';
import { MarcoListaServiceProxy } from 'src/shared/service-proxies/marcolista-proxies';

@Component({
  selector: 'modal-consulta-elementos',
  templateUrl: './modal-consulta-elementos.component.html',
  styleUrl: './modal-consulta-elementos.component.scss'
})
export class ModalConsultaElementosComponent implements OnInit {  
  @Input() exitSubModal = (): void => {};
  @Input() idDepartamento:String="";
  @Input() lista_asignados:MarcoListaListDto[]=[];
  @Output() enviarAsignados = new EventEmitter<any>();
  lista_resultados: MarcoListaListDto[]=[];
  private marcolistaServiceProxy: MarcoListaServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService) {
    this.marcolistaServiceProxy = _injector.get(MarcoListaServiceProxy);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.marcolistaServiceProxy.getAll("")
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            result.datos.forEach((currentValue, index) => {
              if(this.lista_asignados.filter(x => x.Id==currentValue.Id).length==0 && currentValue.IdDepartamento==this.idDepartamento) {
                  this.lista_resultados.push(currentValue);
              }
            });
          }
        }
      });
  }
  asignarMarcoLista(){
    this.enviarAsignados.emit(this.lista_resultados.filter(x => x.Seleccionado));
    this.close();
  }

  show(){
    
  }
  close(){
    this.exitSubModal();
  }

}
