import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { ListaInformantesComponent } from '../lista-informantes/lista-informantes.component';
import { ListaCamposPlantillaComponent } from '../lista-campos-plantilla/lista-campos-plantilla.component';

@Component({
  standalone: true,
  selector: 'plantilla-uno',
  templateUrl: './plantilla-uno.component.html',
  styleUrl: './plantilla-uno.component.scss',
  imports: [CommonModule,ReactiveFormsModule,ListaInformantesComponent,ListaCamposPlantillaComponent]
})
export class PlantillaUnoComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() numDoc:String;
  @Input() modalActivo: boolean = true;
  plantillaForm=this.formBuilder.group({
    campo:['',[Validators.required]]
  });
  constructor(private formBuilder:FormBuilder){

  }
  ngOnInit(): void {
  }
  get campo(){
    return this.plantillaForm.controls['campo'];
  }
}
