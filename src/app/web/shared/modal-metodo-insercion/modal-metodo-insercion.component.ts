import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  standalone: true,
  selector: 'modal-metodo-insercion',
  templateUrl: './modal-metodo-insercion.component.html',
  styleUrl: './modal-metodo-insercion.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,
    FormsModule,ConfirmDialogModule]
})
export class ModalMetodoInsercionComponent {
  @Input() exitSubModal = (): void => {};
  @Output() enviarMetodo = new EventEmitter<any>();
  modalForm = this.formBuilder.group({
    IdModoRegistro: ['', [Validators.required]]
  });

  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  get IdModoRegistro() { return this.modalForm.controls['IdModoRegistro']; }
  ngOnInit(): void {

  }
  continuarMetodo(){
    this.close();
    this.enviarMetodo.emit(this.IdModoRegistro.value);    
  }
  close() {
    this.exitSubModal();
  }

}
