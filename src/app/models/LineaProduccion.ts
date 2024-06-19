export interface IResponseLineaProduccionListDto {
    success: boolean;
    message: String;
    datos: LineaProduccionListDto[];
}
export class ResponseLineaProduccionListDto implements IResponseLineaProduccionListDto {
    success: boolean;
    message: String;
    datos: LineaProduccionListDto[];
    constructor(data?: IResponseLineaProduccionListDto) {
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
                    this.datos!.push(LineaProduccionListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseLineaProduccionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseLineaProduccionListDto();
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

export interface ILineaProduccionListDto {
    Id: number;
    CodigoLineaProduccion: String;
    LineaProduccion: String;
    DescripcionLineaProduccion: String;
    Estado: number;
}
export class LineaProduccionListDto implements ILineaProduccionListDto {
    Id: number;
    CodigoLineaProduccion: String;
    LineaProduccion: String;
    DescripcionLineaProduccion: String;
    Estado: number;
    constructor(data?: ILineaProduccionListDto) {
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
            this.CodigoLineaProduccion = _data["CodigoLineaProduccion"];
            this.LineaProduccion = _data["LineaProduccion"];
            this.DescripcionLineaProduccion = _data["DescripcionLineaProduccion"];  
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): LineaProduccionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new LineaProduccionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        return data;
    }
}

export interface IResponseLineaProduccionGetDto {
    success: boolean;
    message: String;
    datos: LineaProduccionGetDto;
}
export class ResponseLineaProduccionGetDto implements IResponseLineaProduccionGetDto {
    success: boolean;
    message: String;
    datos: LineaProduccionGetDto;
    constructor(data?: IResponseLineaProduccionGetDto) {
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
            this.datos = LineaProduccionGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseLineaProduccionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseLineaProduccionGetDto();
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


export interface ILineaProduccionGetDto {
    Id: number;
    CodigoLineaProduccion: String;
    LineaProduccion: String;
    DescripcionLineaProduccion: String;
}
export class LineaProduccionGetDto implements ILineaProduccionGetDto {
    Id: number;
    CodigoLineaProduccion: String;
    LineaProduccion: String;
    DescripcionLineaProduccion: String;
    constructor(data?: ILineaProduccionGetDto) {
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
            this.CodigoLineaProduccion= _data["CodigoLineaProduccion"];
            this.LineaProduccion= _data["LineaProduccion"];
            this.DescripcionLineaProduccion= _data["DescripcionLineaProduccion"];
        }
    }
    static fromJS(data: any): LineaProduccionGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new LineaProduccionGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["CodigoLineaProduccion"] = this.CodigoLineaProduccion;
        data["LineaProduccion"] = this.LineaProduccion;
        data["DescripcionLineaProduccion"] = this.DescripcionLineaProduccion;
        return data;
    }
}