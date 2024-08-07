export interface IResponseEspecieListDto {
    success: boolean;
    message: String;
    datos: EspecieListDto[];
}
export class ResponseEspecieListDto implements IResponseEspecieListDto {
    success: boolean;
    message: String;
    datos: EspecieListDto[];
    constructor(data?: IResponseEspecieListDto) {
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
                    this.datos!.push(EspecieListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseEspecieListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseEspecieListDto();
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

export interface IEspecieListDto {
    Id: number;
    CodigoEspecie: String;
    Especie: String;
    DescripcionEspecie: String;
    Estado: number;
}
export class EspecieListDto implements IEspecieListDto {
    Id: number;
    CodigoEspecie: String;
    Especie: String;
    DescripcionEspecie: String;
    Estado: number;
    constructor(data?: IEspecieListDto) {
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
            this.CodigoEspecie = _data["CodigoEspecie"];
            this.Especie = _data["Especie"];
            this.DescripcionEspecie = _data["DescripcionEspecie"];  
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): EspecieListDto {
        data = typeof data === 'object' ? data : {};
        let result = new EspecieListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseEspecieGetDto {
    success: boolean;
    message: String;
    datos: EspecieGetDto;
}
export class ResponseEspecieGetDto implements IResponseEspecieGetDto {
    success: boolean;
    message: String;
    datos: EspecieGetDto;
    constructor(data?: IResponseEspecieGetDto) {
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
            this.datos = EspecieGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseEspecieGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseEspecieGetDto();
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


export interface IEspecieGetDto {
    Id: number;
    CodigoEspecie: String;
    Especie: String;
    DescripcionEspecie: String;
}
export class EspecieGetDto implements IEspecieGetDto {
    Id: number;
    CodigoEspecie: String;
    Especie: String;
    DescripcionEspecie: String;
    constructor(data?: IEspecieGetDto) {
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
            this.CodigoEspecie= _data["CodigoEspecie"];
            this.Especie= _data["Especie"];
            this.DescripcionEspecie= _data["DescripcionEspecie"];
        }
    }
    static fromJS(data: any): EspecieGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new EspecieGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["CodigoEspecie"] = this.CodigoEspecie;
        data["Especie"] = this.Especie;
        data["DescripcionEspecie"] = this.DescripcionEspecie;
        return data;
    }
}