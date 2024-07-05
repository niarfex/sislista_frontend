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
      /*const validate: boolean = await this.validateLayer(layerService.NOM_SERV, layerService.URL_SERV);
      console.log(layerService.NOM_SERV + '-' + validate);
      if (validate) {
        const layer = new this.EsriMapImageLayer({
          title: layerService.NOM_SERV,
          url: layerService.URL_SERV,
          visible: layerService.VISIBLE === '1' ? true : false
        });
        this.layers.push(layer);  
    }*/
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


