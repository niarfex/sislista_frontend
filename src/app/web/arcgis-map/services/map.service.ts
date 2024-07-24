/*************************************************************************
 * Proyecto : MIDAGRI - MARCO DE LISTA                                   *
 * Fecha    : 16 / 07 / 2024 13:00:00                                    *
 * Autor    : Francisco Calderon Franco - FRCF                           *
 * Descripcion    : Componentes de funcionalidades de ArcGIS API JS      *
 *************************************************************************
 *                       MODIFICACIONES POSTERIORES                      *
 *=======================================================================*
 *=  Fecha   | Persona |           Modificacion Realizada               =*
 *=======================================================================*
 *           |         |                                                 *
 *************************************************************************/
//--Constantes de configuracion
import {config } from '../util/config';

 //--Librerias utilizadas
import { Injectable } from '@angular/core';
import { BasemapCollectionService } from './BasemapCollection.service';
import { LayersService } from './layers.service';
import { MapLayer } from '../models/maplayer.model';
import { GoogleMapPosition, GoogleMapPov } from '../models/googlemaps.model';
import { GlobalsService } from './globals.service';
import { Subject, Observable } from 'rxjs';
import { CoordinatesStatusMap } from '../models/general.model';
import { EmissionService } from './emission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalUtil } from '../util/SwalUtil';
import Swal, { SweetAlertResult } from "sweetalert2";
import * as arcgis from '../util/arcgis-libraries';

import { url } from 'inspector';
import { AnyARecord, AnyCnameRecord } from 'dns';


@Injectable({
  providedIn: 'root'
})

export class MapService {
  //--Variables de la clase Publicas
  map: any;
  mapView: any;
  activeView: any;
  activeWidget2D: any;
  activeWidget3D: any;
  sceneView: any;
  basemap: any;
  layers: any[] = [];
  mapLayers: MapLayer[]=[];
  spatialReference: any;
  basemapGallery: any;
  coordStatusMap: CoordinatesStatusMap;

  //--Datos del Administrado
  SisListaRuc: any;
  SislistaLayer: any[] = [];

  //-Datos de Edición
  editDivMenu:any;
  editDivAttribute:any;
  editDivToolbar:any;

  editEditor:any
  editWidget:any;
  editSketch:any
  EditProgress:boolean=false;

  ptEditTool:any; 
  ptGraphicEdit:any;
  ptGraphicSelect:any;
  ptAttributeSelect:any;

  //--Layers para opción de Edición
  ptFeatureLayerEdit:any
  ptGraphicsLayerEdit:any;
  ptGraphicLayerSelect:any;
  

  // StreetView
  activeStreet: boolean;
  positionStreet: GoogleMapPosition;
  povStreet: GoogleMapPov;
  private changePositionStreet$: Subject<GoogleMapPosition> = new Subject<GoogleMapPosition>();

  // Popup
  activePopup: boolean;

  // WMS
  isAddWMS: boolean

  // variables de ESRI
  EsriMap: any;
  EsriMapView: any;
  EsriSceneView: any;
  EsriSpatialReference: any;
  EsriExpand: any;
  EsriBasemapGallery: any;
  EsriLayerList: any;
  EsriLegend: any;
  EsriTileLayer: any;
  EsriMapImageLayer: any;
  EsriFeatureLayer:any;
  EsriGraphicsLayer: any;
  EsriGraphicsLayerEdit: any;
  FeatureService: any;
  EsriCompass: any;
  EsriRequest: any;
  EsriLocate: any;
  EsriDistanceMeasurement2D: any;
  EsriAreaMeasurement2D: any;
  EsriDirectLineMeasurement3D: any;
  EsriAreaMeasurement3D: any;
  EsriGraphic: any;
  EsriWMSLayer: any;
  EsriCoordinateConversion: any;
  EsriFormat: any;
  EsriConversion: any;
  EsriwebMercatorUtils: any;
  EsriPoint: any;
  Esriprojection: any;
  EsriPrint: any;
  EsriSearch: any;
  EsriGeometryService: any;
  EsriProjectParameters: any;
  EsriScaleBar: any;
  Esriconfig: any;
  EsriCustomContent:any;
  EsriEditor:any;
  EsriSketch:any;
  EsriGeometryEngine:any;

  measurement2D: any;
  distanceButton2D: any;
  areaButton2D: any;
  measurement3D: any;
  distanceButton3D: any;
  areaButton3D: any;
  streetViewButton: any;
  popupViewButton: any;
  printButton2D: any;
  printSeparator2D: any;

  /*=======================================================================*
   *Sección: Variables de rutas del Proxy, Mapas Base y Servicios de GP    *
   *************************************************************************/
  private urlProxy: string = config.agsUrlProxy;
  private urlBasemap: string = config.agsUrlRoot + config.agsUrlBasemap;

  constructor(private spinner: NgxSpinnerService, private emissonService: EmissionService, private basemapService: BasemapCollectionService, private layersService: LayersService, private globals: GlobalsService) {
    this.coordStatusMap = {zoneUTM: 18, xUTM: 0, yUTM: 0, latitude: 0, longitude: 0, height: 0};
  }

