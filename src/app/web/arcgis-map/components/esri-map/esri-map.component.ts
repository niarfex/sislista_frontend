import { Component, SimpleChanges, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, Renderer2 } from '@angular/core';
// service
import { MapService } from '../../services/map.service';
//--Alert
import { SweetAlert } from '../../util/SweetAlert';
import { GoogleMapPosition, GoogleMapPov } from '../../models/googlemaps.model';
import { CoordinatesStatusMap } from '../../models/general.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})

export class EsriMapComponent implements OnInit {
  @Input() isFullView: boolean;
  @Output() changeFullView = new EventEmitter<boolean>();
  @Output() MapElement = new EventEmitter<MapService>();

  @ViewChild('inFile') inFile!: ElementRef;
  @ViewChild('customButtonContainer') container!: ElementRef;

 
  items:any[] = [];
  contextMenu:any;

  admin:any;

  administradoDoc='';
  mapActive = 2;
  activeTools = 1;
  activeStreet = false;
  activeDownload = false;
  activeAddWMS = false;
  position: GoogleMapPosition;
  pov: GoogleMapPov;

  cardTitle:any;

  constructor(private renderer: Renderer2, private sweetAlert: SweetAlert, private elementRef: ElementRef, private spinner: NgxSpinnerService, private _route: ActivatedRoute, public mapService: MapService) {
    this.mapService.startMap('divMapView', 'divSceneView');
    this.position = { lat: -12.089592346951877, lng: -77.0581966638565 };
    this.pov = { heading: 35, pitch: 0, zoom: 0 };
    this.mapService.positionStreet = this.position;
    this.mapService.povStreet = this.pov;
    this.mapService.getStreet().subscribe(position => {
      this.position = position;
    });
    this.mapService.activeStreet = false;
    this.admin = this.mapService.ptAttributeSelect;
  }

  ngOnInit() {
    //--
    this.contextMenu = document.getElementById('contextMenu');
  
    //buttons masurement
    this.mapService.editDivMenu = document.getElementById('contextMenu');
    //this.mapService.editDivAttribute = document.getElementById('AttributeForm');
    this.mapService.editDivToolbar= document.getElementById('editToolbar');
    this.mapService.editDivZipfile = document.getElementById('ZipFileForm');
    
    this.mapService.distanceButton2D = document.getElementById('measurement_distance_2D');
    this.mapService.areaButton2D = document.getElementById('measurement_area_2D');
    this.mapService.distanceButton3D = document.getElementById('measurement_distance_3D');
    this.mapService.areaButton3D = document.getElementById('measurement_area_3D');
    this.mapService.streetViewButton = document.getElementById('street_view');
    this.mapService.popupViewButton = document.getElementById('popup_view');
    this.mapService.printButton2D = document.getElementById('print_2D');
    this.mapService.printSeparator2D = document.getElementById('print_separator_2D');

    //--Datos del Administrado
    this.administradoDoc = this._route.snapshot.paramMap.get('numDoc');
    //this.administradoDoc ='20131823020';
    this.mapService.SisListaRuc = this.administradoDoc

    this.changeSelectMap();

  }

  ngAfterContentInit() {
    // this.mapService.basemapGallery.renderNow();
  }

  async ngOnChanges(changes: SimpleChanges) {
    //--Enviar datos del Mapa
    this.MapElement.emit(this.mapService);
  }

