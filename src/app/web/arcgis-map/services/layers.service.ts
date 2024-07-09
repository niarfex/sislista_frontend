import { Injectable } from '@angular/core';

export class layerService {
  title: string=''
  url: string=''
  visible: boolean=false
}

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  layers: any[]=[];
  private layersService: layerService[] = [];
  streetViewLayer: any;
  searchLayer: any;
  // variables de ESRI
  EsriMapImageLayer: any;
  EsriFeatureLayer: any;
  EsriGraphicsLayer: any;
  EsriRequest: any;

  constructor() {
  }

  async getLayers() {
      await this.loadLayers();
      this.streetViewLayer = new this.EsriGraphicsLayer({
        title: 'Street View',
        listMode: 'hide',
        visible: false
      });
      this.layers.push(this.streetViewLayer);
      console.log('Street View-' + true);
      this.searchLayer = new this.EsriGraphicsLayer({
        title: 'Elementos Encontrados',
        listMode: 'hide',
        visible: true
      });
      this.layers.push(this.searchLayer);
      console.log('Elementos Encontrados-' + true);
    return this.layers;
  }

  async loadLayers() {
    let NOM_SERV = "SISLISTA"
    let URL_SERV = "https://winlmprap24.midagri.gob.pe/arcgis_server/rest/services/SIG_SISLISTA/SISLISTA/MapServer"
    let VISIBLE = '1'
     const validate: boolean = await this.validateLayer(NOM_SERV, URL_SERV);
     console.log(NOM_SERV + '-' + validate);
     if (validate) {
       const layer = new this.EsriMapImageLayer({
         title: NOM_SERV,
         url: URL_SERV,
         visible: VISIBLE === '1' ? true : false
       });
      this.layers.push(layer);  

     NOM_SERV = "Campos"
     URL_SERV = "https://winlmprap24.midagri.gob.pe/arcgis_server/rest/services/SIG_SISLISTA/SISLISTA/FeatureServer/2"
     VISIBLE = '1';
     const layer2 = new this.EsriFeatureLayer({
          title: NOM_SERV,
           url: URL_SERV,
           visible: VISIBLE === '1' ? true : false
     });
     layer2.opacity = 0.5;
     this.layers.push(layer2); 
   }
 }

 async validateLayer(nombre: string, url: string) {
  let validate = true;
  await this.EsriRequest(url + '?f=json' , {
    responseType: "json"
  }).then((response:any) => {
  }).catch((error:any) => {
    validate = false;      
  });
  return validate;
  }
}


