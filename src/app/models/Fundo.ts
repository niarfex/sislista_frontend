import { CampoGetDto } from "./Campo";
import { SelectTipoDto } from "./SelectTipo";

export interface IResponseFundoGetDto {
    success: boolean;
    message: String;
    datos: FundoGetDto;
}
export class ResponseFundoGetDto implements IResponseFundoGetDto {
    success: boolean;
    message: String;
    datos: FundoGetDto;
    constructor(data?: IResponseFundoGetDto) {
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
            this.datos = FundoGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseFundoGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseFundoGetDto();
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


export interface IFundoGetDto {
    Id: number;
    IdCuestionario: number;
    Fundo: String;
    SuperficieTotal: number;
    SuperficieAgricola: number;
    IdUbigeo: String;
    Observacion: String;
    ListDepartamento: SelectTipoDto[];
    ListProvincia: SelectTipoDto[];
    ListDistrito: SelectTipoDto[];
    ListCampos: CampoGetDto[];
}
export class FundoGetDto implements IFundoGetDto {
    Id: number;
    IdCuestionario: number;
    Fundo: String;
    SuperficieTotal: number;
    SuperficieAgricola: number;
    IdUbigeo: String;
    Observacion: String;
    ListDepartamento: SelectTipoDto[];
    ListProvincia: SelectTipoDto[];
    ListDistrito: SelectTipoDto[];
    ListCampos: CampoGetDto[];
    constructor(data?: IFundoGetDto) {
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
            this.IdCuestionario = _data["IdCuestionario"];
            this.Fundo = _data["Fundo"];
            this.SuperficieTotal = _data["SuperficieTotal"];
            this.SuperficieAgricola = _data["SuperficieAgricola"];
            this.IdUbigeo = _data["IdUbigeo"];
            this.Observacion = _data["Observacion"];
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
            if (Array.isArray(_data["ListCampos"]) && _data["ListCampos"].length > 0) {
                this.ListCampos = [] as any;
                for (let item of _data["ListCampos"])
                    this.ListCampos!.push(CampoGetDto.fromJS(item));
            }   
        }
    }
    static fromJS(data: any): FundoGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new FundoGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["IdCuestionario"] = this.IdCuestionario;
        data["Fundo"] = this.Fundo;
        data["SuperficieTotal"] = this.SuperficieTotal;
        data["SuperficieAgricola"] = this.SuperficieAgricola;
        data["IdUbigeo"] = this.IdUbigeo;
        data["Observacion"] = this.Observacion;
        if (Array.isArray(this.ListCampos)) {
            data["ListCampos"] = [];
            for (let item of this.ListCampos)
                data["ListCampos"].push(item.toJSON());
        }
        return data;
    }
}