  async startMap(divMapView: any, divSceneView: any) {    
        this.EsriMap = arcgis.Map;
        this.EsriMapView = arcgis.MapView;
        this.EsriSceneView = arcgis.SceneView;
        this.EsriSpatialReference = arcgis.SpatialReference;
        this.EsriExpand = arcgis.Expand;
        this.EsriBasemapGallery = arcgis.BasemapGallery;
        this.EsriLayerList = arcgis.LayerList;
        this.EsriLegend = arcgis.Legend;
        this.EsriTileLayer = arcgis.TileLayer;
        this.EsriMapImageLayer = arcgis.MapImageLayer;
        this.EsriFeatureLayer = arcgis.FeatureLayer;
        this.EsriGraphicsLayer = arcgis.GraphicsLayer;
        this.FeatureService = arcgis.FeatureService;
        this.EsriCompass = arcgis.Compass;
        this.EsriRequest = arcgis.Request;
        this.EsriLocate = arcgis.Locate;
        this.EsriDistanceMeasurement2D = arcgis.DistanceMeasurement2D;
        this.EsriAreaMeasurement2D = arcgis.AreaMeasurement2D;
        this.EsriDirectLineMeasurement3D = arcgis.DirectLineMeasurement3D;
        this.EsriAreaMeasurement3D = arcgis.AreaMeasurement3D;
        this.EsriGraphic = arcgis.Graphic;
        this.EsriWMSLayer = arcgis.WMSLayer;
        this.EsriCoordinateConversion =  arcgis.CoordinateConversion;
        this.EsriFormat =  arcgis.Format;
        this.EsriConversion =  arcgis.Conversion;
        this.EsriwebMercatorUtils =  arcgis.webMercatorUtils;
        this.EsriPoint =  arcgis.Point;
        this.Esriprojection =  arcgis.Projection;
        this.EsriPrint =  arcgis.Print;
        this.EsriSearch =  arcgis.Search;
        this.EsriGeometryService =  arcgis.GeometryService;
        this.EsriProjectParameters =  arcgis.ProjectParameters;
        this.EsriScaleBar =  arcgis.ScaleBar;
        this.Esriconfig =  arcgis.Config;
        this.EsriCustomContent =  arcgis.CustomContent;
        this.EsriEditor =  arcgis.Editor;
        this.EsriSketch =  arcgis.Sketch;
        this.EsriGeometryEngine =  arcgis.GeometryEngine;

        // iniciar constantes
        this.ptEditTool = {name:'', disabled:false};
        this.ptAttributeSelect = {ruc:'', nombre:'', fundo:'', campo:'', area:'' };

        this.isAddWMS = false;
        this.activePopup = false;
        this.activeStreet = false;
        this.basemap = this.basemapService.getTopo();
        this.spatialReference = new  arcgis.SpatialReference({ wkid: 102100 });
        this.layersService.EsriMapImageLayer = this.EsriMapImageLayer;
        this.layersService.EsriFeatureLayer = this.EsriFeatureLayer;
        this.layersService.EsriGraphicsLayer = this.EsriGraphicsLayer;
        this.layersService.EsriRequest = this.EsriRequest;        
        this.activeView = this.mapView;
        this.coordStatusMap = {zoneUTM: 18, xUTM: 0, yUTM: 0, latitude: 0, longitude: 0, height: 0};

        //--Obtenemos las capas para el mapa
        this.layers = await this.layersService.getLayers(config.agsNomBasemap,this.urlBasemap,true);        
        this.ptGraphicsLayerEdit = this.layersService.EditGraphicsLayer;
        this.ptGraphicLayerSelect = this.layersService.SelectGraphicsLayer;

        console.log('Layers del Mapa:' + this.layers);
        //-Obtnemos el map
        this.map = new this.EsriMap(this.getMapProperties());
        //console.log('loading map');
        
        /** Configuración del MapView **/
        //--Obtnemos la Propiedades
        const mapViewProperties = this.getViewProperties(divMapView, this.map);
        //--Obtnemos el contenedor
        this.mapView = new this.EsriMapView(mapViewProperties);
        //--Agregamos eventos al contenedor
        this.mapView.on('click', (event) => { this.eventClickMap(event); });
        this.mapView.on('pointer-move', (event) => { this.eventPointerMove(event); });
        //--Agregamos los Widgets
        this.setAddWidgetMapView()
        //--Agregamos El Widget de Edición
        this.setAddEditWidget()
        //Agregamos el skech
        this.setaddSkechWidget()
        // Ocultar el menú contextual cuando se hace clic en el mapa
        this.mapView.on('click', (event) => {
          this.editDivMenu.style.display = 'none';          
        });

        /** Configuración del SceneView **/
        //--Obtnemos la Propiedades
        //const sceneViewProperties = this.getViewProperties(divSceneView, this.map);
        //--Obtnemos el contenedor
        //this.sceneView = new EsriSceneView(sceneViewProperties);
        //--Agregamos eventos al contenedor
        //this.sceneView.on('click', (event) => { this.eventClickMap(event); });
        //this.sceneView.on('pointer-move', (event) => { this.eventPointerMove(event); });
        //--Agregamos los Widgets
        //this.setAddWidgetSceneView();

        //--Variable para la Lista de capas de Información
        this.SislistaLayer = [];
        this.mapView.when(()=>{
          this.map.layers.items.forEach((item:any, index:any)=>{
            //--Nos Aseguremoas que el Layer este Cargado
             item.when(()=> {
              if(item.allSublayers===undefined){return}
                item.allSublayers.forEach((itemLyr:any, index:any)=>{
                let _lyr:any = {}; 
                    _lyr.title = itemLyr.title;
                    _lyr.layer = itemLyr;
                this.SislistaLayer.push(_lyr)
              });
              //--Filtramos los Layers
              this.setFilterLayers()
              //--Realizamos el Zoom a la Capa de Campos
              const itemCapa = 2
              this.setZoomToExtentLayer(itemCapa)
            });
          });  
        });
        /*
        const editor = new EsriEditor({
          view: this.mapView
        });
       
        const EditorExpand = new this.EsriExpand({
          autoCollapse: true,
          view: this.mapView,
          content: editor,
          expanded: false,
          label: 'Editor',
          collapseTooltip: 'Editor',
          expandTooltip: 'Editor'
        });
        this.mapView.ui.add(EditorExpand, 'top-left');
*/
        const popup = {
          autoOpenEnabled: false,
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
            position: 'bottom-right'
          }
        };