  setNumber(event, message) {
    if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(message)) && (event.key !== "-" || /\./.test(message)))  
        return event.preventDefault();
        //if (/\.\d{2}/.test(message)) return event.preventDefault();
  }

  changeSelectMap() {
    //console.log(this.mapActive);
    //this.onClickClear();
    this.mapService.setActiveView(this.mapActive);
    this.mapService.UpdatePositionStreet();
    this.changeExtent();
  }

  changeExtent() {
    switch (this.mapActive) {
      case 2:
        this.mapService.mapView.extent = this.mapService.sceneView.extent;
        break;
      case 3:
        this.mapService.sceneView.extent = this.mapService.mapView.extent;
        break;
    }
  }

  onChangeView() {
    this.isFullView = !this.isFullView;
    this.changeFullView.emit(this.isFullView);
  }

  onClickMeasurementDistance() {
    this.activeStreet = false;
    this.closeWindow('download');
    this.closeWindow('addWMS');
    this.mapService.setActiveWidget('distance');
  }

  onClickMeasurementArea() {
    this.activeStreet = false;
    this.closeWindow('download');
    this.closeWindow('addWMS');
    this.mapService.setActiveWidget('area');
  }

  onClickStreetView() {
    this.activeStreet = true;
    this.closeWindow('download');
    this.closeWindow('addWMS');
    this.mapService.setActiveWidget('streetview');
  }

  onClickPopupView() {
    this.activeStreet = false;
    //this.closeWindow('download');
    //this.closeWindow('addWMS');
    this.mapService.setActiveWidget('popupview');
  }
  onClickClear() {
    this.activeStreet = false;
    //this.closeWindow('download');
    //this.closeWindow('addWMS');
    this.mapService.clearActiveWidget();
  }

  onChangePosition(position: GoogleMapPosition) {
    //console.log(position);
    this.mapService.positionStreet = position;
    this.mapService.UpdatePositionStreet();
  }

  onChangePov(pov: GoogleMapPov) {
    //console.log(pov);
    this.mapService.povStreet = pov;
    this.mapService.UpdatePositionStreet();
  }

  closeWindow(type: string) {
    if (type == 'download') {
      this.activeDownload = false;
    } else if (type == 'addWMS') {
      this.activeAddWMS = false;
    }
  }

  openWindow(type: string) {
    this.onClickClear();
    //this.activeDownload = false;
    //this.activeAddWMS = false;
    if (type == 'download') {
      this.activeDownload = true;
    } else if (type == 'addWMS') {
      this.activeAddWMS = true;
    }
  }

  onAddWMS(url: string) {
    //console.log(url);
    this.mapService.addWMS(url);
  }

  onClearWMS() {
    this.mapService.clearWMS();
  }

  onClickPrint() {
    this.activeStreet = false;
    this.closeWindow('download');
    this.closeWindow('addWMS');
    this.mapService.setActiveWidget('print');
  }

  onSelectGraphic(){
    this.mapService.ptEditTool.name="select";
    this.mapService.ptSelectGeometry();
  }
  onClearSelectGraphic(){
    this.mapService.ptEditTool.name="Clear Selection";
    this.mapService.ptClearSelectGeometry();
  }
  onEditAttribute(){
    //this.mapService.ptEditTool.name="select";
    this.mapService.ptEditAttribute();
  }
  onEditGraphic(){
    this.mapService.ptEditTool.name="Edit";
    this.mapService.ptEditGeometry();
  }
  onMergeGraphic(){
    this.mapService.ptEditTool.name="Create rectangle";
    this.mapService.ptMergeGeometry();
  } 
  onDeleteGraphic(){
    //--Valida Aprobacion
    let question: any = this.sweetAlert.AlertQuestion(
      'Edición de Elementos',
      '¿Estas seguro de eliminar el registro ?'
    );
    if (question instanceof Promise) {
      // Validando si lo retornado es una promesa (caso 'X');
      question.then((response: any) => {
        if (response.isConfirmed) {
          this.mapService.ptDeleteGeometry();          
        }
      });
    } else {
      this.sweetAlert.AlertError('Edición de Elementos', 'Error de Validacion')
    }
  }
  onshowLoadZipFile(){
    this.mapService.ptEditTool.name="Load ZipFile";
    this.mapService.showLoadZipFile();
  }
  onLoadZipFile(event){
    const file:File = event.target.files[0];
    if (file){this.onQuestionZipFile(file)}
    this.inFile.nativeElement.value = '';
  }

  onQuestionZipFile(file: File){
    //--Confirmamos la carga
    console.log('Archivo cargado:', file);
    //--Valida Aprobacion
    let question: any = this.sweetAlert.AlertQuestion(
      'Edición de Elementos',
      '¿Estas seguro de cargar el archivo <b>' + file.name + '</b>?'
    );
    if (question instanceof Promise) {
          // Validando si lo retornado es una promesa (caso 'X');
          question.then((response: any) => {
            if (response.isConfirmed) {
              this.mapService.ptGenerateFatureCollection(file);          
            }
          });
        } else {
          this.sweetAlert.AlertError('Edición de Elementos', 'Error de carga de archivo')
        }
  }

  onCreateLineGraphic(evt:any){
    this.mapService.ptEditTool.name="Create " + evt;
    this.mapService.ptCreateGeometry(evt);
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
  }
  async onSaveChanges(){
    //--Valida Aprobacion
    let question: any = this.sweetAlert.AlertQuestion(
      'Sesión de edición',
      '¿Estas seguro de grabar los cambios?'
    );
    if (question instanceof Promise) {
      question.then(async(response: any) => {
        if (response.isConfirmed) {
          //await this.mapService.setDeleteFeature()
          this.mapService.setBackupFeature();
        }      
      });
    }else{
      this.sweetAlert.AlertError('Presupuesto', 'Error de Validacion')
    }
  }
  /*
  Eventos del Formulario Cargar ShapeFile
  */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.addClass(this.container.nativeElement, 'drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.removeClass(this.container.nativeElement, 'drag-over');
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.onQuestionZipFile(event.dataTransfer.files[0])
      this.inFile.nativeElement.value = '';      
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.removeClass(this.container.nativeElement, 'drag-over');
  }
}
