import { Component, SimpleChanges, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
// service
import { MapService } from '../../services/map.service';
import { GoogleMapPosition, GoogleMapPov } from '../../models/googlemaps.model';
import { CoordinatesStatusMap } from '../../models/general.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})

export class EsriMapComponent implements OnInit {
  @Input() isFullView: boolean;
  @Output() changeFullView = new EventEmitter<boolean>();
  @Output() MapElement = new EventEmitter<MapService>();
 
  items:any[] = [];
  contextMenu:any;

  administradoDoc='';
  mapActive = 2;
  activeTools = 1;
  activeStreet = false;
  activeDownload = false;
  activeAddWMS = false;
  position: GoogleMapPosition;
  pov: GoogleMapPov;

  constructor(private elementRef: ElementRef, private spinner: NgxSpinnerService, private _route: ActivatedRoute, public mapService: MapService) {
    this.mapService.startMap('divMapView', 'divSceneView');
    this.position = { lat: -12.089592346951877, lng: -77.0581966638565 };
    this.pov = { heading: 35, pitch: 0, zoom: 0 };
    this.mapService.positionStreet = this.position;
    this.mapService.povStreet = this.pov;
    this.mapService.getStreet().subscribe(position => {
      this.position = position;
    });
    this.mapService.activeStreet = false;
  }

  ngOnInit() {
    //--
    this.contextMenu = document.getElementById('contextMenu');
    //buttons masurement
    this.mapService.editcontexMenu = document.getElementById('contextMenu');   
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
    this.mapService.SisListaRuc = this.administradoDoc

    this.items = [
      { label: 'Copy', icon: 'pi pi-copy' },
      { label: 'Rename', icon: 'pi pi-file-edit' }
    ];

  }

  ngAfterContentInit() {
    // this.mapService.basemapGallery.renderNow();
  }

  async ngOnChanges(changes: SimpleChanges) {
    //--Enviar datos del Mapa
    this.MapElement.emit(this.mapService);
  }

  changeSelectMap() {
    //console.log(this.mapActive);
    this.onClickClear();
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
    this.closeWindow('download');
    this.closeWindow('addWMS');
    this.mapService.setActiveWidget('popupview');
  }
  onClickClear() {
    this.activeStreet = false;
    this.closeWindow('download');
    this.closeWindow('addWMS');
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
  onEditGraphic(){
    this.mapService.ptEditTool.name="Edit";
    this.mapService.ptEditGeometry();
  }
  onCreateLineGraphic(evt:any){
    this.mapService.ptEditTool.name="Create Line";
    this.mapService.ptCreateGeometry(evt);
 }

 async onSaveChanges(){
  await this.mapService.setDeleteFeature()
 }  
}

