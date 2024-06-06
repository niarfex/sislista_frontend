import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'modal-registro-cultivo',
  templateUrl: './modal-registro-cultivo.component.html',
  styleUrls: ['./modal-registro-cultivo.component.css']
})
export class ModalRegistroCultivoComponent implements OnInit {

  @Input() exitModal = (): void => {};
  txt_campo:string="";
  active: boolean = true;
  modalForm=this.formBuilder.group({
    campo:['',[Validators.required]]
  });
  constructor(_injector: Injector,private formBuilder:FormBuilder) { 
    
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

  }

}
