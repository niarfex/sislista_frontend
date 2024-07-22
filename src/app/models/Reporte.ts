export interface IResponseReporteGetDto {
    success: boolean;
    message: String;
    datos: ReporteGetDto;
}
export class ResponseReporteGetDto implements IResponseReporteGetDto {
    success: boolean;
    message: String;
    datos: ReporteGetDto;
    constructor(data?: IResponseReporteGetDto) {
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
            this.datos = ReporteGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseReporteGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseReporteGetDto();
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


export interface IReporteGetDto {
    CantEmpadronadores: number;
    CantSupervisores: number;
    CantEspecialistas: number;
    CantCompletados: number;
    CantEnProgreso: number;
    CantNoIniciado: number;
    //Cantidades-Empadronador
    CantParaRevisar: number;
    CantTrabajoGabinete: number;
    CantEnAlerta: number;
    //Cantidades-Supervisor
    CantParaValidar: number;
    CantObservadoSupervisor: number;
    CantParaRegistrar: number;
    CantArbitraje: number;
    //Cantidades-Especialista
    CantCerrado: number;
    CantObservadoEspecialista: number;
    CantReemplazado: number;
    CantEliminado: number;
    ListReporteUsuarios:ReporteUsuarioListDto[];
    ListFlujoValidacion:FlujoValidacionListDto[];
    ListRegCerrados:RankingRegCerradosListDto[];
    ListMejorTiempo:MejorTiempoListDto[];
}
export class ReporteGetDto implements IReporteGetDto {
    CantEmpadronadores: number;
    CantSupervisores: number;
    CantEspecialistas: number;
    CantCompletados: number;
    CantEnProgreso: number;
    CantNoIniciado: number;
    //Cantidades-Empadronador
    CantParaRevisar: number;
    CantTrabajoGabinete: number;
    CantEnAlerta: number;
    //Cantidades-Supervisor
    CantParaValidar: number;
    CantObservadoSupervisor: number;
    CantParaRegistrar: number;
    CantArbitraje: number;
    //Cantidades-Especialista
    CantCerrado: number;
    CantObservadoEspecialista: number;
    CantReemplazado: number;
    CantEliminado: number;
    ListReporteUsuarios:ReporteUsuarioListDto[]=[];
    ListFlujoValidacion:FlujoValidacionListDto[]=[];
    ListRegCerrados:RankingRegCerradosListDto[]=[];
    ListMejorTiempo:MejorTiempoListDto[]=[];
    constructor(data?: IReporteGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.CantEmpadronadores = _data["CantEmpadronadores"];
            this.CantSupervisores = _data["CantSupervisores"];
            this.CantEspecialistas = _data["CantEspecialistas"];
            this.CantCompletados = _data["CantCompletados"];
            this.CantEnProgreso = _data["CantEnProgreso"];
            this.CantNoIniciado = _data["CantNoIniciado"];
            this.CantParaRevisar = _data["CantParaRevisar"];
            this.CantTrabajoGabinete = _data["CantTrabajoGabinete"];
            this.CantEnAlerta = _data["CantEnAlerta"];
            this.CantParaValidar = _data["CantParaValidar"];
            this.CantObservadoSupervisor = _data["CantObservadoSupervisor"];
            this.CantParaRegistrar = _data["CantParaRegistrar"];
            this.CantArbitraje = _data["CantArbitraje"];
            this.CantCerrado = _data["CantCerrado"];
            this.CantObservadoEspecialista = _data["CantObservadoEspecialista"];
            this.CantReemplazado = _data["CantReemplazado"];
            this.CantEliminado = _data["CantEliminado"];
            if (Array.isArray(_data["ListReporteUsuarios"]) && _data["ListReporteUsuarios"].length > 0) {
                this.ListReporteUsuarios = [] as any;
                for (let item of _data["ListReporteUsuarios"])
                    this.ListReporteUsuarios!.push(ReporteUsuarioListDto.fromJS(item));
            }
            if (Array.isArray(_data["ListFlujoValidacion"]) && _data["ListFlujoValidacion"].length > 0) {
                this.ListFlujoValidacion = [] as any;
                for (let item of _data["ListFlujoValidacion"])
                    this.ListFlujoValidacion!.push(FlujoValidacionListDto.fromJS(item));
            }
            if (Array.isArray(_data["ListRegCerrados"]) && _data["ListRegCerrados"].length > 0) {
                this.ListRegCerrados = [] as any;
                for (let item of _data["ListRegCerrados"])
                    this.ListRegCerrados!.push(RankingRegCerradosListDto.fromJS(item));
            }
            if (Array.isArray(_data["ListMejorTiempo"]) && _data["ListMejorTiempo"].length > 0) {
                this.ListMejorTiempo = [] as any;
                for (let item of _data["ListMejorTiempo"])
                    this.ListMejorTiempo!.push(MejorTiempoListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ReporteGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReporteGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

//Listados


export interface IReporteUsuarioListDto {
    Usuario:String;
    Avance:number;
    Cambio:number;
    CantMarcoLista:number;
    Perfil:String;
    RegCerrados:number;
}
export class ReporteUsuarioListDto implements IReporteUsuarioListDto {
    Usuario:String;
    Avance:number;
    Cambio:number;
    CantMarcoLista:number;
    Perfil:String;
    RegCerrados:number;
    constructor(data?: IReporteUsuarioListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.Usuario = _data["Usuario"];
            this.Avance = _data["Avance"];
            this.Cambio = _data["Cambio"];
            this.CantMarcoLista = _data["CantMarcoLista"];
            this.Perfil = _data["Perfil"];
            this.RegCerrados = _data["RegCerrados"];
        }
    }
    static fromJS(data: any): ReporteUsuarioListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReporteUsuarioListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export interface IFlujoValidacionListDto {
    Empresa:String;
    Tiempo:String;
    NumTiempo:number;
}
export class FlujoValidacionListDto implements IFlujoValidacionListDto {
    Empresa:String;
    Tiempo:String;
    NumTiempo:number;
    constructor(data?: IFlujoValidacionListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.Empresa = _data["Empresa"];
            this.Tiempo = _data["Tiempo"];
            this.NumTiempo = _data["NumTiempo"];
        }
    }
    static fromJS(data: any): FlujoValidacionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new FlujoValidacionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export interface IRankingRegCerradosListDto {
    Usuario:String;
    CantMarcoLista:number;
    Tiempo:String;
    NumTiempo:number;
}
export class RankingRegCerradosListDto implements IRankingRegCerradosListDto {
    Usuario:String;
    CantMarcoLista:number;
    Tiempo:String;
    NumTiempo:number;
    constructor(data?: IRankingRegCerradosListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.Usuario = _data["Usuario"];
            this.CantMarcoLista = _data["CantMarcoLista"];
            this.Tiempo = _data["Tiempo"];
            this.NumTiempo = _data["NumTiempo"];
        }
    }
    static fromJS(data: any): RankingRegCerradosListDto {
        data = typeof data === 'object' ? data : {};
        let result = new RankingRegCerradosListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export interface IMejorTiempoListDto {
    Empresa:String;
    Usuario:String;
    NumTiempo:number;
    Tiempo:String;
}
export class MejorTiempoListDto implements IMejorTiempoListDto {
    Empresa:String;
    Usuario:String;
    NumTiempo:number;
    Tiempo:String;
    constructor(data?: IMejorTiempoListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.Empresa = _data["Empresa"];
            this.Usuario = _data["Usuario"];
            this.NumTiempo = _data["NumTiempo"];
            this.Tiempo = _data["Tiempo"];
        }
    }
    static fromJS(data: any): MejorTiempoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new MejorTiempoListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}