        this.mapView.popup = popup;
        this.sceneView.popup = popup;
        this.setPopupLayers();
        this.mapView.popup.on('trigger-action', (event) => { this.eventAction(event); });
  }

  /*=======================================================================*
   *Sección: Widgets del MapaView                                          *
   *************************************************************************/  
  setAddWidgetMapView(){
    this.addCompass(this.mapView);
    this.addLocate(this.mapView);
    this.addBasemapGallery(this.mapView);
    this.addListLayers(this.mapView);
    this.addLegend(this.mapView);        
    this.AddScaleBar(this.mapView);
    //this.addSearch(this.mapView);
    //this.addCoordinateConversion(this.mapView, 'div-coord-conver-2D');
  }
  setAddWidgetSceneView(){
    this.addLocate(this.sceneView);
    this.addBasemapGallery(this.sceneView);
    this.addListLayers(this.sceneView);
    this.addLegend(this.sceneView);
    this.AddScaleBar(this.sceneView);
    //this.addSearch(this.sceneView);      
    //this.addCoordinateConversion(this.sceneView, 'div-coord-conver-3D');
  }
  setAddEditWidget(){
    
    //----------------------------------------------
    // Editor widget para Feature Layer
    //----------------------------------------------  
    this.editEditor = new this.EsriEditor({view: this.mapView});

    //----------------------------------------------
    // Servicio Feature de Edición
    //----------------------------------------------
    let strQuery = "TXT_EMPRESA_RUC='" + this.SisListaRuc + "'" 
    this.ptFeatureLayerEdit= new this.EsriFeatureLayer({
      url: config.agsUrlRoot + config.agsUrlEditLyr,
      legendEnabled:false,
      opacity:0.5,
      definitionExpression:strQuery,
      outFields: ["*"],
      title:"Campos",
      visible:true
    })
  
    //----------------------------------------------
    // Widget Expand de Edición
    //----------------------------------------------  
    //const sampleInstructions = document.getElementById("Instrucciones");
    const expandEdit = new this.EsriExpand({
      view:this.mapView,
      collapseIcon:'x-circle',
      expandIcon:'add-features',
      expanded: false,
      label: 'Editor',
      collapseTooltip: 'Cerrar editor',
      expandTooltip: 'Abrir editor'
    })

    this.editWidget = expandEdit;
    this.mapView.ui.add(expandEdit, 'top-left');
    expandEdit.watch('expanded', (expanded:any)=>{
      const widget = 'direXY';
      var isGraphicsVisible = expanded;
      if (expanded){
        this.setViewGraphicsLayer()      
      }else{
        isGraphicsVisible = expanded
      }
      if(this.ptFeatureLayerEdit !== undefined ){this.ptFeatureLayerEdit.visible=!isGraphicsVisible}
      //--Desactiva las capasa para la edición
      //this.editSketch.visible = isGraphicsVisible;
      this.ptGraphicsLayerEdit.visible = isGraphicsVisible;
      this.ptGraphicLayerSelect.visible = isGraphicsVisible;

      this.ptFeatureLayerEdit.visible = isGraphicsVisible;
      this.SislistaLayer[0].layer.visible = !isGraphicsVisible
      this.SislistaLayer[1].layer.visible = !isGraphicsVisible
      this.SislistaLayer[2].layer.visible = !isGraphicsVisible

      this.EditProgress = false;
  })
  }

  async setViewGraphicsLayer(){
    const symbol = this.globals.symbolEditFill;
    var featureLayer = this.SislistaLayer[0].layer;
    var query = featureLayer.createQuery();
        query.where =  "TXT_EMPRESA_RUC='" + this.SisListaRuc + "'";
        query.returnGeometry = true;
        query.outFields = ['*'];
    
    await featureLayer.queryFeatures(query).then((result:any)=>{
      const features = result.features.map((feacture:any) => {
        const f = feacture.clone();
        //f.geometry= arcgis.webMercatorUtils.geographicToWebMercator(feacture.geometry);
        f.symbol = symbol;
        return f;
      });
      //--Eliminamos los graficos actuales
      this.ptGraphicsLayerEdit.removeAll();
      this.ptGraphicsLayerEdit.addMany(features)
      this.ptGraphicSelect = null;
      //this.setRefresh(featureLayer.extent);
    });
  }
  
  //------------------------------------------------------------------------------------------------------
  // Desc. fn: Eventos de Edición
  // Params: id del poligono
  //------------------------------------------------------------------------------------------------------
  setaddSkechWidget(){
    this.editSketch = new arcgis.Sketch({
      view: this.mapView,
      defaultUpdateOptions:{
       enableRotation:false,
       enableScaling: false,
       toggleToolOnClick: false 
      }     
    });

    this.editSketch.on("update", (event:any)=>{
      const eventInfo = event.toolEventInfo;
      if (event.state =="start" && event.tool=="transform"){
      }
    });

    //---
    this.editSketch.on('create', evt => {
      if(evt.state === 'complete'){ 
        // CUT POLYLINE INPUT //
        const polylineGeometry = this.EsriwebMercatorUtils.webMercatorToGeographic(evt.graphic.geometry);
        if(polylineGeometry.type === 'polyline'){ 
          //--Procedemos a Eliminar la polyline
          this.ptGraphicsLayerEdit.remove(evt.graphic);
          //--Validamos si se selecciono un Poligono a cortar
          if (this.ptGraphicSelect.length == 0){console.log('No selecciono un poligono'); return}
          //--Obtenemos el Poligono seleccionado
          const oCutGeometry = this.ptGraphicSelect.items[0].clone();
          //-- Validamos si el Poligono intersecta la Polyline
          let intersects = this.EsriGeometryEngine.intersects(oCutGeometry.geometry, polylineGeometry);
          if (intersects){
            //--Procedemos con el split del Poligono
            const cutResults = this.EsriGeometryEngine.cut(oCutGeometry.geometry, polylineGeometry); 
            //--Validamos si hya resultados
            if(cutResults.length){   
               //--Eliminamos el Poligono existente
               this.ptGraphicsLayerEdit.remove(this.ptGraphicSelect.items[0]);
               //--Limpiamos el poligono seleccionado
               this.ptGraphicSelect.items[0] = 0;
               //--Añadimos los nuevos poligonos creados
               this.ptGraphicsLayerEdit.addMany(cutResults.map(cutResult=>{ 
                //console.log(oAttributes);
                let oAttributes:any = oCutGeometry.clone().attributes;
                return {
                  geometry:cutResult,
                  symbol: this.globals.symbolEditFill,
                  attributes:oAttributes
                }
               }));
            }
          }else{
            console.log('No ha seleccionado un poligono para cortar');
          }
        }else{
          evt.graphic.geometry = polylineGeometry;
        }
      }
    });

  }
  ptEditAttribute(){   
    //--Validamos si hay seleccionados
    this.editDivMenu.style.display = 'none';
    this.editDivAttribute.style.display = 'none';

    if(this.ptGraphicSelect.length == 0){console.log('No selecciono un poligono'); return}
    //--Validamos si hay seleccionados
    this.editDivAttribute.style.display = 'block';

    //--Obtenemos los datos principales
     let strAux = this.ptGraphicSelect.items[0].attributes['TXT_EMPRESA_RUC']
     this.ptAttributeSelect.ruc = (!strAux)?'':strAux;

    strAux = this.ptGraphicSelect.items[0].attributes['TXT_EMPRESA_NOMBRE']
    this.ptAttributeSelect.nombre = (!strAux)?'':strAux;

    strAux = this.ptGraphicSelect.items[0].attributes['TXT_FUNDO_NOMBRE']
    this.ptAttributeSelect.fundo = (!strAux)?'':strAux;

    strAux = this.ptGraphicSelect.items[0].attributes['TXT_CAMPO_NOMBRE']
    this.ptAttributeSelect.campo = (!strAux)?'':strAux;

    strAux = this.ptGraphicSelect.items[0].attributes['NUM_AREA_DECLARADA'];
    this.ptAttributeSelect.area = (!strAux)?'':strAux;
    console.log('Atributos:' + this.ptAttributeSelect)
  }
  ptSaveAttribute(){
    //--Validamos si hay seleccionados
    this.editDivAttribute.style.display = 'none';
    if(this.ptGraphicSelect.length == 0){console.log('No selecciono un poligono'); return}
    //--Guardamos los datos en el Graphic
    this.ptGraphicSelect.items[0].attributes['TXT_EMPRESA_RUC'] = this.ptAttributeSelect.ruc
    this.ptGraphicSelect.items[0].attributes['TXT_EMPRESA_NOMBRE'] = this.ptAttributeSelect.nombre;
    this.ptGraphicSelect.items[0].attributes['TXT_FUNDO_NOMBRE'] = this.ptAttributeSelect.fundo;
    this.ptGraphicSelect.items[0].attributes['TXT_CAMPO_NOMBRE'] = this.ptAttributeSelect.campo;
    this.ptGraphicSelect.items[0].attributes['NUM_AREA_DECLARADA'] = this.ptAttributeSelect.area;
  }
  
  ptSelectGeometry(){   
    this.editSketch.layer = this.ptGraphicLayerSelect;
    this.editSketch.cancel();    
  }

  ptEditGeometry(){
    this.editDivMenu.style.display = 'none';
    this.editSketch.layer = this.ptGraphicsLayerEdit;
    this.editSketch.update([this.ptGraphicSelect.items[0]], {
      tool: "reshape",
      enableRotation: false,
      enableScaling: false,
      preserveAspectRatio: true,
      toggleToolOnClick: false
    });
    this.refresh(this.ptGraphicSelect.items[0].geometry.extent)
  }
  
  ptCreateGeometry(type:any){
    this.editDivMenu.style.display = 'none';
    this.editSketch.layer = this.ptGraphicsLayerEdit;
    this.editSketch.creationMode = type=='polyline'? 'single':'continuous';

    this.editSketch.create(type, {   
      enableRotation: false,
      enableScaling: false,
      preserveAspectRatio: true,
      toggleToolOnClick: false,      
    });    
  }

  setAddWidgetEdit(){
    //----------------------------------------------
    // Servicio Feature de Edición
    //----------------------------------------------  
    this.ptFeatureLayerEdit= new this.EsriFeatureLayer({
      url: config.agsNomBasemap + config.agsUrlEditLyr,
      mode: this.EsriFeatureLayer.MODE_SNAPSHOT,
      outFields: ["*"]
    })

    //Tipo: Eventos del Feature de Servicio de Edición
    //Objetivo: Esta función se activará cada vez que applyEdits () se complete con éxito
    this.ptFeatureLayerEdit.on('edits',async (event:any)=>{
      console.log('--Edición de Servicio de Consulta - Estado: OK');
      //this.spinner.hide();
      var adds:any = event.addedFeatures
      if (adds.length===0){adds=event.updatedFeatures}
      if(adds.length>=1){
        console.log('--Edición de Servicio de Consulta - ObjectID: ', adds[0].objectId);
        //await this.RealizarAnalisis(Number(adds[0].objectId))
      }else{
        console.error('Ocurrio una excepción al grabar la información, intentalo nuevamente');
      }
    });

    //----------------------------------------------
    // Editor widget para Feature Layer
    //----------------------------------------------  
    this.editEditor = new this.EsriEditor({view: this.mapView});

    //----------------------------------------------
    // Widget Expand de Edición
    //----------------------------------------------  
    //const sampleInstructions = document.getElementById("Instrucciones");
    const widgetEdit = new this.EsriExpand({
      view:this.mapView,
      mode:'floating',
      expandIconClass: 'esri-icon-cursor-marquee',
      expandTooltip:'Edición de campos',
      collapseIconClass:'esri-icon-close',
    })
    this.editWidget = widgetEdit;
    this.mapView.ui.add(widgetEdit, 'top-left');

    //Tipo: Eventos del widget Edit para
    //Objetivo: Edición del Grafico
    widgetEdit.watch('expanded', (expanded:any)=>{
      const widget = 'direXY';
      const oFeatureLayer:any = this.map.layers.getItemAt(2)
      var isGraphicsVisible = expanded;
      if (expanded){
       //--Almacenamos el Grafico por si se Cancela la Edición
       this.ptGraphicEdit = this.EsriGraphicsLayerEdit.graphics.items[0].clone();
       this.editSketch.update([this.EsriGraphicsLayerEdit.graphics.items[0]], {
         tool: "reshape",
         enableRotation: false,
         enableScaling: false,
         preserveAspectRatio: true,
         toggleToolOnClick: false
       });
       //this.homeService.setFormName('gis_edicion'); 
       this.editDivToolbar.style.display = 'block';
       this.setRefresh(this.EsriGraphicsLayerEdit.graphics.items[0].geometry.extent)
      }else{
       isGraphicsVisible = expanded
       this.editSketch.layer = this.ptGraphicLayerSelect;
       this.editDivToolbar.style.display = 'none';
       //--Activamos el mensaje de Edición
       if(this.EditProgress ===false){this.editSketch.cancel();}
      }
      if(oFeatureLayer !== undefined ){oFeatureLayer.visible=!isGraphicsVisible}
      this.EsriGraphicsLayerEdit.visible = isGraphicsVisible;
      this.EditProgress = false;
  })

    //----------------------------------------------
    // Sckech widget para Graphics Layer
    //----------------------------------------------  
    this.editSketch = new this.EsriSketch({
      view: this.mapView,
      layer: this.EsriGraphicsLayerEdit,
      creationMode: "update",
      defaultUpdateOptions:{
       enableRotation:false,
       enableScaling: false,
       toggleToolOnClick: false 
      }
    });
    
    //Tipo: Eventos del Sckech widget
    //Objetivo: Edición del Grafico
    this.editSketch.on("update", (event:any)=>{
      const eventInfo = event.toolEventInfo;
      //--Clonamos el Grafico
      const oGraphic = this.EsriGraphicsLayerEdit.graphics.items[0].clone();
      if (eventInfo && eventInfo.type == "move-stop") {
        this.editSketch.undo();
      }
      if (event.tool == 'transform' || event.tool == 'move'){
        if (event.state !='complete'){
          this.editSketch.update([oGraphic],{
            tool: "reshape",
            enableScaling: false,
            toggleToolOnClick: false
          });
          //--invocamos al zoom
          this.setRefresh(oGraphic.geometry.extent)
        }
      }else if(event.tool == 'reshape' && event.state =='complete'){
        //--actualizamos el Poligono del FeatureLayer Temporal
        let oFeatureLayer:any = this.map?.layers.getItemAt(2)
        //--Si Cancelo la Edición del Poligono
        if (event.aborted){
          //--Si el Poligono fue modificado debe volver a su forma original
          const oGraphicWeb = this.EsriGraphicsLayerEdit.graphics.items[0]
          oGraphicWeb.geometry = this.ptGraphicEdit.geometry;
          //this.homeService.setFormName('resultado_consulta');
        }else{
          //--OBJECTID del Poligono en el servicio de consulta
          const oObjectID = oGraphic.attributes.OBJECTID;
          const oSrid_inp = oGraphic.attributes.srid_inp;
          //--La geometria del Featurelayer temporal y del Servicio es WGS84LL
          oGraphic.geometry = this.EsriwebMercatorUtils.webMercatorToGeographic(oGraphic.geometry);
          oGraphic.attributes.OBJECTID=Number(oObjectID);
          //--activamos el spinner
          //this.spinner.show();
          oFeatureLayer.applyEdits({updateFeatures:[oGraphic]});
          //const srid_inp = this.listSrid.find(item => item.valor == oSrid_inp);
          //--Agregamos un segundo AppliedEdit por bugs
          oFeatureLayer.applyEdits({updateFeatures:[oGraphic]})
          //--Actualizamos el Servicio de Consultas
          //this.grabarConsulPoligono(oGraphic.geometry,true,srid_inp?.id,{OBJECTID:Number(oObjectID),srid_inp:oSrid_inp});
          //--Ocultamos ek Spinner
          //this.spinner.hide()
          //--Ativamos y Desactivamos capas
          this.EditProgress = true
          this.editWidget.expanded = false;
        }
      } 
    })
  }

  getMapProperties() {
    return {
      basemap: this.basemap,
      layers: this.layers,
      ground: 'world-elevation'
    };
  }

  getViewProperties(viewContainer: any, viewMap: any) {
    return {
      spatialReference: null,
      container: viewContainer,
      extent: this.getFullExtent(),
      map: viewMap
    };
  }

  getFullExtent() {
    return {
      xmin: -81.32823048999995,
      ymin: -18.35092773599996,
      xmax: -68.65227910299996,
      ymax: 0.038605967999949975,
      spatialReference: { wkid: 4326 }
    };
  }

  getPolygonSymbolQuery() {
    return {
      type: 'simple-fill',
      style: 'solid',
      color: this.globals.colorSelectMapFill,
      outline: {
        color: this.globals.colorSelectMap,
        width: 3
      }
    };
  }

  getLineSymbolQuery() {
    return {
      type: 'simple-line',
      style: 'solid',
      color: this.globals.colorSelectMap,
      width: 3
    };
  }

  getMarkerSymbolQuery() {
    return {
      type: 'simple-marker',
      style: 'circle',
      color: this.globals.colorSelectMapFill,
      size: '30px',
      outline: {
        color: this.globals.colorSelectMap,
        width: 3
      }
    };
  }

  addLocate(objView: any) {
    const compass = new this.EsriLocate({
      view: objView,
      label: 'Buscar mi ubicación'
    });
    objView.ui.add(compass, 'top-left');
  }

  addCompass(objView: any) {
    const compass = new this.EsriCompass({
      view: objView,
      label: 'Restablecer orientación de brújula'
    });
    objView.ui.add(compass, 'top-left');
  }

  addBasemapGallery(objView: any) {
    const basemapSource = this.basemapService.basemapsTiled;
    const basemapGallery = new this.EsriBasemapGallery({
      view: objView,
      source: basemapSource
    });
    const basemapGalleryExpand = new this.EsriExpand({
      autoCollapse: true,
      view: objView,
      content: basemapGallery,
      expanded: false,
      label: 'Galería Mapa Base',
      collapseTooltip: 'Galería Mapa Base',
      expandTooltip: 'Galería Mapa Base'
    });
    objView.ui.add(basemapGalleryExpand, 'top-left');
  }

  addListLayers(objView: any) {
    const layerList = new this.EsriLayerList({
      view: objView
    });
    const layerListExpand = new this.EsriExpand({
      autoCollapse: true,
      view: objView,
      content: layerList,
      expanded: false,
      label: 'Selector de capas',
      collapseTooltip: 'Selector de capas',
      expandTooltip: 'Selector de capas'
    });
    objView.ui.add(layerListExpand, 'top-left');
  }

  addLegend(objView: any) {
    const legend = new this.EsriLegend({
      view: objView
    });
    const legendExpand = new this.EsriExpand({
      autoCollapse: true,
      view: objView,
      content: legend,
      expanded: false,
      label: 'Leyenda',
      collapseTooltip: 'Leyenda',
      expandTooltip: 'Leyenda'
    });
    objView.ui.add(legendExpand, 'top-left');
  }

  addSearch(objView: any) {
    const search = new this.EsriSearch({
      view: objView
    });
    objView.ui.add(search, 'top-right');
  }

  AddScaleBar(objView: any) {
    const search = new this.EsriScaleBar({
      view: objView,
      unit: 'dual',
      container: 'div-scale-bar'
    });
    //objView.ui.add(search, 'bottom-left');
  }

  addCoordinateConversion(objView: any, div: any) {
    const coordConver = new this.EsriCoordinateConversion({
      view: objView,
      container: div
    });
    /* coordConver.formats.forEach(f => {
      if (f.name == 'xy') {
        f.name = 'Longitude, Latitude (WGS84)';
      } else if(f.name == 'basemap') {
        f.name = 'Basemap (Web Mercator)';
      }
      //console.log(f.name);
    }); */

    if (objView.type == '3d') {
      this.addFormatsCoordConver(coordConver);
    }
    //objView.ui.add(coordConver, 'bottom-left');
  }

  addFormatsCoordConver(coordConver: any) {
    const numberSearchPattern = /-?\d+[\.]?\d*/;
    const EsriwebMercatorUtils = this.EsriwebMercatorUtils;
    const EsriFormat = this.EsriFormat;
    const EsriConversion = this.EsriConversion;
    const EsriPoint = this.EsriPoint;
    const EsriSpatialReference = this.EsriSpatialReference
    const newFormat = new this.EsriFormat({
      // The format's name should be unique with respect to other formats used by the widget
      name: "XYZ",
      conversionInfo: {
        // Define a convert function
        // Point -> Position
        convert: function (point) {
          const returnPoint = point.spatialReference.isWGS84 ? point : EsriwebMercatorUtils.webMercatorToGeographic(point);
          // console.log('return point', returnPoint);
          const x = returnPoint.x.toFixed(4);
          const y = returnPoint.y.toFixed(4);
          const z = returnPoint.z.toFixed(4);
          // console.log(x + ',' + y);
          return {
            location: returnPoint,
            coordinate: `${x}, ${y}, ${z}`
          };
        },
        // Define a reverse convert function
        // String -> Point
        reverseConvert: function (string) {
          var parts = string.split(",");
          return new EsriPoint({
            x: parseFloat(parts[0]),
            y: parseFloat(parts[1]),
            z: parseFloat(parts[2]),
            spatialReference: { wkid: 4326 }
          });
        }
      },
      // Define each segment of the coordinate
      coordinateSegments: [
        {
          alias: "X",
          description: "Longitude",
          searchPattern: numberSearchPattern
        },
        {
          alias: "Y",
          description: "Latitude",
          searchPattern: numberSearchPattern
        },
        {
          alias: "Z",
          description: "Elevation",
          searchPattern: numberSearchPattern
        }
      ],
      defaultPattern: "X°, Y°, Z"
    });
    coordConver.formats.add(newFormat);
    const stateplaneCA = new EsriFormat({
      name: "SPS I",
      conversionInfo: {
        spatialReference: new EsriSpatialReference({ wkid: 102241 }),
        reverseConvert: function (string, format) {
          var parts = string.split(",");
          return new EsriPoint({
            x: parseFloat(parts[0]),
            y: parseFloat(parts[1]),
            spatialReference: { wkid: 102241 }
          });
        }
      },
      coordinateSegments: [
        {
          alias: "X",
          description: "easting",
          searchPattern: numberSearchPattern
        },
        {
          alias: "Y",
          description: "northing",
          searchPattern: numberSearchPattern
        }
      ],
      defaultPattern: "X, Y"
    });
    coordConver.formats.add(stateplaneCA);
    coordConver.conversions.splice(0, 0, new EsriConversion({ format: newFormat }), new EsriConversion({ format: stateplaneCA }));
  }

  setPopupLayers() {
    var measureThisAction = {
      title: "Ver detalle",
      id: "measure-this",
      image: "assets/images/pifa-icon.png"
    };
    var actionevent=[measureThisAction];
    //--

    this.mapLayers = [];
    this.map.layers.items.forEach((itemLayer: any, indexLayer: number) => {
      //console.log(itemLayer.title + '-' + itemLayer.id);
      itemLayer.when(() => {
        if (itemLayer.allSublayers === undefined){return}
        itemLayer.allSublayers.forEach((itemSublayer: any, indexSublayer: number) => {
          // console.log(itemLayer.title+'>'+(itemSublayer.parent.title===itemLayer.title?'':itemSublayer.parent.title+'>')+itemSublayer.title);
          // console.log(itemSublayer);
          // console.log(itemSublayer.layer);
          const title = itemLayer.title + '>' + (itemSublayer.parent.title === itemLayer.title ? '' : itemSublayer.parent.title + '>') + itemSublayer.title;
          //console.log(title);
          this.EsriRequest(itemSublayer.url + '?f=json', { responseType: 'json' }).then((result: any) => {
            //console.log(result.data.fields);
            if (result.data.fields !=null){
              if (result.data.fields.length > 0) {
                // console.log(itemLayer.id);
                //const pos = itemLayer.id.length - itemLayer.id.lastIndexOf('-') - 1;
                // console.log(pos);
                //const idService = itemLayer.id.substr(itemLayer.id.length - pos, pos);
                const idService = itemLayer.id;
                this.mapLayers.push(new MapLayer(idService, itemSublayer.id, title));
                console.log('[' + idService + '] - [' + itemSublayer.id + '] ' + title);
              }
              const popupContent = {
                title: title,
                content: [{ type: 'fields', fieldInfos: [] }, { type: 'media', mediaInfos: [] }],
                actions: actionevent
              };
              result.data.fields.forEach((field: any) => {
                if (field.type !== 'esriFieldTypeOID' && field.type !== 'esriFieldTypeGeometry' &&
                  field.type !== 'esriFieldTypeBlob' && field.type !== 'esriFieldTypeRaster' &&
                  field.type !== 'esriFieldTypeGUID' && field.type !== 'esriFieldTypeGlobalID' &&
                  field.type !== 'esriFieldTypeXML') {
                  if (field.alias.toUpperCase().substr(0, 10) === 'FOTOGRAFÍA') {
                    popupContent.content[1].mediaInfos.push({
                      type: 'image',
                      title: field.alias,
                      value: {
                        sourceURL: '{' + field.name + '}'
                      }
                    });
                  } else if (field.alias.toUpperCase() !== 'OBJECTID') {
                    if (field.type === 'esriFieldTypeDate') {
                      popupContent.content[0].fieldInfos.push({
                        label: field.alias + ': ',
                        fieldName: field.name,
                        format: {
                          dateFormat: 'day-short-month-year'
                        }
                      });
                    } else {
                      popupContent.content[0].fieldInfos.push({
                        label: field.alias + ': ',
                        fieldName: field.name
                      });
                    }
                  }
                }
              });
              if (!itemLayer.popupTemplate) {
                itemSublayer.popupTemplate = popupContent;
              }
            }              
          });
        });
      });
    });
  }

  async Search(where: string, featureLayer:any, geometryType: string) {
    try {
      const symbol = this.getSymbolFeature(geometryType);
      //const featureLayer = this.getFeatureLayer(nameLayer);
      const layerGraphic = this.getLayerSearch();
      const features: any[] = await this.getFeaturesQuery(where, featureLayer, symbol);
      layerGraphic.addMany(features);
      return features;
    } catch (e) {
       return [];
    }
  }

  cleanSearch() {
    const layerGraphic = this.getLayerSearch();
    layerGraphic.removeAll();
  }

  zoomGraphics() {
    const duration = 5000;
    const animate = true;
    const easing = 'ease-in-out';
    const scale = 5000;
    const options = { animate: animate, duration: duration, easing: easing };
    const layerGraphic = this.getLayerSearch();
    const targetPoint = { target: layerGraphic.graphics, scale: scale };
    const view = this.activeView;
    //view.goTo(this.getFullExtent(), options);
    if (layerGraphic.graphics.length === 1) {
      const graphic = layerGraphic.graphics.items[0];
      if (graphic.geometry.type === 'point') {
        view.goTo(targetPoint, options).then(() => { view.extent = view.extent.clone().expand(1.0); });
      } else {
        view.goTo(layerGraphic.graphics, options).then(() => { view.extent = view.extent.clone().expand(1.0); });
      }
    } else {
      view.goTo(layerGraphic.graphics, options).then(() => { view.extent = view.extent.clone().expand(1.0); });
    }
  }

  getLayerSearch() {
    // const index = this.map.layers.length - (this.isAddWMS ? 2 : 1);
    // return this.map.layers.getItemAt(index);
    return this.layersService.searchLayer;
  }

  getFeatureLayer(nameLayer: string) {
    let idService = '';
    let idLayerService = -1;
    this.mapLayers.forEach((mapLayer) => {
      if (mapLayer.name === nameLayer) {
        idService = mapLayer.idService;
        idLayerService = mapLayer.idLayerService;
        return false;
      }
      return true;
    });
    //console.log('[' + idService + '] - [' + idLayerService + ']');
    const mapLayer = this.map.findLayerById(idService);
    //console.log(mapLayer.url);
    mapLayer.visible = true;
    return mapLayer.findSublayerById(idLayerService);
  }

  async getFeaturesQuery(where: string, featureLayer: any, symbol: any) {
    //console.log('getFeaturesQuery');
    //console.log(featureLayer);
    var features: any[] = [];
    var query = featureLayer.createQuery();
    query.where = where;
    query.returnGeometry = true;
    query.outFields = ['*'];
    // console.log(query);
    await featureLayer.queryFeatures(query).then(function (result:any) {
      // console.log(result.features);
      features = result.features.map((feacture:any) => {
        const f = feacture.clone();
        f.symbol = symbol;
        return f;
      });
    });
    return features;
  }

  getSymbolFeature(geometryType:any) {
    //console.log(geometryType);
    switch (geometryType) {
      case 'point':
        return this.getMarkerSymbolQuery();
      case 'multipoint':
        return this.getMarkerSymbolQuery();
      case 'polyline':
        return this.getLineSymbolQuery();
      case 'polygon':
        return this.getPolygonSymbolQuery();
      case 'multipatch':
        return this.getPolygonSymbolQuery();
      default:
          return this.getMarkerSymbolQuery();
    }
  }

  InvisibleAllLayer() {
    for (var _i = 0; _i < this.map.layers.length; _i++) {
      const layer = this.map.layers.getItemAt(_i);
      layer.visible = false;
    }
    this.getLayerSearch().visible = true;
    this.getLayerStreetView().visible = this.activeStreet;
  }

  setActiveView(activeView: number) {
    if (activeView === 2) {
      this.activeView = this.mapView;
      this.areaButton2D.style.display = "block";
      this.distanceButton2D.style.display = "block";
      this.areaButton3D.style.display = "none";
      this.distanceButton3D.style.display = "none";
      this.printButton2D.style.display = "block";
      this.printSeparator2D.style.display = "block";
    } else if (activeView === 3) {
      this.activeView = this.sceneView;
      this.areaButton2D.style.display = "none";
      this.distanceButton2D.style.display = "none";
      this.areaButton3D.style.display = "block";
      this.distanceButton3D.style.display = "block";
      this.printButton2D.style.display = "none";
      this.printSeparator2D.style.display = "none";
    }
  }

  setActiveWidget(type: string) {
    //console.log('setActiveWidget:' + type);
    this.clearActiveWidget();
    const typeMap = this.activeView.type.toUpperCase();
    if (typeMap == '2D') {
      switch (type) {
        case "distance":
          this.activeWidget2D = new this.EsriDistanceMeasurement2D({
            view: this.activeView
          });
          this.activeWidget2D.viewModel.newMeasurement();
          this.activeView.ui.add(this.activeWidget2D, "bottom-right");
          break;
        case "area":
          this.activeWidget2D = new this.EsriAreaMeasurement2D({
            view: this.activeView
          });
          this.activeWidget2D.viewModel.newMeasurement();
          this.activeView.ui.add(this.activeWidget2D, "bottom-right");
          break;
        case "print":
          const print = new this.EsriPrint({
            view: this.activeView,
            printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
          });
          this.activeWidget2D = print;
          this.activeView.ui.add(this.activeWidget2D, "bottom-right");
          this.Esriconfig.request.interceptors.push({
            urls: print.printServiceUrl,
            // use the AfterInterceptorCallback to interogate the exportedLinks property
            after: function(response:any) {
              //console.log("exportedLinks: ", print.exportedLinks.items[0]);
            }
          });
          break;
      }
    } else if (typeMap == '3D') {
      switch (type) {
        case "distance":
          this.activeWidget3D = new this.EsriDirectLineMeasurement3D({
            view: this.activeView
          });
          this.activeWidget3D.viewModel.newMeasurement();
          this.activeView.ui.add(this.activeWidget3D, "bottom-right");
          break;
        case "area":
          this.activeWidget3D = new this.EsriAreaMeasurement3D({
            view: this.activeView
          });
          this.activeWidget3D.viewModel.newMeasurement();
          this.activeView.ui.add(this.activeWidget3D, "bottom-right");
          break;
      }
    }
    if (type == 'streetview') {
      this.activeStreet = true;
      this.getLayerStreetView().visible = true;
    }
    if (type == 'popupview') {
      this.activePopup = true;
      this.activeView.popup.autoOpenEnabled = true;
    }
    this.setActiveButton(type);
  }

  clearActiveWidget() {
    this.getLayerStreetView().visible = false;
    this.activeView.popup.autoOpenEnabled = false;
    this.activeStreet = false;
    this.activePopup = false;
    this.clearActiveButton();
    if (this.activeWidget2D) {
      this.activeView.ui.remove(this.activeWidget2D);
      this.activeWidget2D.destroy();
      this.activeWidget2D = null;
    }
    if (this.activeWidget3D) {
      this.activeView.ui.remove(this.activeWidget3D);
      this.activeWidget3D.destroy();
      this.activeWidget3D = null;
    }
  }

  clearActiveButton() {
    this.distanceButton2D.classList.remove("active");
    this.areaButton2D.classList.remove("active");
    this.distanceButton3D.classList.remove("active");
    this.areaButton3D.classList.remove("active");
    this.streetViewButton.classList.remove("active");
    this.popupViewButton.classList.remove("active");
    this.printButton2D.classList.remove("active");
  }

  setActiveButton(type: string) {
    this.clearActiveButton();
    const typeMap = this.activeView.type.toUpperCase();
    if (typeMap == '2D') {
      if (type == 'distance') {
        this.distanceButton2D.classList.add("active");
      } else if (type == 'area') {
        this.areaButton2D.classList.add("active");
      } else if (type == 'print') {
        this.printButton2D.classList.add("active");
      }
    } else if (typeMap == '3D') {
      if (type == 'distance') {
        this.distanceButton3D.classList.add("active");
      } else if (type == 'area') {
        this.areaButton3D.classList.add("active");
      }
    }
    if (type == 'streetview') {
      this.streetViewButton.classList.add("active");
    }
    if (type == 'popupview') {
      this.popupViewButton.classList.add("active");
    }
  }
  //------------------------------------------------------------------------------------------------------
  // Desc. fn: Evento Clic del Mapa
  // Params: id del poligono
  //------------------------------------------------------------------------------------------------------
  eventClickMap(event:any) {    
    event.stopPropagation(); // Previene el comportamiento predeterminado del clic derecho 
    let pointGraphic = arcgis.webMercatorUtils.webMercatorToGeographic(event.mapPoint);
    if (this.ptEditTool.name=='select'){
        this.ptGraphicSelect = null;
        this.ptGraphicSelect = this.ptGraphicsLayerEdit.graphics.filter((item:any)  =>{
          item.symbol = this.globals.symbolEditFill;
          if(this.EsriGeometryEngine.intersects(item.geometry,pointGraphic)){
            item.symbol = this.globals.symbolSelectFill;
            return item.geometry;
          }
       });
       if (event.button==2) {
        event.preventDefault(); // Evita el menú contextual del navegador
        if (this.ptGraphicSelect.length==0){console.log('No selecciono un poligono'); return}
        const screenPoint = event.screenPoint;
        this.editDivMenu.style.left = `${screenPoint.x}px`;
        this.editDivMenu.style.top = `${screenPoint.y}px`;
        this.editDivMenu.style.display = 'block';
       }      
    }  

    //console.log('eventClickMap');
    if (this.activePopup) {
      // this.activeView.popup.location = event.mapPoint;
      // this.activeView.popup.visible = true;
    } else if (this.activeStreet) {
      //console.log('eventClickMap');
      const position = { lat: event.mapPoint.latitude, lng: event.mapPoint.longitude };
      this.positionStreet = position;
      this.UpdatePositionStreet();
      this.changePositionStreet$.next(this.positionStreet);
    }
  }

  async eventAction(event:any){
    console.log(event);
    if (this.mapView.popup.title =='Conflictos Socioambientales>Espacios de Diálogo>Mesas de diálogo'){
      let codCSA = this.mapView.popup.selectedFeature.attributes['COD_CASO'];
      this.emissonService.send("CONF", ["5", codCSA])
    }
    //title=='Conflictos Socioambientales>Espacios de Diálogo>Mesas de diálogo'
  }
  async getScreenShot(){
   return await this.activeView.takeScreenshot({
      format: "jpg",
      quality: 70
    });
  }
  async eventPointerMove(event:any) {
    var coordStatusMap = this.coordStatusMap;
    var point = this.activeView.toMap({x: event.x, y: event.y});
    var zone = 18;
    coordStatusMap.longitude = point.longitude.toFixed(6);
    coordStatusMap.latitude = point.latitude.toFixed(6);
    if (point.hasZ) {
      coordStatusMap.height = point.z.toFixed(2);
    } else {
      coordStatusMap.height = 0;
    }
    var geomSer = new this.EsriGeometryService();
    geomSer.url = 'https://pifa.oefa.gob.pe/arcgis/rest/services/Utilities/Geometry/GeometryServer';
    var params1 = new this.EsriProjectParameters({
      geometries: [point],
      outSpatialReference: new this.EsriSpatialReference({ wkid: 4326 })
    });
    await geomSer.project(params1).then(function(results:any) {
      //console.log(results[0].x);
      coordStatusMap.longitude = results[0].x.toFixed(6);
      coordStatusMap.latitude = results[0].y.toFixed(6);
    },function(error:any){
      //console.log(error);
    });
    zone = Math.floor((coordStatusMap.longitude + 180.0) / 6) + 1;
    zone = 30 + zone;
    //console.log(zone);
    coordStatusMap.zoneUTM = zone;
    var wkid = 32700 + zone;
    var params2 = new this.EsriProjectParameters({
      geometries: [point],
      outSpatialReference: new this.EsriSpatialReference({ wkid: wkid })
    });
    await geomSer.project(params2).then(function(results) {
      //console.log(results[0].x);
      coordStatusMap.xUTM = results[0].x.toFixed(0);
      coordStatusMap.yUTM = results[0].y.toFixed(0);
    },function(error){
      //console.log(error);
    });
  }

  getLayerStreetView() {
    // const index = this.map.layers.length - (this.isAddWMS ? 3 : 2);
    // return this.map.layers.getItemAt(index);
    return this.layersService.streetViewLayer;
  }

  clearStreet() {
    //this.changePositionStreet$.next();
  }

  getStreet(): Observable<GoogleMapPosition> {
    return this.changePositionStreet$.asObservable();
  }

  UpdatePositionStreet() {
    //console.log('setPositionStreet');
    const typeMap = this.activeView.type.toUpperCase();
    const layer = this.getLayerStreetView();
    layer.graphics.removeAll();

    let point;
    if (typeMap == '2D') {
    } else if (typeMap == '3D') {
    }

    point = {
      type: 'point',
      longitude: this.positionStreet.lng,
      latitude: this.positionStreet.lat
    };

    const textSymbol = {
      angle: this.povStreet.heading,
      type: 'text',
      color: [30, 133, 190],
      text: '\ue903',
      font: {
        size: 20,
        family: 'CalciteWebCoreIcons'
      }
    };
    const pointGraphic = new this.EsriGraphic({
      geometry: point,
      symbol: textSymbol
    });

    layer.graphics.push(pointGraphic);
  }

  zoomStreet() {
    const view = this.activeView;
    const layerGraphic = this.getLayerStreetView();
    const duration = 5000;
    const animate = true;
    const easing = 'ease-in-out';
    const scale = 5000;
    const options = { animate: animate, duration: duration, easing: easing };
    const targetPoint = { target: layerGraphic.graphics.getItemAt(0), scale: scale };
    view.goTo(targetPoint, options).then(() => { view.extent = view.extent.clone().expand(1.2); });
  }

  async addWMS(url: string) {
    //console.log('addWMS');
    let blnError = false;
    let strErrorMessage = '';
    this.clearWMS();
    const layerWMS = new this.EsriWMSLayer({
      url: url
    });
    await layerWMS.load()
      .then(function () {
      })
      .catch(function (error:any) {
        blnError = true;
        strErrorMessage = error.message;
        //console.log('Error load LayerWMS');
        //console.log(error);
      });
    if (!blnError) {
      this.map.layers.add(layerWMS);
      this.isAddWMS = true;
    } else {
      //this.alertService.sendMessageDanger('Agregando WMS','No se cargo WMS debido al siguiente error: ' + strErrorMessage);
      this.isAddWMS = false;
    }
  }

  clearWMS() {
    if (this.isAddWMS) {
      this.map.layers.removeAt(this.map.layers.length - 1);
      this.isAddWMS = false;
    }
  }

  printAddClear(print:any) {

  }

  async setRefresh(extent:any){
    var opts = {
      duration: 2000  // Duration of animation will be 5 seconds
    };
    //await this.mapView?.setscale=24000;
    await this.mapView.goTo({
      target: extent.center,
      zoom:this.mapView.zoom-2
    }, opts);
  }

  async setFilterLayers(){
    let strQuery = "TXT_EMPRESA_RUC='" + this.SisListaRuc + "'"
    this.SislistaLayer[0].layer.definitionExpression = strQuery
    this.SislistaLayer[1].layer.definitionExpression = strQuery
    this.SislistaLayer[2].layer.definitionExpression = strQuery
  }

  async setZoomToExtentLayer(item:any){
    let strQuery = "TXT_EMPRESA_RUC='" + this.SisListaRuc + "'"
    //--Definimos la Visulización de la extensión de la Empresa
    const oFeatureLayer = new this.EsriFeatureLayer({
      url: this.SislistaLayer[item].layer.url
    });
    const query = oFeatureLayer.createQuery();
          query.where = strQuery;
    oFeatureLayer.queryExtent(query).then(results => {
      this.mapView.goTo(results.extent);// 
    }); 
  }

  async getListField(){
    let oListaFields = [];
    let strQuery = "TXT_EMPRESA_RUC='" + this.SisListaRuc + "'"
    let geometryType = "polygon"
    const symbol = this.getSymbolFeature(geometryType);
    const features = await this.getFeaturesQuery(strQuery, this.SislistaLayer[0].layer, geometryType);
    await arcgis.Projection.load();

    //--Recorremos los Registros
    features.forEach(f => {
      let outSpatialReference = new arcgis.SpatialReference({
        wkid: 32618 //UTM Zona 18 projection
      });
      let ProjetShape = arcgis.Projection.project(f.geometry, outSpatialReference);
      let itemField={}
          itemField['IDE_EMPRESA'] = f.attributes.IDE_EMPRESA
          itemField['IDE_FUNDO'] = f.attributes.IDE_FUNDO
          itemField['IDE_CAMPO'] = f.attributes.IDE_CAMPO
          itemField['NOMBRE_EMPRESA'] = f.attributes.TXT_EMPRESA_NOMBRE
          itemField['NOMBRE_FUNDO'] = f.attributes.TXT_FUNDO_NOMBRE
          itemField['NOMRE_CAMPO'] = f.attributes.TXT_CAMPO_NOMBRE
          itemField['SUPERFICIE'] = (ProjetShape['extent'].width * 0.0001).toFixed(5); //Hectareas
      oListaFields.push(itemField)
     });
    return oListaFields
  }

  async setDeleteFeature(): Promise<void> { 
    let deleteEdits:any
    let addEdits:any

    this.ptFeatureLayerEdit.queryFeatures().then(async(results) => {
      //--edits object tells apply edits that you want to delete the features
      deleteEdits = {
        deleteFeatures: results.features
      };
      //--Obtenemos los Features que se van agregar
      addEdits = {
        addFeatures: this.ptGraphicsLayerEdit.graphics
      };
      //--activamos el spinner
      //this.spinner.show();
      this.showSwalUtil('Realizando copia de Campos...')
      await this.ptFeatureLayerEdit.applyEdits(deleteEdits);
      this.showSwalUtil('Actualizando geometría de Campos...')
      await this.ptFeatureLayerEdit.applyEdits(addEdits);
      Swal.close();
      //--Ocultamos el Spinner
      //this.spinner.hide()
     });
  }
  async refresh(extent:any){
    var opts = {
      duration: 2000  // Duration of animation will be 5 seconds
    };
    await this.mapView.goTo({
      target: extent.center,
      //zoom:this.mapView.zoom
    }, opts);
  }
  showSwalUtil(mensaje:string){
    SwalUtil.loading('',mensaje,()=>{
      window.location.reload();
      console.log('cerrado');
    });
   }
   showConsoleLog(mensaje:any){
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19);
      console.log(localISOTime, ' '+mensaje);
   }
 }
