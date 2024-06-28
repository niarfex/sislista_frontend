import { MarcoListaListDto } from "./MarcoLista";
import { SelectTipoDto } from "./SelectTipo";

export interface IResponseUsuarioListDto {
    success: boolean;
    message: String;
    datos: UsuarioListDto[];
}
export class ResponseUsuarioListDto implements IResponseUsuarioListDto {
    success: boolean;
    message: String;
    datos: UsuarioListDto[];
    constructor(data?: IResponseUsuarioListDto) {
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
                    this.datos!.push(UsuarioListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseUsuarioListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseUsuarioListDto();
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

export interface IUsuarioListDto {
    CodigoUUIDUsuario: String;
    Perfil: String;
    NumeroDocumento: String;
    NombreCompleto: String;
    CorreoElectronico: String;
    Estado: number;
}
export class UsuarioListDto implements IUsuarioListDto {
    CodigoUUIDUsuario: String;
    Perfil: String;
    NumeroDocumento: String;
    NombreCompleto: String;
    CorreoElectronico: String;
    Estado: number;
    constructor(data?: IUsuarioListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.CodigoUUIDUsuario = _data["CodigoUUIDUsuario"];
            this.Perfil = _data["Perfil"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.NombreCompleto = _data["NombreCompleto"];
            this.CorreoElectronico = _data["CorreoElectronico"];
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): UsuarioListDto {
        data = typeof data === 'object' ? data : {};
        let result = new UsuarioListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["CodigoUUIDUsuario"] = this.CodigoUUIDUsuario;
        data["Perfil"] = this.Perfil;
        data["INumeroDocumento"] = this.NumeroDocumento;
        data["NombreCompleto"] = this.NombreCompleto;
        data["CorreoElectronico"] = this.CorreoElectronico;
        data["Estado"] = this.Estado;
        return data;
    }
}

export interface IResponseUsuarioGetDto {
    success: boolean;
    message: String;
    datos: UsuarioGetDto;
}
export class ResponseUsuarioGetDto implements IResponseUsuarioGetDto {
    success: boolean;
    message: String;
    datos: UsuarioGetDto;
    constructor(data?: IResponseUsuarioGetDto) {
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
            this.datos = UsuarioGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseUsuarioGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseUsuarioGetDto();
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


export interface IUsuarioGetDto {
    CodigoUUIDUsuario: String;
    IdPerfil: number;
    IdTipoDocumento: number;
    CodigoUUIDPersona: String;
    NumeroDocumento: String;
    Nombre: String;
    ApellidoPaterno: String;
    ApellidoMaterno: String;
    Celular: String;
    CorreoElectronico: String;
    IdOrganizacion: number;
    Cargo: String;
    OficinaArea: String;
    ListTipoDocumento: SelectTipoDto[];
    ListPerfil: SelectTipoDto[];
    ListOrganizacion: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    ListMarcoListaAsignados: MarcoListaListDto[];
}
export class UsuarioGetDto implements IUsuarioGetDto {
    CodigoUUIDUsuario: String;
    IdPerfil: number;
    IdTipoDocumento: number;
    CodigoUUIDPersona: String;
    NumeroDocumento: String;
    Nombre: String;
    ApellidoPaterno: String;
    ApellidoMaterno: String;
    Celular: String;
    CorreoElectronico: String;
    IdOrganizacion: number;
    Cargo: String;
    OficinaArea: String;
    ListTipoDocumento: SelectTipoDto[];
    ListPerfil: SelectTipoDto[];
    ListOrganizacion: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    ListMarcoListaAsignados: MarcoListaListDto[]=[];
    constructor(data?: IUsuarioGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.CodigoUUIDUsuario = _data["CodigoUUIDUsuario"];
            this.IdPerfil = _data["IdPerfil"];
            this.IdTipoDocumento = _data["IdTipoDocumento"];
            this.CodigoUUIDPersona = _data["CodigoUUIDPersona"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.Nombre = _data["Nombre"];
            this.ApellidoPaterno = _data["ApellidoPaterno"];
            this.ApellidoMaterno = _data["ApellidoMaterno"];
            this.Celular = _data["Celular"];
            this.CorreoElectronico = _data["CorreoElectronico"];
            this.IdOrganizacion = _data["IdOrganizacion"];
            this.Cargo = _data["Cargo"];
            this.OficinaArea = _data["OficinaArea"];

            if (Array.isArray(_data["ListTipoDocumento"]) && _data["ListTipoDocumento"].length > 0) {
                this.ListTipoDocumento = [] as any;
                for (let item of _data["ListTipoDocumento"])
                    this.ListTipoDocumento!.push(SelectTipoDto.fromJS(item));
            }   
            if (Array.isArray(_data["ListPerfil"]) && _data["ListPerfil"].length > 0) {
                this.ListPerfil = [] as any;
                for (let item of _data["ListPerfil"])
                    this.ListPerfil!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListOrganizacion"]) && _data["ListOrganizacion"].length > 0) {
                this.ListOrganizacion = [] as any;
                for (let item of _data["ListOrganizacion"])
                    this.ListOrganizacion!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListDepartamento"]) && _data["ListDepartamento"].length > 0) {
                this.ListDepartamento = [] as any;
                for (let item of _data["ListDepartamento"])
                    this.ListDepartamento!.push(SelectTipoDto.fromJS(item));
            }   
            if (Array.isArray(_data["ListMarcoListaAsignados"]) && _data["ListMarcoListaAsignados"].length > 0) {
                this.ListMarcoListaAsignados = [] as any;
                for (let item of _data["ListMarcoListaAsignados"])
                    this.ListMarcoListaAsignados!.push(MarcoListaListDto.fromJS(item));
            }     
        }
    }
    static fromJS(data: any): UsuarioGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UsuarioGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["CodigoUUIDUsuario"] = this.CodigoUUIDUsuario;
        data["IdPerfil"] = this.IdPerfil;
        data["IdTipoDocumento"] = this.IdTipoDocumento;
        data["CodigoUUIDPersona"] = this.CodigoUUIDPersona;
        data["NumeroDocumento"] = this.NumeroDocumento;
        data["Nombre"] = this.Nombre;
        data["ApellidoPaterno"] = this.ApellidoPaterno;
        data["ApellidoMaterno"] = this.ApellidoMaterno;
        data["Celular"] = this.Celular;
        data["CorreoElectronico"] = this.CorreoElectronico;
        data["IdOrganizacion"] = this.IdOrganizacion;
        data["Cargo"] = this.Cargo;
        data["OficinaArea"] = this.OficinaArea;
        if (Array.isArray(this.ListMarcoListaAsignados)) {
            data["ListMarcoListaAsignados"] = [];
            for (let item of this.ListMarcoListaAsignados)
                data["ListMarcoListaAsignados"].push(item.toJSON());
        }
        return data;
    }
}