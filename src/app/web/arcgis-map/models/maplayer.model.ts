export class MapLayer {
    idService: string;
    idLayerService: number;
    name: string;
  
    constructor(idService: string, idLayerService: number, name: string) {
      this.idService = idService;
      this.idLayerService = idLayerService;
      this.name = name;
    }
  }