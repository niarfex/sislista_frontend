export interface IResponsePecuarioGetDto {
    success: boolean;
    message: String;
    datos: PecuarioGetDto;
}
export class ResponsePecuarioGetDto implements IResponsePecuarioGetDto {
    success: boolean;
    message: String;
    datos: PecuarioGetDto;
    constructor(data?: IResponsePecuarioGetDto) {
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
            this.datos = PecuarioGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponsePecuarioGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsePecuarioGetDto();
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


export interface IPecuarioGetDto {
    Id: number;
    IdCampo: number;
    IdSistemaPecuario: number;
    IdLineaProduccion: number;
    IdEspecie: number;
    Cantidad: number;
    Campo:String;
    SistemaPecuario:String;
    Animal:String;
    OrdenFundo: number;
    OrdenCampo: number;
    Seleccionado:boolean;
}
export class PecuarioGetDto implements IPecuarioGetDto {
    Id: number;
    IdCampo: number;
    IdSistemaPecuario: number;
    IdLineaProduccion: number;
    IdEspecie: number;
    Cantidad: number;
    Campo:String;
    SistemaPecuario:String;
    Animal:String;
    OrdenFundo: number;
    OrdenCampo: number;
    Seleccionado:boolean=false;
    constructor(data?: IPecuarioGetDto) {
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
            this.IdCampo = _data["IdCampo"];
            this.IdSistemaPecuario = _data["IdSistemaPecuario"];
            this.IdLineaProduccion = _data["IdLineaProduccion"];
            this.IdEspecie = _data["IdEspecie"];
            this.Cantidad = _data["Cantidad"];
            this.OrdenFundo = _data["OrdenFundo"];
            this.OrdenCampo = _data["OrdenCampo"];
            this.Campo= _data["Campo"];
            this.SistemaPecuario= _data["SistemaPecuario"];
            this.Animal= _data["Animal"];
        }
    }
    static fromJS(data: any): PecuarioGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new PecuarioGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdCampo"] = this.IdCampo;
        data["IdSistemaPecuario"] = this.IdSistemaPecuario;
        data["SistemaPecuario"] = this.SistemaPecuario;
        data["IdLineaProduccion"] = this.IdLineaProduccion;
        data["IdEspecie"] = this.IdEspecie;
        data["Cantidad"] = this.Cantidad;
        data["OrdenFundo"] = this.OrdenFundo;
        data["OrdenCampo"] = this.OrdenCampo;
        return data;
    }
}