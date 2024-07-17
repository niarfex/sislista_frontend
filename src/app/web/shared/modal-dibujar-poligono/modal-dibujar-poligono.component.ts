import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';

@Component({
  standalone: true,
  selector: 'modal-dibujar-poligono',
  templateUrl: './modal-dibujar-poligono.component.html',
  styleUrl: './modal-dibujar-poligono.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,
    FormsModule,ConfirmDialogModule]
})
export class ModalDibujarPoligonoComponent {
  @Input() exitSubModal = (): void => {};
  @Input() numDoc: String;
  @Input() nombreEmpresa: String;
  @Input() periodo: String;
  modalForm = this.formBuilder.group({
    NombreFundo: ['', []],
    NombreCampo: ['', []]
  });
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
      this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
  }
  get NombreFundo() { return this.modalForm.controls['NombreFundo']; }
  get NombreCampo() { return this.modalForm.controls['NombreCampo']; }
  ngOnInit(): void {

  }
  onClickSubmit(data) {

  } 
  close() {
    this.exitSubModal();
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
  }
  dibujarPoligono(){

  }
  procesarFundos(){

  }
  grabar(){

  }
}
