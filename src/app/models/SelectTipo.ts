export interface IResponseSelectTipoDto{
    success: boolean;
    message:String;  
    datos:SelectTipoDto[];
}
export class ResponseSelectTipoDto implements IResponseSelectTipoDto {
    success: boolean;
    message:String;  
    datos:SelectTipoDto[];
    constructor(data?: IResponseSelectTipoDto) {
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

            if (Array.isArray(_data["data"]) && _data["data"].length > 0) {
                this.datos = [] as any;
                /*if (_data["data"].length>1){
                    var fault = new SelectTipoDto();
                    fault.label = "-- Seleccionar --";
                    fault.value = "0";                
                    this.datos!.push(SelectTipoDto.fromJS(fault));
                }*/
                for (let item of _data["data"])
                    this.datos!.push(SelectTipoDto.fromJS(item));
            }             
        }
    }
    static fromJS(data: any): ResponseSelectTipoDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseSelectTipoDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};      
        data["success"]=this.success;
        data["message"]=this.message;
        data["data"]=this.datos;      
        return data;
    }
}
export interface ISelectTipoDto {
    label: string;
    value: string;
    codigo: string;
}
export class SelectTipoDto {
    label: string;
    value: string;
    codigo: string;

    constructor(data?: ISelectTipoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }        
        }
    } 

    init(_data?: any) {
        if (_data) {
            this.label = _data["label"] == undefined ? _data.label : _data["label"];
            this.value = _data["value"] == undefined ? _data.value : _data["value"];
            this.codigo = _data["codigo"] == undefined ? _data.codigo : _data["codigo"];
        }
    }
    static fromJS(data: any): SelectTipoDto {
        data = typeof data === 'object' ? data : {};
        let result = new SelectTipoDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}