import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-registro-usuarios',
  templateUrl: './modal-registro-usuarios.component.html',
  styleUrls: ['./modal-registro-usuarios.component.css'],
  providers: [BsModalService],
})
export class ModalRegistroUsuariosComponent implements OnInit {
  @Input() exitModal = (): void => {};
  SubmodalRef?: BsModalRef;
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    campo:['',[Validators.required]]
  });
  constructor(_injector: Injector,private formBuilder:FormBuilder,private SubmodalService: BsModalService) { 
    
  }

  ngOnInit(): void {
  }
  get campo(){
    return this.modalForm.controls['campo'];
  }

  onClickSubmit(data) {
    alert("Entered Email id : " + data.campo);
 }

  show(){
    
  }
  close(){
    this.exitModal();
  }
  consultarElementos(viewUserTemplate: TemplateRef<any>){
    this.SubmodalRef = this.SubmodalService.show(viewUserTemplate,{
      backdrop : 'static',
      keyboard : false
    });
  }

  exitSubModal = (): void => {
    this.SubmodalRef?.hide();
  };

}
