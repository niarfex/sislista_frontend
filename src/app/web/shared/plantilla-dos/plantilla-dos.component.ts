import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { ListaInformantesComponent } from '../lista-informantes/lista-informantes.component';
import { ListaCamposPlantillaComponent } from '../lista-campos-plantilla/lista-campos-plantilla.component';

@Component({
  standalone: true,
  selector: 'plantilla-dos',
  templateUrl: './plantilla-dos.component.html',
  styleUrl: './plantilla-dos.component.scss',
  imports: [ CommonModule, ReactiveFormsModule,ListaInformantesComponent,ListaCamposPlantillaComponent]
})
export class PlantillaDosComponent implements OnInit {
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
