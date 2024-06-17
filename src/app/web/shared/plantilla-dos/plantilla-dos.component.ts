import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'plantilla-dos',
  templateUrl: './plantilla-dos.component.html',
  styleUrl: './plantilla-dos.component.scss'
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
