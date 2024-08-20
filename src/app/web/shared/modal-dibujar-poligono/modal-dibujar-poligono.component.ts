import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';
import { LoginService } from 'src/auth/services/login.service';
import { EsriMapComponent } from '../../arcgis-map/components/esri-map/esri-map.component';
import { MapService } from '../../arcgis-map/services/map.service';
import { SweetAlert } from '../../arcgis-map/util/SweetAlert';

@Component({
  standalone: true,
  selector: 'modal-dibujar-poligono',
  templateUrl: './modal-dibujar-poligono.component.html',
  styleUrl: './modal-dibujar-poligono.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,
    FormsModule,ConfirmDialogModule,EsriMapComponent]
})
export class ModalDibujarPoligonoComponent {
  @Input() exitSubModal = (): void => {};
  @Input() numDoc: String;
  @Input() nombreEmpresa: String;
  @Input() listaTenencia:any[];
  @Input() listaUsoTierra:any[];
  @Input() ListaCultivo:any[];
  @Input() ListaUsoAgricola:any[];
  @Input() ListaUsoNoAgricola:any[];

  @Output() enviarListaFundos = new EventEmitter<any>();

  modalForm = this.formBuilder.group({
    NombreFundo: ['', [Validators.required]],
    NombreCampo: ['', [Validators.required]]
  });
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private sweetAlert: SweetAlert
    , private loginService: LoginService) {
      this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
  }
  get NombreFundo() { return this.modalForm.controls['NombreFundo']; }
  get NombreCampo() { return this.modalForm.controls['NombreCampo']; }
  
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
    /*listaTipoCampo:any[] = [{value: 'AGRÍCOLA', label: 'AGRÍCOLA'},
                            {value: 'NO AGRÍCOLA', label: 'NO AGRÍCOLA'},    
                           ];
    listaTenencia:any[] = [{value: 'PROPIO', label: 'PROPIO'},
                           {value: 'ALQUILADO', label: 'ALQUILADO'},    
                          ]; */

  ngOnInit(): void {

  }
  onClickSubmit(data) {

  } 
  async close() {
    //--Trae Listado de Campos
    this.listaCampos = await this.mapService.getListField();
    this.enviarListaFundos.emit(this.listaCampos);
    this.exitSubModal();
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
  }
  dibujarPoligono(){

  }
  procesarFundos(){

  }
  grabar(){

  }
  
  setNumber(event, message) {
    if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(message)) && (event.key !== "-" || /\./.test(message)))  
        return event.preventDefault();
        //if (/\.\d{2}/.test(message)) return event.preventDefault();
  }

  setMapElement(oMapElement:any){
    this.mapService=oMapElement;
    //--Datos de SisLista
    this.mapService.SisListaRuc = this.numDoc
    this.mapService.SisListaRaz = this.nombreEmpresa
    this.mapService.SisListaUsr = this.loginService.getCurrentUserValue['Usuario'];
    //--Seteamos los variables de los Formularios
    //this.mapService.readDivFormLista = document.getElementById('divAttribMap');
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
    //this.mapService.readDivFormLista.style.display = 'block';
  } 
}
