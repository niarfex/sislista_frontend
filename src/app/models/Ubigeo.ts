export interface IResponseUbigeoListDto {
    success: boolean;
    message: String;
    datos: UbigeoListDto[];
}
export class ResponseUbigeoListDto implements IResponseUbigeoListDto {
    success: boolean;
    message: String;
    datos: UbigeoListDto[];
    constructor(data?: IResponseUbigeoListDto) {
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
                    this.datos!.push(UbigeoListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseUbigeoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseUbigeoListDto();
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

export interface IUbigeoListDto {
    Id: String;
    Departamento: String;
    Provincia: String;
    Distrito: String;
    Estado: number;
}
export class UbigeoListDto implements IUbigeoListDto {
    Id: String;
    Departamento: String;
    Provincia: String;
    Distrito: String;
    Estado: number;
    constructor(data?: IUbigeoListDto) {
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
            this.Departamento = _data["Departamento"];
            this.Provincia = _data["Provincia"];
            this.Distrito = _data["Distrito"];
            this.Estado = _data["Estado"];
        }
    }
    static fromJS(data: any): UbigeoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new UbigeoListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Departamento"] = this.Departamento;
        data["Provincia"] = this.Provincia;
        data["Distrito"] = this.Distrito;        
        return data;
    }
}