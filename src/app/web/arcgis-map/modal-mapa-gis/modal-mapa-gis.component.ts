import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MapService } from '../../arcgis-map/services/map.service';
import { SweetAlert } from '../../arcgis-map/util/SweetAlert';

@Component({
  standalone: true,
  selector: 'app-modal-mapa-gis',
  templateUrl: './modal-mapa-gis.component.html',
  styleUrl: './modal-mapa-gis.component.scss'
})
export class ModalMapaGisComponent implements OnInit {
  @Input() exitModal = (): void => { };
  @Input() numDoc: String;
  @Input() idPeriodo: number;
  SubmodalRef?: BsModalRef;

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
                        
  constructor(_injector: Injector, 
    private SubmodalService: BsModalService,
    private sweetAlert: SweetAlert){
  
  }
  ngOnInit(): void {

  }
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

  close() {
    this.exitModal();
  }
  exitSubModal = (): void => {
    this.SubmodalRef?.hide();
  };
}
