export interface IResponseArchivoGetDto {
    success: boolean;
    message: String;
    datos: ArchivoGetDto;
}
export class ResponseArchivoGetDto implements IResponseArchivoGetDto {
    success: boolean;
    message: String;
    datos: ArchivoGetDto;
    constructor(data?: IResponseArchivoGetDto) {
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
            this.datos = ArchivoGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseArchivoGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseArchivoGetDto();
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


export interface IArchivoGetDto {
    Id: number;
    IdFundo: number;
    Archivo: String;
    IdTenencia: number;
    IdUsoTierra: number;
    IdCultivo: number;
    IdUsoNoAgricola: number;
    Observacion: String;
    Superficie: number;
    SuperficieCultivada: number;
}
export class ArchivoGetDto implements IArchivoGetDto {
    Id: number;
    IdFundo: number;
    Archivo: String;
    IdTenencia: number;
    IdUsoTierra: number;
    IdCultivo: number;
    IdUsoNoAgricola: number;
    Observacion: String;
    Superficie: number;
    SuperficieCultivada: number;
    constructor(data?: IArchivoGetDto) {
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
            this.IdFundo = _data["IdFundo"];
            this.Archivo = _data["Archivo"];
            this.IdTenencia = _data["IdTenencia"];
            this.IdUsoTierra = _data["IdUsoTierra"];
            this.IdCultivo = _data["IdCultivo"];
            this.IdUsoNoAgricola = _data["IdUsoNoAgricola"];
            this.Observacion = _data["Observacion"];
            this.Superficie = _data["Superficie"];
            this.SuperficieCultivada = _data["SuperficieCultivada"];
        }
    }
    static fromJS(data: any): ArchivoGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ArchivoGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdFundo"] = this.IdFundo;
        data["Archivo"] = this.Archivo;
        data["IdTenencia"] = this.IdTenencia;
        data["IdUsoTierra"] = this.IdUsoTierra;
        data["IdCultivo"] = this.IdCultivo;
        data["IdUsoNoAgricola"] = this.IdUsoNoAgricola;
        data["Observacion"] = this.Observacion;
        data["Superficie"] = this.Superficie;
        data["SuperficieCultivada"] = this.SuperficieCultivada;
        return data;
    }
}