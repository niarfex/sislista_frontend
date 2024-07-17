import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Input() objCuestionario:GestionRegistroGetDto;
  @Output() enviarPecuario = new EventEmitter<any>();
  listFundos:SelectTipoDto[]=[];
  listCampos:SelectTipoDto[]=[];
  objRegistro: PecuarioGetDto = new PecuarioGetDto();
  selecLineaProd:boolean=false;
  selecEspecie:boolean=false;
  valPecuaria:String;
  modalForm = this.formBuilder.group({
    IdFundo: ['', []],
    IdCampo: ['', []],
    IdLineaProd: ['', []],
    IdEspecie: ['', []],
    Numero: ['', []]
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
    this.IdLineaProd.setValue("");
    this.IdEspecie.setValue("");
    this.IdEspecie.disable();
    this.IdLineaProd.disable();
    this.listFundos=[];
    this.valPecuaria=this.objCuestionario.ListUsoNoAgricola.find(x=>x.codigo=="PECUARIA").value;
    this.objCuestionario.ListFundos.forEach(myObject => {
      if(myObject.ListCampos.filter(x=>x.IdUsoNoAgricola.toString()==this.valPecuaria).length>0)
      {
        this.listFundos.push(new SelectTipoDto({
          value:myObject.Orden.toString(),
          label:myObject.Fundo.toString(),
          codigo:myObject.Orden.toString()
        }));
      }      
    });
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
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
      this.objRegistro.OrdenFundo=Number.parseInt(this.IdFundo.value);
      this.objRegistro.OrdenCampo=Number.parseInt(this.IdCampo.value);
      this.objRegistro.Campo=this.listCampos.find(x=>x.value==this.IdCampo.value).label;
      this.objRegistro.IdLineaProduccion=Number.parseInt(this.IdLineaProd.value);
      if(this.selecLineaProd){
        this.objRegistro.SistemaPecuario="LÍNEA DE PRODUCCIÓN";
        this.objRegistro.IdSistemaPecuario=1;
        this.objRegistro.Animal=this.listLineaProd.find(x=>x.value==this.IdLineaProd.value).label;
      }
      else if (this.selecEspecie){
        this.objRegistro.SistemaPecuario="ESPECIE";
        this.objRegistro.IdSistemaPecuario=2;
        this.objRegistro.Animal=this.listEspecie.find(x=>x.value==this.IdEspecie.value).label;
      }
      this.objRegistro.IdEspecie=Number.parseInt(this.IdEspecie.value);
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
      if(myObject.IdUsoNoAgricola.toString()==this.valPecuaria){
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
