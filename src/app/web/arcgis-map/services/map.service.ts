import { Injectable } from '@angular/core';
import { BasemapCollectionService } from './BasemapCollection.service';
import { LayersService } from './layers.service';
import { MapLayer } from '../models/maplayer.model';
import { GoogleMapPosition, GoogleMapPov } from '../models/googlemaps.model';
import { GlobalsService } from './globals.service';
import { async } from '@angular/core/testing';
import { Subject, Observable } from 'rxjs';
import { CoordinatesStatusMap } from '../models/general.model';
import { EmissionService } from './emission.service';
import { url } from 'inspector';

import EsriMap from "@arcgis/core/Map.js";
import EsriMapView from "@arcgis/core/views/MapView.js";
import EsriSceneView from "@arcgis/core/views/SceneView.js";
import EsriSpatialReference from "@arcgis/core/geometry/SpatialReference";
import EsriExpand from "@arcgis/core/widgets/Expand";
import EsriBasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import EsriLayerList from "@arcgis/core/widgets/LayerList";
import EsriLegend from "@arcgis/core/widgets/Legend";
import EsriTileLayer from "@arcgis/core/layers/TileLayer";
import EsriMapImageLayer from "@arcgis/core/layers/MapImageLayer";
import EsriGraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import EsriCompass from "@arcgis/core/widgets/Compass";
import EsriRequest from "@arcgis/core/request";
import EsriLocate from "@arcgis/core/widgets/Locate";
import EsriDistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import EsriAreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import EsriDirectLineMeasurement3D from "@arcgis/core/widgets/DirectLineMeasurement3D";
import EsriAreaMeasurement3D from "@arcgis/core/widgets/AreaMeasurement3D";
import EsriGraphic from "@arcgis/core/Graphic";
import EsriWMSLayer from "@arcgis/core/layers/WMSLayer";
import EsriCoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
import EsriFormat from "@arcgis/core/widgets/CoordinateConversion/support/Format";
import EsriConversion from "@arcgis/core/widgets/CoordinateConversion";
import EsriwebMercatorUtils from "@arcgis/core/widgets/CoordinateConversion/support/Conversion";
import EsriPoint from "@arcgis/core/geometry/Point";
import * as Esriprojection from "@arcgis/core/geometry/projection";
import EsriPrint from "@arcgis/core/widgets/Print";
import EsriSearch from "@arcgis/core/widgets/Search";
import * as EsriGeometryService from "@arcgis/core/rest/geometryService";
import * as EsriProjectParameters from "@arcgis/core/rest/support/ProjectParameters";
import EsriScaleBar from "@arcgis/core/widgets/ScaleBar";
import Esriconfig from "@arcgis/core/config";
import EsriCustomContent from "@arcgis/core/popup/content/CustomContent";

@Injectable({
  providedIn: 'root'
})

export class MapService {
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
  EsriGraphicsLayer: any;
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

  constructor(private emissonService: EmissionService, private basemapService: BasemapCollectionService, private layersService: LayersService, private globals: GlobalsService) {
    this.coordStatusMap = {zoneUTM: 18, xUTM: 0, yUTM: 0, latitude: 0, longitude: 0, height: 0};
  }

