import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'plantilla-uno',
  templateUrl: './plantilla-uno.component.html',
  styleUrl: './plantilla-uno.component.scss'
})
export class PlantillaUnoComponent implements OnInit {
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
