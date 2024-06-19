export interface IResponseCondicionJuridicaListDto {
    success: boolean;
    message: String;
    datos: CondicionJuridicaListDto[];
}
export class ResponseCondicionJuridicaListDto implements IResponseCondicionJuridicaListDto {
    success: boolean;
    message: String;
    datos: CondicionJuridicaListDto[];
    constructor(data?: IResponseCondicionJuridicaListDto) {
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
                    this.datos!.push(CondicionJuridicaListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseCondicionJuridicaListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseCondicionJuridicaListDto();
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

export interface ICondicionJuridicaListDto {
    Id: number;
    CodigoCondicionJuridica: String;
    CondicionJuridica: String;
    DescripcionCondicionJuridica: String;
    Otros: number;
    Estado: number;
}
export class CondicionJuridicaListDto implements ICondicionJuridicaListDto {
    Id: number;
    CodigoCondicionJuridica: String;
    CondicionJuridica: String;
    DescripcionCondicionJuridica: String;
    Otros: number;
    Estado: number;
    constructor(data?: ICondicionJuridicaListDto) {
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
            this.CodigoCondicionJuridica = _data["CodigoCondicionJuridica"];
            this.CondicionJuridica = _data["CondicionJuridica"];
            this.DescripcionCondicionJuridica = _data["DescripcionCondicionJuridica"];
            this.Otros = _data["Usuarios"];
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): CondicionJuridicaListDto {
        data = typeof data === 'object' ? data : {};
        let result = new CondicionJuridicaListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseCondicionJuridicaGetDto {
    success: boolean;
    message: String;
    datos: CondicionJuridicaGetDto;
}
export class ResponseCondicionJuridicaGetDto implements IResponseCondicionJuridicaGetDto {
    success: boolean;
    message: String;
    datos: CondicionJuridicaGetDto;
    constructor(data?: IResponseCondicionJuridicaGetDto) {
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
            this.datos = CondicionJuridicaGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseCondicionJuridicaGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseCondicionJuridicaGetDto();
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


export interface ICondicionJuridicaGetDto {
    Id: number;
    CodigoCondicionJuridica: String;
    CondicionJuridica: String;
    DescripcionCondicionJuridica: String;
    Otros: number;
}
export class CondicionJuridicaGetDto implements ICondicionJuridicaGetDto {
    Id: number;
    CodigoCondicionJuridica: String;
    CondicionJuridica: String;
    DescripcionCondicionJuridica: String;
    Otros: number;
    constructor(data?: ICondicionJuridicaGetDto) {
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
            this.CodigoCondicionJuridica= _data["CodigoCondicionJuridica"];
            this.CondicionJuridica= _data["CondicionJuridica"];
            this.DescripcionCondicionJuridica= _data["DescripcionCondicionJuridica"];
            this.Otros= _data["Otros"];
        }
    }
    static fromJS(data: any): CondicionJuridicaGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new CondicionJuridicaGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["CodigoCondicionJuridica"] = this.CodigoCondicionJuridica;
        data["CondicionJuridica"] = this.CondicionJuridica;
        data["DescripcionCondicionJuridica"] = this.DescripcionCondicionJuridica;
        data["Otros"] = this.Otros;
        return data;
    }
}