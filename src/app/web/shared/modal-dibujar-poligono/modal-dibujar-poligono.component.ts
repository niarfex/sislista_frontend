import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';

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
  @Input() periodo: String;
  modalForm = this.formBuilder.group({
    IdModoRegistro: ['', []]
  });

  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  get IdModoRegistro() { return this.modalForm.controls['IdModoRegistro']; }
  ngOnInit(): void {

  }
  onClickSubmit(data) {

  } 
  close() {
    this.exitSubModal();
  }

}
