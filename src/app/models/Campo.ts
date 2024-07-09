export interface IResponseCampoGetDto {
    success: boolean;
    message: String;
    datos: CampoGetDto;
}
export class ResponseCampoGetDto implements IResponseCampoGetDto {
    success: boolean;
    message: String;
    datos: CampoGetDto;
    constructor(data?: IResponseCampoGetDto) {
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
            this.datos = CampoGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseCampoGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseCampoGetDto();
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


export interface ICampoGetDto {
    Id: number;
    IdFundo: number;
    Campo: String;
    IdTenencia: number;
    IdUsoTierra: number;
    IdCultivo: number;
    IdUsoNoAgricola: number;
    Observacion: String;
    Superficie: number;
    SuperficieCultivada: number;
}
export class CampoGetDto implements ICampoGetDto {
    Id: number;
    IdFundo: number;
    Campo: String;
    IdTenencia: number;
    IdUsoTierra: number;
    IdCultivo: number;
    IdUsoNoAgricola: number;
    Observacion: String;
    Superficie: number;
    SuperficieCultivada: number;
    constructor(data?: ICampoGetDto) {
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
            this.Campo = _data["Campo"];
            this.IdTenencia = _data["IdTenencia"];
            this.IdUsoTierra = _data["IdUsoTierra"];
            this.IdCultivo = _data["IdCultivo"];
            this.IdUsoNoAgricola = _data["IdUsoNoAgricola"];
            this.Observacion = _data["Observacion"];
            this.Superficie = _data["Superficie"];
            this.SuperficieCultivada = _data["SuperficieCultivada"];
        }
    }
    static fromJS(data: any): CampoGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new CampoGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdFundo"] = this.Id;
        data["Campo"] = this.Id;
        data["IdTenencia"] = this.Id;
        data["IdUsoTierra"] = this.Id;
        data["IdCultivo"] = this.Id;
        data["IdUsoNoAgricola"] = this.Id;
        data["Observacion"] = this.Id;
        data["Superficie"] = this.Id;
        data["SuperficieCultivada"] = this.Id;
        return data;
    }
}