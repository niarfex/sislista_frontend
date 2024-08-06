import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { PecuarioGetDto } from 'src/app/models/Pecuario';
import { ModalSistemaPecuarioComponent } from './modal-sistema-pecuario/modal-sistema-pecuario.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SelectTipoDto } from 'src/app/models/SelectTipo';
import { GestionRegistroGetDto } from 'src/app/models/GestionRegistro';
import { throws } from 'assert';
@Component({
  standalone: true,
  selector: 'lista-sistema-pecuario',
  templateUrl: './lista-sistema-pecuario.component.html',
  styleUrl: './lista-sistema-pecuario.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    ModalSistemaPecuarioComponent]
})
export class ListaSistemaPecuarioComponent {
  @Input() listaPecuarios: PecuarioGetDto[];  
  @Input() objPecuario:PecuarioGetDto;
  @Input() objCuestionario:GestionRegistroGetDto;
  @Input() modalActivo:boolean=true;
  @Output() enviarLista = new EventEmitter<any>();
  @Output() enviarPecuario = new EventEmitter<any>();
  listLineaProd:SelectTipoDto[]=[];
  listEspecie:SelectTipoDto[]=[];
  SubmodalRef2?: BsModalRef;
  constructor(private toastr: ToastrService
    , private SubmodalService: BsModalService
  ) {

  }
  mostrarModalPecuario(viewUserTemplate: TemplateRef<any>){
    this.SubmodalRef2 = this.SubmodalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    });
  }
  registrarPecuario(viewUserTemplate: TemplateRef<any>) {    
    if(this.objCuestionario.ListFundos.filter(x=>x.ListCampos.filter(y=>y.IdUsoNoAgricola.find(x=>x==(this.objCuestionario.ListUsoNoAgricola.find(z=>z.codigo=="INST").value)).length>0)).length==0){
      this.toastr.warning("Ningun campo tiene seleccionado en Uso no agrícola el tipo Pecuario", 'Aviso');
      return;
    }
    this.listLineaProd=[];
    this.objCuestionario.ListLineaProduccion.forEach(objLinea => {
      if(this.objCuestionario.ListPecuarios.filter(x=>x.IdLineaProduccion.toString()==objLinea.value).length==0){
        this.listLineaProd.push(objLinea);
      }
    });
    this.listEspecie=[];//this.objRegistro.ListEspecies;
    this.objCuestionario.ListEspecies.forEach(objEspecie => {
      if(this.objCuestionario.ListPecuarios.filter(x=>x.IdEspecie.toString()==objEspecie.value).length==0){
        this.listEspecie.push(objEspecie);
      }
    });
    this.objPecuario=new PecuarioGetDto();
    this.mostrarModalPecuario(viewUserTemplate);
  }
  editarPecuario(viewUserTemplate: TemplateRef<any>){
    if(this.listaPecuarios.filter(x=>x.Seleccionado==true).length==0){
      this.toastr.warning("Debe selecionar un registro para ser editado", 'Aviso');
      return;
    }
    else if(this.listaPecuarios.filter(x=>x.Seleccionado==true).length>1){
      this.toastr.warning("Seleccione solo un registro para que pueda ser editado", 'Aviso');
      return;
    }
    this.listLineaProd=this.objCuestionario.ListLineaProduccion;
    this.listEspecie=this.objCuestionario.ListEspecies;
    this.objPecuario=this.listaPecuarios.find(x=>x.Seleccionado==true);
    this.mostrarModalPecuario(viewUserTemplate);
  }
  eliminarPecuarios(){
    if(this.listaPecuarios.filter(x=>x.Seleccionado==true).length==0){
      this.toastr.warning("Debe selecionar por lo menos un registro para ser eliminado", 'Aviso');
      return;
    }
    this.listaPecuarios=this.listaPecuarios.filter(x=>x.Seleccionado==false);
    this.enviarLista.emit(this.listaPecuarios);
  } 
  insertarPecuario(pecuario:PecuarioGetDto){
    this.enviarPecuario.emit(pecuario);
  }
  exitSubModal2 = (): void => {
    this.SubmodalRef2?.hide();
  };
}
