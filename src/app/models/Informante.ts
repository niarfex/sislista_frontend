export interface IResponseInformanteGetDto {
    success: boolean;
    message: String;
    datos: InformanteGetDto;
}
export class ResponseInformanteGetDto implements IResponseInformanteGetDto {
    success: boolean;
    message: String;
    datos: InformanteGetDto;
    constructor(data?: IResponseInformanteGetDto) {
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
            this.datos = InformanteGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseInformanteGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseInformanteGetDto();
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


export interface IInformanteGetDto {
    Id: number;
    CodigoUUIDPersona: String;
    IdEstado: number;
    Observacion: String;
    Direccion: String;
    CoordenadaEste: String;
    CoordenadaNorte: String;
    SistemaCoordenada: String;
    NombreCompleto: String;
    IdTipoDocumento: number;
    NumeroDocumento: String;
    Nombre: String;
    ApellidoPaterno: String;
    ApellidoMaterno: String;
    Cargo: String;
    Correo: String;
    Celular: String;
    Telefono: String;
    EstadoEntrevista: String;
}
export class InformanteGetDto implements IInformanteGetDto {
    Id: number;
    CodigoUUIDPersona: String;
    IdEstado: number;
    Observacion: String;
    Direccion: String;
    CoordenadaEste: String;
    CoordenadaNorte: String;
    SistemaCoordenada: String;
    NombreCompleto: String;
    IdTipoDocumento: number;
    NumeroDocumento: String;
    Nombre: String;
    ApellidoPaterno: String;
    ApellidoMaterno: String;
    Cargo: String;
    Correo: String;
    Celular: String;
    Telefono: String;
    EstadoEntrevista: String;
    constructor(data?: IInformanteGetDto) {
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
            this.CodigoUUIDPersona = _data["CodigoUUIDPersona"];
            this.IdEstado = _data["IdEstado"];
            this.Observacion = _data["Observacion"];
            this.Direccion = _data["Direccion"];
            this.CoordenadaEste = _data["CoordenadaEste"];
            this.CoordenadaNorte = _data["CoordenadaNorte"];
            this.SistemaCoordenada = _data["SistemaCoordenada"];
            this.NombreCompleto = _data["NombreCompleto"];
            this.IdTipoDocumento = _data["IdTipoDocumento"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.Nombre = _data["Nombre"];
            this.ApellidoPaterno = _data["ApellidoPaterno"];
            this.ApellidoMaterno = _data["ApellidoMaterno"];
            this.Cargo = _data["Cargo"];
            this.Correo = _data["Correo"];
            this.Celular = _data["Celular"];
            this.Telefono = _data["Telefono"];
            this.EstadoEntrevista = _data["EstadoEntrevista"];
        }
    }
    static fromJS(data: any): InformanteGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new InformanteGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["CodigoUUIDPersona"] = this.CodigoUUIDPersona;
        data["IdEstado"] = this.IdEstado;
        data["Observacion"] = this.Observacion;
        data["Direccion"] = this.Direccion;
        data["CoordenadaEste"] = this.CoordenadaEste;
        data["CoordenadaNorte"] = this.CoordenadaNorte;
        data["SistemaCoordenada"] = this.SistemaCoordenada;
        data["NombreCompleto"] = this.NombreCompleto;
        data["IdTipoDocumento"] = this.IdTipoDocumento;
        data["NumeroDocumento"] = this.NumeroDocumento;
        data["Nombre"] = this.Nombre;
        data["ApellidoPaterno"] = this.ApellidoPaterno;
        data["ApellidoMaterno"] = this.ApellidoMaterno;
        data["Cargo"] = this.Cargo;
        data["Correo"] = this.Correo;
        data["Celular"] = this.Celular;
        data["Telefono"] = this.Telefono;
        data["EstadoEntrevista"] = this.EstadoEntrevista;
        return data;
    }
}