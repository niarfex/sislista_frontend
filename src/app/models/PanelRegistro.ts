import { SelectTipoDto } from "./SelectTipo";

export interface IResponsePanelRegistroListDto {
    success: boolean;
    message: String;
    datos: PanelRegistroListDto[];
}
export class ResponsePanelRegistroListDto implements IResponsePanelRegistroListDto {
    success: boolean;
    message: String;
    datos: PanelRegistroListDto[];
    constructor(data?: IResponsePanelRegistroListDto) {
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
                    this.datos!.push(PanelRegistroListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponsePanelRegistroListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsePanelRegistroListDto();
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

export interface IPanelRegistroListDto {
    Id: number;
    Periodo: String;
    ProgramacionRegistro: String;
    FechaInicio: String;
    FechaFin: String;
    EstadoProgramacion: number;
}
export class PanelRegistroListDto implements IPanelRegistroListDto {
    Id: number;
    Periodo: String;
    ProgramacionRegistro: String;
    FechaInicio: String;
    FechaFin: String;
    EstadoProgramacion: number;
    constructor(data?: IPanelRegistroListDto) {
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
            this.Periodo = _data["Periodo"];
            this.ProgramacionRegistro = _data["ProgramacionRegistro"];
            this.FechaInicio = _data["FechaInicio"];
            this.FechaFin = _data["FechaFin"];
            this.EstadoProgramacion = _data["EstadoProgramacion"];
        }
    }
    static fromJS(data: any): PanelRegistroListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PanelRegistroListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponsePanelRegistroGetDto {
    success: boolean;
    message: String;
    datos: PanelRegistroGetDto;
}
export class ResponsePanelRegistroGetDto implements IResponsePanelRegistroGetDto {
    success: boolean;
    message: String;
    datos: PanelRegistroGetDto;
    constructor(data?: IResponsePanelRegistroGetDto) {
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
            this.datos = PanelRegistroGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponsePanelRegistroGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsePanelRegistroGetDto();
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


export interface IPanelRegistroGetDto {
    Id: number;
    IdPlantilla: number;
    IdAnio: number;
    ProgramacionRegistro: String;
    FechaInicio: Date;
    FechaFin: Date;
    DecretoNorma: String;
    ArchivoDecretoNorma: String;
    Objetivo: String;
    EnteRector: String;
    ListPeriodos: SelectTipoDto[];
    ListPlantillasActivas: SelectTipoDto[];
}
export class PanelRegistroGetDto implements IPanelRegistroGetDto {
    Id: number;
    IdPlantilla: number;
    IdAnio: number;
    ProgramacionRegistro: String;
    FechaInicio: Date;
    FechaFin: Date;
    DecretoNorma: String;
    ArchivoDecretoNorma: String;
    Objetivo: String;
    EnteRector: String;
    ListPeriodos: SelectTipoDto[];
    ListPlantillasActivas: SelectTipoDto[];
    constructor(data?: IPanelRegistroGetDto) {
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
            this.IdPlantilla = _data["IdPlantilla"];
            this.IdAnio = _data["IdAnio"];
            this.ProgramacionRegistro = _data["ProgramacionRegistro"];
            this.FechaInicio = _data["FechaInicio"];
            this.FechaFin = _data["FechaFin"];
            this.DecretoNorma = _data["DecretoNorma"];
            this.ArchivoDecretoNorma = _data["ArchivoDecretoNorma"];
            this.Objetivo = _data["Objetivo"];
            this.EnteRector = _data["EnteRector"];
            if (Array.isArray(_data["ListPeriodos"]) && _data["ListPeriodos"].length > 0) {
                this.ListPeriodos = [] as any;
                for (let item of _data["ListPeriodos"])
                    this.ListPeriodos!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListPlantillasActivas"]) && _data["ListPlantillasActivas"].length > 0) {
                this.ListPlantillasActivas = [] as any;
                for (let item of _data["ListPlantillasActivas"])
                    this.ListPlantillasActivas!.push(SelectTipoDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): PanelRegistroGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new PanelRegistroGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdPlantilla"] = this.IdPlantilla;
        data["IdAnio"] = this.IdAnio;
        data["ProgramacionRegistro"] = this.ProgramacionRegistro;
        data["FechaInicio"] = this.FechaInicio;
        data["FechaFin"] = this.FechaFin;
        data["DecretoNorma"] = this.DecretoNorma;
        data["ArchivoDecretoNorma"] = this.ArchivoDecretoNorma;
        data["Objetivo"] = this.Objetivo;
        data["EnteRector"] = this.EnteRector;
        return data;
    }
}