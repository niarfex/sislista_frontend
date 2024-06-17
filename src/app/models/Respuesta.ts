export interface IRespuesta {
    success: boolean;
    message:String;  
    datos:number;
}

export class Respuesta implements IRespuesta {
    success: boolean;
    message:String;
    datos:number;

    constructor(data?: IRespuesta) {
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
            this.datos = _data["data"];               
        }
    }

    static fromJS(data: any): Respuesta {
        data = typeof data === 'object' ? data : {};
        let result = new Respuesta();
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