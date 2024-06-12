import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'modal-consulta-elementos',
  templateUrl: './modal-consulta-elementos.component.html',
  styleUrl: './modal-consulta-elementos.component.css'
})
export class ModalConsultaElementosComponent implements OnInit {
  
  @Input() exitSubModal = (): void => {};
  lista_elementos:string[]=[];
  constructor(_injector: Injector) { 
    
  }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    alert("Entered Email id : " + data.campo);
 }

  show(){
    
  }
  close(){
    this.exitSubModal();
  }
}
