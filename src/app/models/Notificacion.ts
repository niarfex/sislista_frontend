import { SelectTipoDto } from "./SelectTipo";

export interface IResponseNotificacionListDto {
    success: boolean;
    message: String;
    datos: NotificacionListDto[];
}
export class ResponseNotificacionListDto implements IResponseNotificacionListDto {
    success: boolean;
    message: String;
    datos: NotificacionListDto[];
    constructor(data?: IResponseNotificacionListDto) {
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
                    this.datos!.push(NotificacionListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseNotificacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseNotificacionListDto();
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

export interface INotificacionListDto {
    Id: number;
    Asunto: String;
    Frecuencia: String;
    UsuariosNotificados: String;
    FechaRegistro: String;
    FechaNotificacion: String;
    EstadoNotificacion: number;
}
export class NotificacionListDto implements INotificacionListDto {
    Id: number;
    Asunto: String;
    Frecuencia: String;
    UsuariosNotificados: String;
    FechaRegistro: String;
    FechaNotificacion: String;
    EstadoNotificacion: number;
    constructor(data?: INotificacionListDto) {
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
            this.Asunto = _data["Asunto"];
            this.Frecuencia = _data["Frecuencia"];
            this.UsuariosNotificados = _data["UsuariosNotificados"];
            this.FechaRegistro = _data["FechaRegistro"];
            this.FechaNotificacion = _data["FechaNotificacion"];
            this.EstadoNotificacion = _data["EstadoNotificacion"];
        }
    }
    static fromJS(data: any): NotificacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new NotificacionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseNotificacionGetDto {
    success: boolean;
    message: String;
    datos: NotificacionGetDto;
}
export class ResponseNotificacionGetDto implements IResponseNotificacionGetDto {
    success: boolean;
    message: String;
    datos: NotificacionGetDto;
    constructor(data?: IResponseNotificacionGetDto) {
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
            this.datos = NotificacionGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseNotificacionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseNotificacionGetDto();
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


export interface INotificacionGetDto {
    Id: number;
    Asunto: String;
    IdFrecuencia: number;
    IdProgramacionRegistro: number;
    IdEtapa: number;
    Descripcion: String;
    IdPerfil: number;  
    ListFrecuencias: SelectTipoDto[];
    ListProgramacionesVigentes: SelectTipoDto[];
    ListEtapas: SelectTipoDto[];
    ListPerfiles: SelectTipoDto[];
}
export class NotificacionGetDto implements INotificacionGetDto {
    Id: number;
    Asunto: String;
    IdFrecuencia: number;
    IdProgramacionRegistro: number;
    IdEtapa: number;
    Descripcion: String;
    IdPerfil: number;
    ListFrecuencias: SelectTipoDto[];
    ListProgramacionesVigentes: SelectTipoDto[];
    ListEtapas: SelectTipoDto[];
    ListPerfiles: SelectTipoDto[];
    constructor(data?: INotificacionGetDto) {
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
            this.Asunto= _data["Asunto"];
            this.IdFrecuencia= _data["IdFrecuencia"];
            this.IdProgramacionRegistro= _data["IdProgramacionRegistro"];
            this.IdEtapa= _data["IdEtapa"];
            this.Descripcion= _data["Descripcion"];
            this.IdPerfil= _data["IdPerfil"];   
            if (Array.isArray(_data["ListFrecuencias"]) && _data["ListFrecuencias"].length > 0) {
                this.ListFrecuencias = [] as any;
                for (let item of _data["ListFrecuencias"])
                    this.ListFrecuencias!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListProgramacionesVigentes"]) && _data["ListProgramacionesVigentes"].length > 0) {
                this.ListProgramacionesVigentes = [] as any;
                for (let item of _data["ListProgramacionesVigentes"])
                    this.ListProgramacionesVigentes!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListEtapas"]) && _data["ListEtapas"].length > 0) {
                this.ListEtapas = [] as any;
                for (let item of _data["ListEtapas"])
                    this.ListEtapas!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListPerfiles"]) && _data["ListPerfiles"].length > 0) {
                this.ListPerfiles = [] as any;
                for (let item of _data["ListPerfiles"])
                    this.ListPerfiles!.push(SelectTipoDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): NotificacionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new NotificacionGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Asunto"] = this.Asunto;
        data["IdFrecuencia"] = this.IdFrecuencia;
        data["IdProgramacionRegistro"] = this.IdProgramacionRegistro;
        data["IdEtapa"] = this.IdEtapa;
        data["Descripcion"] = this.Descripcion;
        data["IdPerfil"] = this.IdPerfil;
        return data;
    }
}