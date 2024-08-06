export interface IResponseTrazabilidadGetDto {
    success: boolean;
    message: String;
    datos: TrazabilidadGetDto;
}
export class ResponseTrazabilidadGetDto implements IResponseTrazabilidadGetDto {
    success: boolean;
    message: String;
    datos: TrazabilidadGetDto;
    constructor(data?: IResponseTrazabilidadGetDto) {
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
            this.datos = TrazabilidadGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseTrazabilidadGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseTrazabilidadGetDto();
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


export interface ITrazabilidadGetDto {
    Id: number;
    Cuestionario: number;
    Observacion: String
    EstadoResultado: number;
    IdSeccion: number;
    Seccion: String;
    Perfil: String;
}
export class TrazabilidadGetDto implements ITrazabilidadGetDto {
    Id: number;
    Cuestionario: number;
    Observacion: String
    EstadoResultado: number=0;
    IdSeccion: number=0;
    Seccion: String;
    Perfil: String;
    constructor(data?: ITrazabilidadGetDto) {
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
            this.Cuestionario = _data["Cuestionario"];
            this.Observacion = _data["Observacion"];
            this.EstadoResultado = _data["EstadoResultado"];
            this.IdSeccion = _data["IdSeccion"];
            this.Seccion = _data["Seccion"];
            this.Perfil = _data["Perfil"];
        }
    }
    static fromJS(data: any): TrazabilidadGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new TrazabilidadGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Cuestionario"] = this.Cuestionario;
        data["Observacion"] = this.Observacion;
        data["EstadoResultado"] = this.EstadoResultado;
        data["IdSeccion"] = this.IdSeccion;
        data["Seccion"] = this.Seccion;
        data["Perfil"] = this.Perfil;
        return data;
    }
}