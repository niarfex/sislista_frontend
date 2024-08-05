import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { GestionRegistroGetDto } from 'src/app/models/GestionRegistro';
import { PecuarioGetDto } from 'src/app/models/Pecuario';
import { SelectTipoDto } from 'src/app/models/SelectTipo';

@Component({
  standalone: true,
  selector: 'modal-sistema-pecuario',
  templateUrl: './modal-sistema-pecuario.component.html',
  styleUrl: './modal-sistema-pecuario.component.scss',
  providers: [ConfirmationService],
  imports: [CommonModule, ReactiveFormsModule, TableModule,
    FormsModule, ConfirmDialogModule]
})
export class ModalSistemaPecuarioComponent {
  @Input() exitSubModal = (): void => { };
  @Input() listLineaProd:SelectTipoDto[];
  @Input() listEspecie:SelectTipoDto[];
  @Input() objRegistro:PecuarioGetDto = new PecuarioGetDto();
  @Input() objCuestionario:GestionRegistroGetDto;
  @Output() enviarPecuario = new EventEmitter<any>();
  
  listFundos:SelectTipoDto[]=[];
  listCampos:SelectTipoDto[]=[];
  selecLineaProd:boolean=false;
  selecEspecie:boolean=false;
  valPecuaria:String;
  bloquearChecks:boolean=false;
  modalForm = this.formBuilder.group({
    IdFundo: ['', [Validators.required]],
    IdCampo: ['', [Validators.required]],
    IdLineaProd: ['', this.selecLineaProd ? [Validators.required] : []],
    IdEspecie: ['', this.selecEspecie ? [Validators.required] : []],
    Numero: ['', [Validators.required]]
  });
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
  }
  get IdFundo() { return this.modalForm.controls['IdFundo']; }
  get IdCampo() { return this.modalForm.controls['IdCampo']; }
  get IdLineaProd() { return this.modalForm.controls['IdLineaProd']; }
  get IdEspecie() { return this.modalForm.controls['IdEspecie']; }
  get Numero() { return this.modalForm.controls['Numero']; }
  ngOnInit(): void {
    this.listFundos=[];
    this.valPecuaria=this.objCuestionario.ListUsoNoAgricola.find(x=>x.codigo=="INST").value;
    this.objCuestionario.ListFundos.forEach(myObject => {
      if(myObject.ListCampos.filter(x=>x.IdUsoNoAgricola.find(x=>x==this.valPecuaria)).length>0)
      {
        this.listFundos.push(new SelectTipoDto({
          value:myObject.Orden.toString(),
          label:myObject.Fundo==null?"":myObject.Fundo.toString(),
          codigo:myObject.Orden.toString()
        }));
      }      
    });
    //console.log(this.objRegistro);    
    this.IdLineaProd.setValue((this.objRegistro.IdLineaProduccion==undefined||this.objRegistro.IdLineaProduccion==0)?"":this.objRegistro.IdLineaProduccion.toString());
    this.IdEspecie.setValue((this.objRegistro.IdEspecie==undefined||this.objRegistro.IdEspecie==0)?"":this.objRegistro.IdEspecie.toString());
    this.IdEspecie.disable();
    this.IdLineaProd.disable();
    if(this.objRegistro.IdLineaProduccion>0 || this.objRegistro.IdEspecie>0){
      this.IdFundo.setValue(this.objRegistro.OrdenFundo.toString());
      this.selFundo(null);
      this.IdCampo.setValue(this.objRegistro.OrdenCampo.toString());      
      this.IdFundo.disable();
      this.IdCampo.disable();
      this.bloquearChecks=true;
      if(this.objRegistro.IdLineaProduccion>0){        
        this.selecLineaProd=true;
      }
      else if (this.objRegistro.IdEspecie>0){    
        this.selecEspecie=true;
      }
    }
    else{
      this.bloquearChecks=false;
    }   
    this.Numero.setValue(this.objRegistro.Cantidad==undefined?"":this.objRegistro.Cantidad.toString());
    
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
  }

  onClickSubmit(data) {    
    if(this.IdLineaProd.value=="" && this.IdEspecie.value==""){
      this.toastr.warning("Debe seleccionar un Sistema pecuario (Línea de Producción o Especie)", 'Aviso');
      return;
    }
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
      this.objRegistro.OrdenFundo=Number.parseInt(this.IdFundo.value);
      this.objRegistro.OrdenCampo=Number.parseInt(this.IdCampo.value);
      this.objRegistro.Campo=this.listCampos.find(x=>x.value==this.IdCampo.value).label;
      
      if(this.selecLineaProd){
        this.objRegistro.IdLineaProduccion=Number.parseInt(this.IdLineaProd.value);
        this.objRegistro.IdEspecie=0;
        this.objRegistro.SistemaPecuario="LÍNEA DE PRODUCCIÓN";
        this.objRegistro.IdSistemaPecuario=1;
        this.objRegistro.Animal=this.listLineaProd.find(x=>x.value==this.IdLineaProd.value).label;
      }
      else if (this.selecEspecie){
        this.objRegistro.IdLineaProduccion=0;
        this.objRegistro.IdEspecie=Number.parseInt(this.IdEspecie.value);
        this.objRegistro.SistemaPecuario="ESPECIE";
        this.objRegistro.IdSistemaPecuario=2;
        this.objRegistro.Animal=this.listEspecie.find(x=>x.value==this.IdEspecie.value).label;
      }
      
      this.objRegistro.Cantidad=Number.parseInt(this.Numero.value);
      this.asignarPecuario();
       
      },
      reject: () => {

      }
    });

  }  
  selFundo(event: any){
    this.listCampos=[];  
    let campos=this.objCuestionario.ListFundos.find(x=>x.Orden.toString()==this.IdFundo.value).ListCampos;  
    campos.forEach(myObject => {
      if(myObject.IdUsoNoAgricola.filter(x=>x==this.valPecuaria).length>0){
        this.listCampos.push(new SelectTipoDto({
          value:myObject.Orden.toString(),
          label:myObject.Campo==null?"":myObject.Campo.toString(),
          codigo:myObject.Orden.toString()
        }));
      }      
    });

  }
  close(){
    this.exitSubModal();
  }
  asignarPecuario(){
    this.enviarPecuario.emit(this.objRegistro);
    this.close();
  }
  checkLineaprod(){
    if(this.selecLineaProd){
      this.selecEspecie=false;
      this.IdEspecie.setValue("");
      this.IdEspecie.disable();
      this.IdLineaProd.enable();
    }
  }
  checkEspecie(){
    if(this.selecEspecie){
      this.selecLineaProd=false;
      this.IdLineaProd.setValue("");
      this.IdEspecie.enable();
      this.IdLineaProd.disable();
    }
  }
}
