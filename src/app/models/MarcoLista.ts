import { SelectTipoDto } from "./SelectTipo";

export interface IResponseMarcoListaListDto {
    success: boolean;
    message: String;
    datos: MarcoListaListDto[];
}
export class ResponseMarcoListaListDto implements IResponseMarcoListaListDto {
    success: boolean;
    message: String;
    datos: MarcoListaListDto[];
    constructor(data?: IResponseMarcoListaListDto) {
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
                    this.datos!.push(MarcoListaListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseMarcoListaListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseMarcoListaListDto();
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

export interface IMarcoListaListDto {
    Id: number;
    NumeroDocumento: String;
    NombreCompleto: String;
    CondicionJuridica: String;
    RepresentanteLegal: String;
    Estado: number;
}
export class MarcoListaListDto implements IMarcoListaListDto {
    Id: number;
    NumeroDocumento: String;
    NombreCompleto: String;
    CondicionJuridica: String;
    RepresentanteLegal: String;
    Estado: number;
    constructor(data?: IMarcoListaListDto) {
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
            this.NumeroDocumento= _data["NumeroDocumento"];
            this.NombreCompleto= _data["NombreCompleto"];
            this.CondicionJuridica= _data["CondicionJuridica"];
            this.RepresentanteLegal= _data["RepresentanteLegal"];
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): MarcoListaListDto {
        data = typeof data === 'object' ? data : {};
        let result = new MarcoListaListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseMarcoListaGetDto {
    success: boolean;
    message: String;
    datos: MarcoListaGetDto;
}
export class ResponseMarcoListaGetDto implements IResponseMarcoListaGetDto {
    success: boolean;
    message: String;
    datos: MarcoListaGetDto;
    constructor(data?: IResponseMarcoListaGetDto) {
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
            this.datos = MarcoListaGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseMarcoListaGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseMarcoListaGetDto();
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


export interface IMarcoListaGetDto {
    Id: number;
    IdPersona: number;
    IdTipoExplotacion: number;
    Direccion: String;
    IdDepartamento: String;
    ListCondicionJuridica: SelectTipoDto[];
    ListCondicionJuridicaOtros: SelectTipoDto[];
    ListTipoDocumento: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    ListProvincia: SelectTipoDto[];
    ListDistrito: SelectTipoDto[];
    ListTipoExplotacion: SelectTipoDto[];    
}
export class MarcoListaGetDto implements IMarcoListaGetDto {
    Id: number;
    IdPersona: number;
    IdTipoExplotacion: number;
    Direccion: String;
    IdDepartamento: String;
    ListCondicionJuridica: SelectTipoDto[];
    ListCondicionJuridicaOtros: SelectTipoDto[];
    ListTipoDocumento: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    ListProvincia: SelectTipoDto[];
    ListDistrito: SelectTipoDto[];
    ListTipoExplotacion: SelectTipoDto[]; 
    constructor(data?: IMarcoListaGetDto) {
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
            this.IdPersona = _data["IdPersona"];
            this.IdTipoExplotacion = _data["IdTipoExplotacion"];
            this.Direccion = _data["Direccion"];
            this.IdDepartamento = _data["IdDepartamento"];
           
            if (Array.isArray(_data["ListCondicionJuridica"]) && _data["ListCondicionJuridica"].length > 0) {
                this.ListCondicionJuridica = [] as any;
                for (let item of _data["ListCondicionJuridica"])
                    this.ListCondicionJuridica!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListCondicionJuridicaOtros"]) && _data["ListCondicionJuridicaOtros"].length > 0) {
                this.ListCondicionJuridicaOtros = [] as any;
                for (let item of _data["ListCondicionJuridicaOtros"])
                    this.ListCondicionJuridicaOtros!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListTipoDocumento"]) && _data["ListTipoDocumento"].length > 0) {
                this.ListTipoDocumento = [] as any;
                for (let item of _data["ListTipoDocumento"])
                    this.ListTipoDocumento!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListDepartamento"]) && _data["ListDepartamento"].length > 0) {
                this.ListDepartamento = [] as any;
                for (let item of _data["ListDepartamento"])
                    this.ListDepartamento!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListProvincia"]) && _data["ListProvincia"].length > 0) {
                this.ListProvincia = [] as any;
                for (let item of _data["ListProvincia"])
                    this.ListProvincia!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListDistrito"]) && _data["ListDistrito"].length > 0) {
                this.ListDistrito = [] as any;
                for (let item of _data["ListDistrito"])
                    this.ListDistrito!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListTipoExplotacion"]) && _data["ListTipoExplotacion"].length > 0) {
                this.ListTipoExplotacion = [] as any;
                for (let item of _data["ListTipoExplotacion"])
                    this.ListTipoExplotacion!.push(SelectTipoDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): MarcoListaGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new MarcoListaGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdPersona"] = this.IdPersona;
        data["IdTipoExplotacion"] = this.IdTipoExplotacion;
        data["Direccion"] = this.Direccion;
        data["IdDepartamento"] = this.IdDepartamento;
        return data;
    }
}