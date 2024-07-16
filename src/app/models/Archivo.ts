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
    NombreArchivo: String;
    Archivo: String;
    DescripcionArchivo: String;
    CuestionarioPrincipal: number;
    IdTipoInformacion: number;
    Peso: number;
    TipoInformacion: String;
}
export class ArchivoGetDto implements IArchivoGetDto {
    Id: number;
    NombreArchivo: String;
    Archivo: String;
    DescripcionArchivo: String;
    CuestionarioPrincipal: number;
    IdTipoInformacion: number;
    Peso: number;
    TipoInformacion: String;
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
            this.NombreArchivo= _data["NombreArchivo"];
            this.Archivo= _data["Archivo"];
            this.DescripcionArchivo= _data["DescripcionArchivo"];
            this.CuestionarioPrincipal= _data["CuestionarioPrincipal"];
            this.IdTipoInformacion= _data["IdTipoInformacion"];
            this.Peso= _data["Peso"];
            this.TipoInformacion= _data["TipoInformacion"];
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
        data["NombreArchivo"] = this.NombreArchivo;
        data["Archivo"] = this.Archivo;
        data["DescripcionArchivo"] = this.DescripcionArchivo;
        data["CuestionarioPrincipal"] = this.CuestionarioPrincipal;
        data["IdTipoInformacion"] = this.IdTipoInformacion;
        data["Peso"] = this.Peso;
        data["TipoInformacion"] = this.TipoInformacion;
        return data;
    }
}