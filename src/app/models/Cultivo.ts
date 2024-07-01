export interface IResponseCultivoListDto {
    success: boolean;
    message: String;
    datos: CultivoListDto[];
}
export class ResponseCultivoListDto implements IResponseCultivoListDto {
    success: boolean;
    message: String;
    datos: CultivoListDto[];
    constructor(data?: IResponseCultivoListDto) {
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
                    this.datos!.push(CultivoListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseCultivoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseCultivoListDto();
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

export interface ICultivoListDto {
    Id: String;
    Cultivo: String;
}
export class CultivoListDto implements ICultivoListDto {
    Id: String;
    Cultivo: String;
    constructor(data?: ICultivoListDto) {
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
            this.Cultivo = _data["Cultivo"];
        }
    }
    static fromJS(data: any): CultivoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new CultivoListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};     
        return data;
    }
}