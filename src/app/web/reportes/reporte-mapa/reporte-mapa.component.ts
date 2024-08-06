import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GestionRegistroGetDto } from 'src/app/models/GestionRegistro';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';
import { MapService } from '../../arcgis-map/services/map.service';
import { SweetAlert } from '../../arcgis-map/util/SweetAlert';

@Component({
  selector: 'reporte-mapa',
  templateUrl: './reporte-mapa.component.html',
  styleUrls: ['./reporte-mapa.component.scss'],
  providers: [BsModalService, ConfirmationService]
})
export class ReporteMapaComponent implements OnInit {
  modalRef?: BsModalRef;
  numDoc: String;
  idPeriodo: number;
  modalActivo:boolean;
  cadPeriodo:String;
  condicionJuridica:String;
  tipoExplotacion:String;
  objRegistro: GestionRegistroGetDto = new GestionRegistroGetDto();
  
  /*GIS*/  
  title = '';
  screenActive = 0;
  isFullViewMap = false;
  visible = false;
  isCollapsed = false;
  showMap = true;
  showData = true;
  mapService:MapService;
  listaCampos:any[];
  admin:any;
  listaTipoCampo:any[] = [{value: 'AGRÍCOLA', label: 'AGRÍCOLA'},
                          {value: 'NO AGRÍCOLA', label: 'NO AGRÍCOLA'},    
                         ];
  listaTenencia:any[] = [{value: 'PROPIO', label: 'PROPIO'},
                         {value: 'ALQUILADO', label: 'ALQUILADO'},    
                        ];
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private _route: ActivatedRoute
    , private modalService: BsModalService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private sweetAlert: SweetAlert) {
    this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
   }

  ngOnInit(): void {
    //--Visualizamos el Formulario
    let formLista = document.getElementById('divFormLista');
    formLista.style.display = 'block';

    this.numDoc = this._route.snapshot.paramMap.get('numDoc');
    this.idPeriodo =  Number.parseInt(this._route.snapshot.paramMap.get('idPeriodo'));
    this.spinner.show();
    this.gestionregistroServiceProxy.getGestionRegistroxDatos(this.numDoc, this.idPeriodo)
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.objRegistro = result.datos;
            console.log(this.idPeriodo.toString());
            this.condicionJuridica=this.objRegistro.ListCondicionJuridica.find(x=>x.value==this.objRegistro.IdCondicionJuridica.toString()).label;
            if(this.objRegistro.IdTipoExplotacion!=null){
              this.tipoExplotacion=this.objRegistro.ListTipoExplotacion.find(x=>x.value==this.objRegistro.IdTipoExplotacion.toString()).label;
            }
            this.cadPeriodo=this.objRegistro.ListPeriodos.find(x=>x.value==this.idPeriodo.toString()).label;
            //--
            //console.log( 'MapService:'+ this.oMapService)
          }
          else {
            this.toastr.error(result.message.toString(), 'Error');
          }          
        }
      }); 
  }

  async mostrarCuestionario(viewUserTemplate: TemplateRef<any>){
    //--Trae Listado de Campos
    this.listaCampos = await this.mapService.getListField();
    console.log(this.listaCampos);

    this.numDoc = this.numDoc;
    this.modalActivo=true;
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-xl'
    });
  }

  exitModal = (): void => {
    this.modalRef?.hide();
  };

  setNumber(event, message) {
    if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(message)) && (event.key !== "-" || /\./.test(message)))  
        return event.preventDefault();
        //if (/\.\d{2}/.test(message)) return event.preventDefault();
  }

  setMapElement(oMapElement:any){
    this.mapService=oMapElement;
    //--Seteamos los variables de los Formularios
    this.mapService.readDivFormLista = document.getElementById('divFormLista');
    this.mapService.editDivAttribute = document.getElementById('divAttribMap');
    this.admin = this.mapService.ptAttributeSelect;
  }

  onChangeSelect(value:any) {
    //console.log(value);
    this.screenActive = value;
    this.showMap = value === 0 || value === 1;
    this.showData = value === 0 || value === 2;
    this.isFullViewMap = value === 1;
  }
  onChangeFullView(value: any) {
    this.isFullViewMap = value;
    this.showMap = true;
    this.showData = !value;
    this.screenActive = value ? 1: 0;
  }
  onSaveAttributes(){
    //--Procedemos con la validación de los atributos
    if(this.admin.fundo==''){
      this.sweetAlert.AlertWarning('Actualización de atributos', ' Falta registrar <b> nombre del fundo</b>')
      return;
    }
    if(this.admin.campo==''){
      this.sweetAlert.AlertWarning('Actualización de atributos', ' Falta registrar <b> nombre del campo</b>')
      return;
    }
    if(this.admin.area_de==''){
      this.sweetAlert.AlertWarning('Actualización de atributos', ' Falta registrar <b> Área declarada</b>')
      return;
    }
    this.mapService.ptSaveAttribute();
    //--this.mapService.ptGraphicsLayerEdit;
    }
  onCancelAttributes(){
    this.mapService.editDivAttribute.style.display = 'none';
    this.mapService.readDivFormLista.style.display = 'block';
  }  
}
