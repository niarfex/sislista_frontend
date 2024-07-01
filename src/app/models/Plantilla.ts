import { SelectTipoDto } from "./SelectTipo";

export interface IResponsePlantillaListDto {
    success: boolean;
    message: String;
    datos: PlantillaListDto[];
}
export class ResponsePlantillaListDto implements IResponsePlantillaListDto {
    success: boolean;
    message: String;
    datos: PlantillaListDto[];
    constructor(data?: IResponsePlantillaListDto) {
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
                    this.datos!.push(PlantillaListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponsePlantillaListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsePlantillaListDto();
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

export interface IPlantillaListDto {
    Id: number;
    Plantilla: String;
    Estado: number;
    FechaRegistro: String;
    UsuarioCreacion: String;
    FechaActualizacion: String;
    UsuarioActualizacion: String;
}
export class PlantillaListDto implements IPlantillaListDto {
    Id: number;
    Plantilla: String;
    Estado: number;
    FechaRegistro: String;
    UsuarioCreacion: String;
    FechaActualizacion: String;
    UsuarioActualizacion: String;
    constructor(data?: IPlantillaListDto) {
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
            this.Plantilla = _data["Plantilla"];
            this.Estado = _data["Estado"];
            this.FechaRegistro = _data["FechaRegistro"];
            this.UsuarioCreacion = _data["UsuarioCreacion"];
            this.FechaActualizacion = _data["FechaActualizacion"];
            this.UsuarioActualizacion = _data["UsuarioActualizacion"];
        }
    }
    static fromJS(data: any): PlantillaListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PlantillaListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponsePlantillaGetDto {
    success: boolean;
    message: String;
    datos: PlantillaGetDto;
}
export class ResponsePlantillaGetDto implements IResponsePlantillaGetDto {
    success: boolean;
    message: String;
    datos: PlantillaGetDto;
    constructor(data?: IResponsePlantillaGetDto) {
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
            this.datos = PlantillaGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponsePlantillaGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsePlantillaGetDto();
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


export interface IPlantillaGetDto {
    Id: number;
    Plantilla: String;
    Descripcion: String;
    NumCuestionario: number;
}
export class PlantillaGetDto implements IPlantillaGetDto {
    Id: number;
    Plantilla: String;
    Descripcion: String;
    NumCuestionario: number;
    constructor(data?: IPlantillaGetDto) {
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
            this.Plantilla = _data["Plantilla"];
            this.Descripcion = _data["Descripcion"];
            this.NumCuestionario = _data["NumCuestionario"];                  
        }
    }
    static fromJS(data: any): PlantillaGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new PlantillaGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Plantilla"] = this.Plantilla;
        data["Descripcion"] = this.Descripcion;
        data["NumCuestionario"] = this.NumCuestionario;
        return data;
    }
}