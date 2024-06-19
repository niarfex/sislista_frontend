export interface IResponseTipoExplotacionListDto {
    success: boolean;
    message: String;
    datos: TipoExplotacionListDto[];
}
export class ResponseTipoExplotacionListDto implements IResponseTipoExplotacionListDto {
    success: boolean;
    message: String;
    datos: TipoExplotacionListDto[];
    constructor(data?: IResponseTipoExplotacionListDto) {
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
                    this.datos!.push(TipoExplotacionListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseTipoExplotacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseTipoExplotacionListDto();
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

export interface ITipoExplotacionListDto {
    Id: number;
    CodigoTipoExplotacion: String;
    TipoExplotacion: String;
    DescripcionTipoExplotacion: String;
    Estado: number;
}
export class TipoExplotacionListDto implements ITipoExplotacionListDto {
    Id: number;
    CodigoTipoExplotacion: String;
    TipoExplotacion: String;
    DescripcionTipoExplotacion: String;
    Estado: number;
    constructor(data?: ITipoExplotacionListDto) {
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
            this.CodigoTipoExplotacion = _data["CodigoTipoExplotacion"];
            this.TipoExplotacion = _data["TipoExplotacion"];
            this.DescripcionTipoExplotacion = _data["DescripcionTipoExplotacion"];
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): TipoExplotacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new TipoExplotacionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseTipoExplotacionGetDto {
    success: boolean;
    message: String;
    datos: TipoExplotacionGetDto;
}
export class ResponseTipoExplotacionGetDto implements IResponseTipoExplotacionGetDto {
    success: boolean;
    message: String;
    datos: TipoExplotacionGetDto;
    constructor(data?: IResponseTipoExplotacionGetDto) {
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
            this.datos = TipoExplotacionGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseTipoExplotacionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseTipoExplotacionGetDto();
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


export interface ITipoExplotacionGetDto {
    Id: number;
    CodigoTipoExplotacion: String;
    TipoExplotacion: String;
    DescripcionTipoExplotacion: String;
}
export class TipoExplotacionGetDto implements ITipoExplotacionGetDto {
    Id: number;
    CodigoTipoExplotacion: String;
    TipoExplotacion: String;
    DescripcionTipoExplotacion: String;
    constructor(data?: ITipoExplotacionGetDto) {
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
            this.CodigoTipoExplotacion= _data["CodigoTipoExplotacion"];
            this.TipoExplotacion= _data["TipoExplotacion"];
            this.DescripcionTipoExplotacion= _data["DescripcionTipoExplotacion"];
        }
    }
    static fromJS(data: any): TipoExplotacionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new TipoExplotacionGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["CodigoTipoExplotacion"] = this.Id;
        data["TipoExplotacion"] = this.Id;
        data["DescripcionTipoExplotacion"] = this.Id;
        return data;
    }
}