  async startMap(divMapView: any, divSceneView: any) {    
        this.EsriMap = EsriMap;
        this.EsriMapView = EsriMapView;
        this.EsriSceneView = EsriSceneView;
        this.EsriSpatialReference = EsriSpatialReference;
        this.EsriExpand = EsriExpand;
        this.EsriBasemapGallery = EsriBasemapGallery;
        this.EsriLayerList = EsriLayerList;
        this.EsriLegend = EsriLegend;
        this.EsriTileLayer = EsriTileLayer;
        this.EsriMapImageLayer = EsriMapImageLayer;
        this.EsriGraphicsLayer = EsriGraphicsLayer;
        this.EsriCompass = EsriCompass;
        this.EsriRequest = EsriRequest;
        this.EsriLocate = EsriLocate;
        this.EsriDistanceMeasurement2D = EsriDistanceMeasurement2D;
        this.EsriAreaMeasurement2D = EsriAreaMeasurement2D;
        this.EsriDirectLineMeasurement3D = EsriDirectLineMeasurement3D;
        this.EsriAreaMeasurement3D = EsriAreaMeasurement3D;
        this.EsriGraphic = EsriGraphic;
        this.EsriWMSLayer = EsriWMSLayer;
        this.EsriCoordinateConversion = EsriCoordinateConversion;
        this.EsriFormat = EsriFormat;
        this.EsriConversion = EsriConversion;
        this.EsriwebMercatorUtils = EsriwebMercatorUtils;
        this.EsriPoint = EsriPoint;
        this.Esriprojection = Esriprojection;
        this.EsriPrint = EsriPrint;
        this.EsriSearch = EsriSearch;
        this.EsriGeometryService = EsriGeometryService;
        this.EsriProjectParameters = EsriProjectParameters;
        this.EsriScaleBar = EsriScaleBar;
        this.Esriconfig = Esriconfig;
        this.EsriCustomContent = EsriCustomContent;

        // iniciar constantes
        this.isAddWMS = false;
        this.activePopup = false;
        this.activeStreet = false;
        this.basemap = this.basemapService.getTopo();
        this.spatialReference = new EsriSpatialReference({ wkid: 102100 });
        this.layersService.EsriMapImageLayer = this.EsriMapImageLayer;
        this.layersService.EsriGraphicsLayer = this.EsriGraphicsLayer;
        this.layersService.EsriRequest = this.EsriRequest;
        this.layers = await this.layersService.getLayers();
        console.log(this.layers);

        this.coordStatusMap = {zoneUTM: 18, xUTM: 0, yUTM: 0, latitude: 0, longitude: 0, height: 0};

        this.map = new this.EsriMap(this.getMapProperties());
        //console.log('loading map');
        

        const mapViewProperties = this.getViewProperties(divMapView, this.map);
        this.mapView = new this.EsriMapView(mapViewProperties);
        this.mapView.on('click', (event) => { this.eventClickMap(event); });
        this.mapView.on('pointer-move', (event) => { this.eventPointerMove(event); });
               
        //--FCF: Opción para disparar en caso se envie el codigo de Conflicto
        this.mapView.whenLayerView(this.layers[6]).then((layerView) => {
          //--Obtenemos los datos del URL para realizar la busqueda de los datos
          const currentUrl = window.location.search
          var urlDict = {}
          currentUrl.substr(1).split("&").forEach(function(item){
            urlDict[item.split("=")[0].toLowerCase()] = item.split("=")[1]
          });
          if (urlDict.hasOwnProperty('cod')){
              console.log(urlDict['cod']);
              this.emissonService.send("CONF", ["5", urlDict['cod']])
            }    
        });

        const sceneViewProperties = this.getViewProperties(divSceneView, this.map);
        this.sceneView = new EsriSceneView(sceneViewProperties);
        this.sceneView.on('click', (event) => { this.eventClickMap(event); });
        this.sceneView.on('pointer-move', (event) => { this.eventPointerMove(event); });

        this.activeView = this.mapView;

        this.addCompass(this.mapView);
        this.addLocate(this.mapView);
        this.addBasemapGallery(this.mapView);
        this.addListLayers(this.mapView);
        this.addLegend(this.mapView);
        //this.addSearch(this.mapView);
        this.AddScaleBar(this.mapView);
        //this.addCoordinateConversion(this.mapView, 'div-coord-conver-2D');


        this.addLocate(this.sceneView);
        this.addBasemapGallery(this.sceneView);
        this.addListLayers(this.sceneView);
        this.addLegend(this.sceneView);
        //this.addSearch(this.sceneView);
        //this.AddScaleBar(this.sceneView);
        //this.addCoordinateConversion(this.sceneView, 'div-coord-conver-3D');

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

  async Search(where: string, nameLayer: string, geometryType: string) {
    try {
      //console.log('Search');
      //console.log(where);
      // console.log(nameLayer);
      // console.log(geometryType);
      const symbol = this.getSymbolFeature(geometryType);
      const featureLayer = this.getFeatureLayer(nameLayer);
      const layerGraphic = this.getLayerSearch();
      // console.log(featureLayer);
      const features: any[] = await this.getFeaturesQuery(where, featureLayer, symbol);
      //console.log(features);
      layerGraphic.addMany(features);
      // this.mapView.goTo(features, {duration: 0});
      // console.log('setSearch');
      // console.log(features);
      return features;
    } catch (e) {
      //console.log(e);
      //console.log('Layer: ' + nameLayer + " Where: " + where);
      //this.alertService.sendMessageDanger('Buscando el mapa', 'No hubo exito en la ejecución de la sentencia ' + where + ' en la capa ' + nameLayer);
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

  eventClickMap(event:any) {
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
}
