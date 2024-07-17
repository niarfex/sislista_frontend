import { ArchivoGetDto } from "./Archivo";
import { FundoGetDto } from "./Fundo";
import { InformanteGetDto } from "./Informante";
import { PecuarioGetDto } from "./Pecuario";
import { SelectTipoDto } from "./SelectTipo";

export interface IResponseGestionRegistroListDto {
    success: boolean;
    message: String;
    datos: GestionRegistroListDto[];
}
export class ResponseGestionRegistroListDto implements IResponseGestionRegistroListDto {
    success: boolean;
    message: String;
    datos: GestionRegistroListDto[];
    constructor(data?: IResponseGestionRegistroListDto) {
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
                    this.datos!.push(GestionRegistroListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseGestionRegistroListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseGestionRegistroListDto();
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

export interface IGestionRegistroListDto {
    IdMarcoLista: number;
    CodigoUUID: String;
    NumeroDocumento: String;
    FechaRegistro: Date;
    UsuarioCreacion: String;
    FechaActualizacion: Date;
    UsuarioActualizacion: String;
    IdPeriodo: number;
    Periodo: String;
    NombreCompleto: String;
    TipoExplotacion: String;
    Clasificacion: String;
    CodigoEstadoEntrevista: String;
    CodigoEstadoSupervision: String;
    CodigoEstadoValidacion: String;
    CodigoEstadoRegistro: String;
    NombreEstadoEntrevista: String;
    NombreEstadoSupervision: String;
    NombreEstadoValidacion: String;
    NombreEstadoRegistro: String;
}
export class GestionRegistroListDto implements IGestionRegistroListDto {
    IdMarcoLista: number;
    CodigoUUID: String;
    NumeroDocumento: String;
    FechaRegistro: Date;
    UsuarioCreacion: String;
    FechaActualizacion: Date;
    UsuarioActualizacion: String;
    IdPeriodo: number;
    Periodo: String;
    NombreCompleto: String;
    TipoExplotacion: String;
    Clasificacion: String;
    CodigoEstadoEntrevista: String;
    CodigoEstadoSupervision: String;
    CodigoEstadoValidacion: String;
    CodigoEstadoRegistro: String;
    NombreEstadoEntrevista: String;
    NombreEstadoSupervision: String;
    NombreEstadoValidacion: String;
    NombreEstadoRegistro: String;
    constructor(data?: IGestionRegistroListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.IdMarcoLista = _data["IdMarcoLista"];
            this.CodigoUUID = _data["CodigoUUID"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.FechaRegistro = _data["FechaRegistro"];
            this.UsuarioCreacion = _data["UsuarioCreacion"];
            this.FechaActualizacion = _data["FechaActualizacion"];
            this.UsuarioActualizacion = _data["UsuarioActualizacion"];
            this.IdPeriodo = _data["IdPeriodo"];
            this.Periodo = _data["Periodo"];
            this.NombreCompleto = _data["NombreCompleto"];
            this.TipoExplotacion = _data["TipoExplotacion"];
            this.Clasificacion = _data["Clasificacion"];
            this.CodigoEstadoEntrevista = _data["CodigoEstadoEntrevista"];
            this.CodigoEstadoSupervision = _data["CodigoEstadoSupervision"];
            this.CodigoEstadoValidacion = _data["CodigoEstadoValidacion"];
            this.CodigoEstadoRegistro = _data["CodigoEstadoRegistro"];
            this.NombreEstadoEntrevista = _data["NombreEstadoEntrevista"];
            this.NombreEstadoSupervision = _data["NombreEstadoSupervision"];
            this.NombreEstadoValidacion = _data["NombreEstadoValidacion"];
            this.NombreEstadoRegistro = _data["NombreEstadoRegistro"];
        }
    }
    static fromJS(data: any): GestionRegistroListDto {
        data = typeof data === 'object' ? data : {};
        let result = new GestionRegistroListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["IdMarcoLista"] = this.IdMarcoLista;
        return data;
    }
}

export interface IResponseGestionRegistroGetDto {
    success: boolean;
    message: String;
    datos: GestionRegistroGetDto;
}
export class ResponseGestionRegistroGetDto implements IResponseGestionRegistroGetDto {
    success: boolean;
    message: String;
    datos: GestionRegistroGetDto;
    constructor(data?: IResponseGestionRegistroGetDto) {
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
            this.datos = GestionRegistroGetDto.fromJS(_data["data"]);
        }
    }
    static fromJS(data: any): ResponseGestionRegistroGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseGestionRegistroGetDto();
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


export interface IGestionRegistroGetDto {
    Id: number;
    CodigoUUID: String;
    IdPPA: number;
    IdMarcoLista: number;
    IdCondicionJuridica: number;
    IdCondicionJuridicaOtros: number;
    IdTipoDocumento: number;
    CodigoIdentificacion: String;
    NumeroDocumento: String;
    Nombre: String;
    ApellidoPaterno: String;
    ApellidoMaterno: String;
    RazonSocial: String;
    DireccionFiscalDomicilio: String;
    IdUbigeo: String;
    IdTipoExplotacion: number;
    TieneRuc: String;
    Telefono: String;
    Celular: String;
    CorreoElectronico: String;
    PaginaWeb: String;
    NombreRepLegal: String;
    CorreoRepLegal: String;
    CelularRepLegal: String;
    CantidadFundo: String;
    EstadoEntrevista: number;
    IdPeriodo: number;
    FechaActualizacion: Date;
    ListPeriodos: SelectTipoDto[];
    ListCondicionJuridica: SelectTipoDto[];
    ListCondicionJuridicaOtros: SelectTipoDto[];
    ListTipoDocumento: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    ListProvincia: SelectTipoDto[];
    ListDistrito: SelectTipoDto[];
    ListTipoExplotacion: SelectTipoDto[];
    ListFundos: FundoGetDto[];
    ListPecuarios: PecuarioGetDto[];
    ListArchivos:ArchivoGetDto[];
    ListInformantes: InformanteGetDto[];
    ListTenencia: SelectTipoDto[];
    ListUsoTierra: SelectTipoDto[];
    ListCultivo: SelectTipoDto[];
    ListUsoNoAgricola: SelectTipoDto[];
    ListEstadoEntrevista: SelectTipoDto[];
    ListTipoInformacion: SelectTipoDto[];
    ListLineaProduccion: SelectTipoDto[];
    ListEspecies: SelectTipoDto[];
}
export class GestionRegistroGetDto implements IGestionRegistroGetDto {
    Id: number;
    CodigoUUID: String;
    IdPPA: number;
    IdMarcoLista: number;
    IdCondicionJuridica: number;
    IdCondicionJuridicaOtros: number;
    IdTipoDocumento: number;
    CodigoIdentificacion: String;
    NumeroDocumento: String;
    Nombre: String;
    ApellidoPaterno: String;
    ApellidoMaterno: String;
    RazonSocial: String;
    DireccionFiscalDomicilio: String;
    IdUbigeo: String;
    IdTipoExplotacion: number;
    TieneRuc: String;
    Telefono: String;
    Celular: String;
    CorreoElectronico: String;
    PaginaWeb: String;
    NombreRepLegal: String;
    CorreoRepLegal: String;
    CelularRepLegal: String;
    CantidadFundo: String;
    EstadoEntrevista: number;
    IdPeriodo: number;
    FechaActualizacion: Date;
    ListPeriodos: SelectTipoDto[];
    ListCondicionJuridica: SelectTipoDto[];
    ListCondicionJuridicaOtros: SelectTipoDto[];
    ListTipoDocumento: SelectTipoDto[];
    ListDepartamento: SelectTipoDto[];
    ListProvincia: SelectTipoDto[];
    ListDistrito: SelectTipoDto[];
    ListTipoExplotacion: SelectTipoDto[];
    ListFundos: FundoGetDto[] = [];
    ListPecuarios: PecuarioGetDto[] = [];
    ListArchivos:ArchivoGetDto[]= [];
    ListInformantes: InformanteGetDto[] = [];
    ListTenencia: SelectTipoDto[];
    ListUsoTierra: SelectTipoDto[];
    ListCultivo: SelectTipoDto[];
    ListUsoNoAgricola: SelectTipoDto[];
    ListEstadoEntrevista: SelectTipoDto[];
    ListTipoInformacion: SelectTipoDto[];
    ListLineaProduccion: SelectTipoDto[];
    ListEspecies: SelectTipoDto[];

    constructor(data?: IGestionRegistroGetDto) {
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
            this.CodigoUUID = _data["CodigoUUID"];
            this.IdPPA = _data["IdPPA"];
            this.IdMarcoLista = _data["IdMarcoLista"];
            this.IdCondicionJuridica = _data["IdCondicionJuridica"];
            this.IdCondicionJuridicaOtros = _data["IdCondicionJuridicaOtros"];
            this.IdTipoDocumento = _data["IdTipoDocumento"];
            this.CodigoIdentificacion = _data["CodigoIdentificacion"];
            this.NumeroDocumento = _data["NumeroDocumento"];
            this.Nombre = _data["Nombre"];
            this.ApellidoPaterno = _data["ApellidoPaterno"];
            this.ApellidoMaterno = _data["ApellidoMaterno"];
            this.RazonSocial = _data["RazonSocial"];
            this.DireccionFiscalDomicilio = _data["DireccionFiscalDomicilio"];
            this.IdUbigeo = _data["IdUbigeo"];
            this.IdTipoExplotacion = _data["IdTipoExplotacion"];
            this.TieneRuc = _data["TieneRuc"];
            this.Telefono = _data["Telefono"];
            this.Celular = _data["Celular"];
            this.CorreoElectronico = _data["CorreoElectronico"];
            this.PaginaWeb = _data["PaginaWeb"];
            this.NombreRepLegal = _data["NombreRepLegal"];
            this.CorreoRepLegal = _data["CorreoRepLegal"];
            this.CelularRepLegal = _data["CelularRepLegal"];
            this.CantidadFundo = _data["CantidadFundo"];
            this.EstadoEntrevista = _data["EstadoEntrevista"];
            this.IdPeriodo = _data["IdPeriodo"];
            this.FechaActualizacion = _data["FechaActualizacion"];
            if (Array.isArray(_data["ListPeriodos"]) && _data["ListPeriodos"].length > 0) {
                this.ListPeriodos = [] as any;
                for (let item of _data["ListPeriodos"])
                    this.ListPeriodos!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListCondicionJuridica"]) && _data["ListCondicionJuridica"].length > 0) {
                this.ListCondicionJuridica = [] as any;
                for (let item of _data["ListCondicionJuridica"])
                    this.ListCondicionJuridica!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListCondicionJuridicaOtros"]) && _data["ListCondicionJuridicaOtros"].length > 0) {
                this.ListCondicionJuridicaOtros = [] as any;
                for (let item of _data["ListCondicionJuridicaOtros"])
                    this.ListCondicionJuridicaOtros!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListTipoDocumento"]) && _data["ListTipoDocumento"].length > 0) {
                this.ListTipoDocumento = [] as any;
                for (let item of _data["ListTipoDocumento"])
                    this.ListTipoDocumento!.push(SelectTipoDto.fromJS(item));
            }
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
            if (Array.isArray(_data["ListTipoExplotacion"]) && _data["ListTipoExplotacion"].length > 0) {
                this.ListTipoExplotacion = [] as any;
                for (let item of _data["ListTipoExplotacion"])
                    this.ListTipoExplotacion!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListFundos"]) && _data["ListFundos"].length > 0) {
                this.ListFundos = [] as any;
                for (let item of _data["ListFundos"])
                    this.ListFundos!.push(FundoGetDto.fromJS(item));
            }
            if (Array.isArray(_data["ListPecuarios"]) && _data["ListPecuarios"].length > 0) {
                this.ListPecuarios = [] as any;
                for (let item of _data["ListPecuarios"])
                    this.ListPecuarios!.push(PecuarioGetDto.fromJS(item));
            }
            if (Array.isArray(_data["ListArchivos"]) && _data["ListArchivos"].length > 0) {
                this.ListArchivos = [] as any;
                for (let item of _data["ListArchivos"])
                    this.ListArchivos!.push(ArchivoGetDto.fromJS(item));
            }
            if (Array.isArray(_data["ListInformantes"]) && _data["ListInformantes"].length > 0) {
                this.ListInformantes = [] as any;
                for (let item of _data["ListInformantes"])
                    this.ListInformantes!.push(InformanteGetDto.fromJS(item));
            }
            if (Array.isArray(_data["ListTenencia"]) && _data["ListTenencia"].length > 0) {
                this.ListTenencia = [] as any;
                for (let item of _data["ListTenencia"])
                    this.ListTenencia!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListUsoTierra"]) && _data["ListUsoTierra"].length > 0) {
                this.ListUsoTierra = [] as any;
                for (let item of _data["ListUsoTierra"])
                    this.ListUsoTierra!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListCultivo"]) && _data["ListCultivo"].length > 0) {
                this.ListCultivo = [] as any;
                for (let item of _data["ListCultivo"])
                    this.ListCultivo!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListUsoNoAgricola"]) && _data["ListUsoNoAgricola"].length > 0) {
                this.ListUsoNoAgricola = [] as any;
                for (let item of _data["ListUsoNoAgricola"])
                    this.ListUsoNoAgricola!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListEstadoEntrevista"]) && _data["ListEstadoEntrevista"].length > 0) {
                this.ListEstadoEntrevista = [] as any;
                for (let item of _data["ListEstadoEntrevista"])
                    this.ListEstadoEntrevista!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListTipoInformacion"]) && _data["ListTipoInformacion"].length > 0) {
                this.ListTipoInformacion = [] as any;
                for (let item of _data["ListTipoInformacion"])
                    this.ListTipoInformacion!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListLineaProduccion"]) && _data["ListLineaProduccion"].length > 0) {
                this.ListLineaProduccion = [] as any;
                for (let item of _data["ListLineaProduccion"])
                    this.ListLineaProduccion!.push(SelectTipoDto.fromJS(item));
            }
            if (Array.isArray(_data["ListEspecies"]) && _data["ListEspecies"].length > 0) {
                this.ListEspecies = [] as any;
                for (let item of _data["ListEspecies"])
                    this.ListEspecies!.push(SelectTipoDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): GestionRegistroGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new GestionRegistroGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["CodigoUUID"] = this.CodigoUUID;
        data["IdPPA"] = this.IdPPA;
        data["IdMarcoLista"] = this.IdMarcoLista;
        data["IdCondicionJuridica"] = this.IdCondicionJuridica;
        data["IdCondicionJuridicaOtros"] = this.IdCondicionJuridicaOtros;
        data["IdTipoDocumento"] = this.IdTipoDocumento;
        data["CodigoIdentificacion"] = this.CodigoIdentificacion;
        data["NumeroDocumento"] = this.NumeroDocumento;
        data["Nombre"] = this.Nombre;
        data["ApellidoPaterno"] = this.ApellidoPaterno;
        data["ApellidoMaterno"] = this.ApellidoMaterno;
        data["RazonSocial"] = this.RazonSocial;
        data["DireccionFiscalDomicilio"] = this.DireccionFiscalDomicilio;
        data["IdUbigeo"] = this.IdUbigeo;
        data["IdTipoExplotacion"] = this.IdTipoExplotacion;
        data["TieneRuc"] = this.TieneRuc;
        data["Telefono"] = this.Telefono;
        data["Celular"] = this.Celular;
        data["CorreoElectronico"] = this.CorreoElectronico;
        data["PaginaWeb"] = this.PaginaWeb;
        data["NombreRepLegal"] = this.NombreRepLegal;
        data["CorreoRepLegal"] = this.CorreoRepLegal;
        data["CelularRepLegal"] = this.CelularRepLegal;
        data["CantidadFundo"] = this.CantidadFundo;
        data["EstadoEntrevista"] = this.EstadoEntrevista;
        data["IdPeriodo"] = this.IdPeriodo;
        if (Array.isArray(this.ListCondicionJuridica)) {
            data["ListCondicionJuridica"] = [];
            for (let item of this.ListCondicionJuridica)
                data["ListCondicionJuridica"].push(item.toJSON());
        }
        if (Array.isArray(this.ListCondicionJuridicaOtros)) {
            data["ListCondicionJuridicaOtros"] = [];
            for (let item of this.ListCondicionJuridicaOtros)
                data["ListCondicionJuridicaOtros"].push(item.toJSON());
        }
        if (Array.isArray(this.ListTipoDocumento)) {
            data["ListTipoDocumento"] = [];
            for (let item of this.ListTipoDocumento)
                data["ListTipoDocumento"].push(item.toJSON());
        }
        if (Array.isArray(this.ListDepartamento)) {
            data["ListDepartamento"] = [];
            for (let item of this.ListDepartamento)
                data["ListDepartamento"].push(item.toJSON());
        }
        if (Array.isArray(this.ListProvincia)) {
            data["ListProvincia"] = [];
            for (let item of this.ListProvincia)
                data["ListProvincia"].push(item.toJSON());
        }
        if (Array.isArray(this.ListDistrito)) {
            data["ListDistrito"] = [];
            for (let item of this.ListDistrito)
                data["ListDistrito"].push(item.toJSON());
        }
        if (Array.isArray(this.ListTipoExplotacion)) {
            data["ListTipoExplotacion"] = [];
            for (let item of this.ListTipoExplotacion)
                data["ListTipoExplotacion"].push(item.toJSON());
        }
        if (Array.isArray(this.ListFundos)) {
            data["ListFundos"] = [];
            for (let item of this.ListFundos)
                data["ListFundos"].push(item.toJSON());
        }
        if (Array.isArray(this.ListPecuarios)) {
            data["ListPecuarios"] = [];
            for (let item of this.ListPecuarios)
                data["ListPecuarios"].push(item.toJSON());
        }
        if (Array.isArray(this.ListArchivos)) {
            data["ListArchivos"] = [];
            for (let item of this.ListArchivos)
                data["ListArchivos"].push(item.toJSON());
        }
        if (Array.isArray(this.ListInformantes)) {
            data["ListInformantes"] = [];
            for (let item of this.ListInformantes)
                data["ListInformantes"].push(item.toJSON());
        }
        if (Array.isArray(this.ListTenencia)) {
            data["ListTenencia"] = [];
            for (let item of this.ListTenencia)
                data["ListTenencia"].push(item.toJSON());
        }
        if (Array.isArray(this.ListUsoTierra)) {
            data["ListUsoTierra"] = [];
            for (let item of this.ListUsoTierra)
                data["ListUsoTierra"].push(item.toJSON());
        }
        if (Array.isArray(this.ListCultivo)) {
            data["ListCultivo"] = [];
            for (let item of this.ListCultivo)
                data["ListCultivo"].push(item.toJSON());
        }
        if (Array.isArray(this.ListUsoNoAgricola)) {
            data["ListUsoNoAgricola"] = [];
            for (let item of this.ListUsoNoAgricola)
                data["ListUsoNoAgricola"].push(item.toJSON());
        }
        if (Array.isArray(this.ListEstadoEntrevista)) {
            data["ListEstadoEntrevista"] = [];
            for (let item of this.ListEstadoEntrevista)
                data["ListEstadoEntrevista"].push(item.toJSON());
        }
        if (Array.isArray(this.ListTipoInformacion)) {
            data["ListTipoInformacion"] = [];
            for (let item of this.ListTipoInformacion)
                data["ListTipoInformacion"].push(item.toJSON());
        }
        return data;
    }
}