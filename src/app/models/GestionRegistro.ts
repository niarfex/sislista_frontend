import { SelectTipoDto } from "./SelectTipo";

export interface IResponseGestionRegistroListDto {
    success: boolean;
    message: String;
    datos: GestionRegistroListDto[];
}
export class ResponseGestionRegistroListDto implements IResponseGestionRegistroListDto {
    success: boolean;
    message: String;
    datos: GestionRegistroListDto[];
    constructor(data?: IResponseGestionRegistroListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.datos = [] as any;
                for (let item of _data["data"])
                    this.datos!.push(GestionRegistroListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseGestionRegistroListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseGestionRegistroListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.datos)) {
            data["data"] = [];
            for (let item of this.datos)
                data["data"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGestionRegistroListDto {
    IdMarcoLista: number;
    CodigoUUID: String;
    NumeroDocumento: String;
    FechaRegistro: Date;
    UsuarioCreacion: String;
    FechaActualizacion: Date;
    UsuarioActualizacion: String;
    Periodo: String;
    NombreCompleto: String;
    TipoExplotacion: String;
    Clasificacion: String;
    EstadoEntrevista: number;
    EstadoSupervision: number;
    EstadoValidacion: number;
    EstadoRegistro: number;
}
export class GestionRegistroListDto implements IGestionRegistroListDto {
    IdMarcoLista: number;
    CodigoUUID: String;
    NumeroDocumento: String;
    FechaRegistro: Date;
    UsuarioCreacion: String;
    FechaActualizacion: Date;
    UsuarioActualizacion: String;
    Periodo: String;
    NombreCompleto: String;
    TipoExplotacion: String;
    Clasificacion: String;
    EstadoEntrevista: number;
    EstadoSupervision: number;
    EstadoValidacion: number;
    EstadoRegistro: number;
    constructor(data?: IGestionRegistroListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.IdMarcoLista = _data["IdMarcoLista"];
            this.CodigoUUID = _data["CodigoUUID"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.FechaRegistro = _data["FechaRegistro"];
            this.UsuarioCreacion = _data["UsuarioCreacion"];
            this.FechaActualizacion = _data["FechaActualizacion"];
            this.UsuarioActualizacion = _data["UsuarioActualizacion"];
            this.Periodo = _data["Periodo"];
            this.NombreCompleto = _data["NombreCompleto"];
            this.TipoExplotacion = _data["TipoExplotacion"];
            this.Clasificacion = _data["Clasificacion"];
            this.EstadoEntrevista = _data["EstadoEntrevista"];
            this.EstadoSupervision = _data["EstadoSupervision"];
            this.EstadoValidacion = _data["EstadoValidacion"];
            this.EstadoRegistro = _data["EstadoRegistro"];
        }
    }
    static fromJS(data: any): GestionRegistroListDto {
        data = typeof data === 'object' ? data : {};
        let result = new GestionRegistroListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["IdMarcoLista"] = this.IdMarcoLista;        
        return data;
    }
}

export interface IResponseGestionRegistroGetDto {
    success: boolean;
    message: String;
    datos: GestionRegistroGetDto;
}
export class ResponseGestionRegistroGetDto implements IResponseGestionRegistroGetDto {
    success: boolean;
    message: String;
    datos: GestionRegistroGetDto;
    constructor(data?: IResponseGestionRegistroGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.datos = GestionRegistroGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseGestionRegistroGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseGestionRegistroGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.datos;
        return data;
    }
}


export interface IGestionRegistroGetDto {
    Id: number;
  
}
export class GestionRegistroGetDto implements IGestionRegistroGetDto {
    Id: number;
   
    constructor(data?: IGestionRegistroGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.Id = _data["Id"];
          
        }
    }
    static fromJS(data: any): GestionRegistroGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new GestionRegistroGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
       
        return data;
    }
}