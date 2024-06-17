import { SelectTipoDto } from "./SelectTipo";

export interface IResponseOrganizacionListDto {
    success: boolean;
    message: String;
    datos: OrganizacionListDto[];
}
export class ResponseOrganizacionListDto implements IResponseOrganizacionListDto {
    success: boolean;
    message: String;
    datos: OrganizacionListDto[];
    constructor(data?: IResponseOrganizacionListDto) {
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
                    this.datos!.push(OrganizacionListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseOrganizacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseOrganizacionListDto();
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

export interface IOrganizacionListDto {
    Id: number;
    TipoOrganizacion: String;
    NumeroDocumento: String;
    Organizacion: String;
    Departamento: String;
    Usuarios: number;
    Estado: number;
}
export class OrganizacionListDto implements IOrganizacionListDto {
    Id: number;
    TipoOrganizacion: String;
    NumeroDocumento: String;
    Organizacion: String;
    Departamento: String;
    Usuarios: number;
    Estado: number;
    constructor(data?: IOrganizacionListDto) {
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
            this.TipoOrganizacion = _data["TipoOrganizacion"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.Organizacion = _data["Organizacion"];
            this.Departamento = _data["Departamento"];
            this.Usuarios = _data["Usuarios"];
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): OrganizacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrganizacionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseOrganizacionGetDto {
    success: boolean;
    message: String;
    datos: OrganizacionGetDto;
}
export class ResponseOrganizacionGetDto implements IResponseOrganizacionGetDto {
    success: boolean;
    message: String;
    datos: OrganizacionGetDto;
    constructor(data?: IResponseOrganizacionGetDto) {
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
            this.datos = OrganizacionGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseOrganizacionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseOrganizacionGetDto();
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


export interface IOrganizacionGetDto {
    Id: number;
    IdTipoOrganizacion: number;
    IdDepartamento: String;
    NumeroDocumento: String;
    Organizacion: String;
    DireccionFiscal: String;
    Telefono: String;
    PaginaWeb: String;
    CorreoElectronico: String;
    ListTipoOrganizacion: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
}
export class OrganizacionGetDto implements IOrganizacionGetDto {
    Id: number;
    IdTipoOrganizacion: number;
    IdDepartamento: String;
    NumeroDocumento: String;
    Organizacion: String;
    DireccionFiscal: String;
    Telefono: String;
    PaginaWeb: String;
    CorreoElectronico: String;
    ListTipoOrganizacion: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    constructor(data?: IOrganizacionGetDto) {
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
            this.IdTipoOrganizacion = _data["IdTipoOrganizacion"];
            this.IdDepartamento = _data["IdDepartamento"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.Organizacion = _data["Organizacion"];
            this.DireccionFiscal = _data["DireccionFiscal"];
            this.Telefono = _data["Telefono"];
            this.PaginaWeb = _data["PaginaWeb"];
            this.CorreoElectronico = _data["CorreoElectronico"];
            if (Array.isArray(_data["ListTipoOrganizacion"]) && _data["ListTipoOrganizacion"].length > 0) {
                this.ListTipoOrganizacion = [] as any;
                for (let item of _data["ListTipoOrganizacion"])
                    this.ListTipoOrganizacion!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListDepartamento"]) && _data["ListDepartamento"].length > 0) {
                this.ListDepartamento = [] as any;
                for (let item of _data["ListDepartamento"])
                    this.ListDepartamento!.push(SelectTipoDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): OrganizacionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrganizacionGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdTipoOrganizacion"] = this.IdTipoOrganizacion;
        data["IdDepartamento"] = this.IdDepartamento;
        data["NumeroDocumento"] = this.NumeroDocumento;
        data["Organizacion"] = this.Organizacion;
        data["DireccionFiscal"] = this.DireccionFiscal;
        data["Telefono"] = this.Telefono;
        data["PaginaWeb"] = this.PaginaWeb;
        data["CorreoElectronico"] = this.CorreoElectronico;
        return data;
    }
}