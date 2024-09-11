import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';
import { LoginService } from 'src/auth/services/login.service';
import { EsriMapComponent } from '../../arcgis-map/components/esri-map/esri-map.component';
import { MapService } from '../../arcgis-map/services/map.service';
import { SweetAlert } from '../../arcgis-map/util/SweetAlert';
import { SwalUtil } from '../../arcgis-map/util/SwalUtil';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  standalone: true,
  selector: 'modal-dibujar-poligono',
  templateUrl: './modal-dibujar-poligono.component.html',
  styleUrl: './modal-dibujar-poligono.component.scss',
  imports: [CommonModule,ReactiveFormsModule,TableModule,
    FormsModule,ConfirmDialogModule,EsriMapComponent, AutoCompleteModule]
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
    ListaUso:any[];
    filteredCountries: any[] | undefined;

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
    isDisabled = false;

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
  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.ListaCultivo as any[]).length; i++) {
        let country = (this.ListaCultivo as any[])[i];
        if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    this.filteredCountries = filtered;
  } 

  async close() {
    //--Activamos el spinner
    const mensaje = 'Actualizando formulario SiSLISTA...';
    SwalUtil.loading('',mensaje,()=>{window.location.reload();});
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
    this.mapService.SisListaTenencia  = this.listaTenencia;
    this.mapService.SisListaUsoTierra = this.listaUsoTierra;
    this.mapService.SisListaCultivo   = this.ListaCultivo;
    this.mapService.SisListaUsoAgricola   = this.ListaUsoAgricola;
    this.mapService.SisistaUsoNoAgricola   = this.ListaUsoNoAgricola;
    this.ListaUso = this.ListaUsoAgricola;

    //--Seteamos los variables de los Formularios
    //this.mapService.readDivFormLista = document.getElementById('divAttribMap');
    this.mapService.editDivAttribute = document.getElementById('divAttribMap');
    this.mapService.ptDivMapa = document.getElementById('div-mapa');
    this.mapService.ptDivAttr = document.getElementById('div-attr');
    this.admin = this.mapService.ptAttributeSelect;
  }
  onChangeSelectUsoTierra() {
    //--Valor por defecto
    this.admin.area_de=''
    this.ListaUso = this.ListaUsoAgricola;    
    //--Validamos si es agricola o no agricola
    this.isDisabled = this.admin.tipo !== 'AGRÍCOLA';
    if (this.isDisabled) {
      this.ListaUso = this.ListaUsoNoAgricola;
      this.admin.cultivo=''
      this.admin.area_de=0.00
    }
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
    if(this.admin.tipo == 'AGRÍCOLA'){
      if(this.admin.cultivo ==''){
        this.sweetAlert.AlertWarning('Actualización de atributos', ' Falta seleccionar <b> el cultivo</b>')
        return;
      }
      if(this.admin.area_de ==''){
        this.sweetAlert.AlertWarning('Actualización de atributos', ' Falta registrar <b> Superficie cultivada</b>')
        return;
      }
      if(this.admin.area_de > this.admin.area_ca){
        this.sweetAlert.AlertWarning('Actualización de atributos', ' La Superficie cultivada es <b> mayor</b> a la superficie del campo')
        return;
      }
    }

    this.mapService.ptSaveAttribute();
    //--this.mapService.ptGraphicsLayerEdit;
  }

  onCancelAttributes(){
    this.mapService.editDivAttribute.style.display = 'none';
    this.mapService.ptDivMapa.style.width = '100%';
    this.mapService.ptDivAttr.style.width = '0%';
    //this.mapService.readDivFormLista.style.display = 'block';
  } 
}
