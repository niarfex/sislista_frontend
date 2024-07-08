import { Injectable } from '@angular/core';

//--ArcGIS SDk
import EsriBasemap from "@arcgis/core/Basemap";
import EsriTileLayer from "@arcgis/core/layers/TileLayer";
import EsriWebTileLayer from "@arcgis/core/layers/WebTileLayer";
import OpenStreetMapLayer from "@arcgis/core/layers/OpenStreetMapLayer";


@Injectable({
  providedIn: 'root'
})
export class BasemapCollectionService {
  basemapsTiled: any[];
  basemapsTiled3D: any[];
  spatialReference: any;

  EsriBasemap: any;
  EsriTileLayer: any;
  EsriWebTileLayer: any;
  OpenStreetMapLayer: any;

  constructor() {  
        this.EsriBasemap = EsriBasemap;
        this.EsriTileLayer = EsriTileLayer;
        this.EsriWebTileLayer = EsriWebTileLayer;
        this.OpenStreetMapLayer = OpenStreetMapLayer;
        this.basemapsTiled = [];
        this.basemapsTiled.push(this.getSatellite());
        this.basemapsTiled.push(this.getHybrid());
        this.basemapsTiled.push(this.getStreet());
        this.basemapsTiled.push(this.getTopo());
        this.basemapsTiled.push(this.getLightGrayCanvas());
        this.basemapsTiled.push(this.getDarkGrayCanvas());
        this.basemapsTiled.push(this.getNationalGeographic());
        this.basemapsTiled.push(this.getOceans());
        this.basemapsTiled.push(this.getOpenStreetMap());
        this.basemapsTiled.push(this.getLabelTerrain());
        this.basemapsTiled.push(this.getGoogleSatellite());
        this.basemapsTiled.push(this.getGoogleMaps());
        this.basemapsTiled.push(this.getGoogleTraffic());
        this.basemapsTiled3D = [];
        this.basemapsTiled3D.push(this.getSatellite());
        this.basemapsTiled3D.push(this.getHybrid());
        this.basemapsTiled3D.push(this.getStreet());
        this.basemapsTiled3D.push(this.getTopo());
        this.basemapsTiled3D.push(this.getLightGrayCanvas());
        this.basemapsTiled3D.push(this.getDarkGrayCanvas());
        this.basemapsTiled3D.push(this.getNationalGeographic());
        this.basemapsTiled3D.push(this.getOceans());
        this.basemapsTiled3D.push(this.getOpenStreetMap());
        this.basemapsTiled3D.push(this.getLabelTerrain());
  }

  getStreet() {
    return new this.EsriBasemap({
      id: 'street',
      baseLayers: new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
      }),
      thumbnailUrl: 'assets/images/basemap/street.jpg',
      title: 'Calles'
    });
  }

  getSatellite() {
    return new this.EsriBasemap({
      id: 'satellite',
      baseLayers: new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      }),
      thumbnailUrl: 'assets/images/maps/basemap/satellite.jpg',
      title: 'Imágenes'
    });
  }

  getHybrid() {
    return new this.EsriBasemap({
      id: 'hybrid',
      baseLayers: [new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      }), new this.EsriTileLayer({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
        isReference: true,
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7]
      })
      ],
      thumbnailUrl: 'assets/images/maps/basemap/hybrid.jpg',
      title: 'Híbrido de imágenes'
    });
  }

  getLightGrayCanvas() {
    return new this.EsriBasemap({
      id: 'light-gray-canvas',
      baseLayers: [new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
      }), new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer'
      })],
      thumbnailUrl: 'assets/images/maps/basemap/light-gray-canvas.jpg',
      title: 'Lona gris claro'
    });
  }

  getDarkGrayCanvas() {
    return new this.EsriBasemap({
      id: 'dark-gray-canvas',
      baseLayers: [new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer'
      }), new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer'
      })],
      thumbnailUrl: 'assets/images/maps/basemap/dark-gray-canvas.jpg',
      title: 'Lona gris Oscuro'
    });
  }

  getNationalGeographic() {
    return new this.EsriBasemap({
      id: 'national-geographic',
      baseLayers: new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/'
      }),
      thumbnailUrl: 'assets/images/maps/basemap/national-geographic.jpg',
      title: 'Mapa de estilo National Geographic'
    });
  }

  getOceans() {
    return new this.EsriBasemap({
      id: 'oceans',
      baseLayers: [new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer'
      }), new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer'
      })],
      thumbnailUrl: 'assets/images/maps/basemap/oceans.jpg',
      title: 'Océanos'
    });
  }

  getOpenStreetMap() {
    return new this.EsriBasemap({
      id: 'openstreetmap',
      baseLayers: new this.OpenStreetMapLayer(),
      thumbnailUrl: 'assets/images/maps/basemap/openstreetmap.jpg',
      title: 'OpenStreetMap'
    });
  }

  getLabelTerrain() {
    return new this.EsriBasemap({
      id: 'label-terrain',
      baseLayers: [new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer'
      }), new this.EsriTileLayer({
        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer'
      })],
      thumbnailUrl: 'assets/images/maps/basemap/label-terrain.jpg',
      title: 'Terreno con etiquetas'
    });
  }

  getTopo() {
    return new this.EsriBasemap({
      id: 'topo',
      baseLayers: new this.EsriTileLayer({
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'
      }),
      thumbnailUrl: 'assets/images/maps/basemap/topo.jpg',
      title: 'Topográfico'
    });
  }

  getGoogleSatellite() {
    return new this.EsriBasemap({
      id: 'google_satellite',
      baseLayers: new this.EsriWebTileLayer({
        urlTemplate: 'https://mts1.google.com/vt/lyrs=s@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile',
        copyright: 'Google Maps: Satelital'
      }),
      thumbnailUrl: 'assets/images/maps/basemap/google-satellite.png',
      title: 'Google Satelital'
    });
  }

  getGoogleMaps() {
    return new this.EsriBasemap({
      id: 'google_maps',
      baseLayers: new this.EsriWebTileLayer({
        urlTemplate: 'https://mts1.google.com/vt/lyrs=m@186112443,traficc&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile',
        copyright: 'Google Maps'
      }),
      thumbnailUrl: 'assets/images/maps/basemap/google-road.png',
      title: 'Google Maps'
    });
  }

  getGoogleTraffic() {
    return new this.EsriBasemap({
      id: 'google_traffic',
      baseLayers: new this.EsriWebTileLayer({
        urlTemplate: 'https://mts1.google.com/vt/lyrs=m@221097413,traffic&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile',
        copyright: 'Google Maps: Tráfico'
      }),
      thumbnailUrl: 'assets/images/maps/basemap/google-road.png',
      title: 'Google Tráfico'
    });
  }
}

