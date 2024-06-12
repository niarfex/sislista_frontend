import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'modal-registro-organizaciones',
  templateUrl: './modal-registro-organizaciones.component.html',
  styleUrls: ['./modal-registro-organizaciones.component.css'],
  providers: [ConfirmationService]
})
export class ModalRegistroOrganizacionesComponent implements OnInit {
  
  @Input() exitModal = (): void => {};
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    campo:['',[Validators.required]]
  });
  constructor(_injector: Injector,private formBuilder:FormBuilder, private confirmationService: ConfirmationService) { 
    
  }

  ngOnInit(): void {
  }
  get campo(){
    return this.modalForm.controls['campo'];
  }

  onClickSubmit(data) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de guardar los datos ingresados?',
      header: 'Guardar',
      icon: 'none',
      
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",
      
      
      accept: () => {   
        alert("Entered Email id : " + data.campo);             
      },
      reject: () => {

      }
    });
    
 }

  show(){
    
  }
  close(){
    this.exitModal();
  }

}
