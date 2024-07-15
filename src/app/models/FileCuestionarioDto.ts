export interface IFileCuestionarioDto {
    formData: File;
    Ruc: String;
    Periodo: String;
}
export class FileCuestionarioDto implements IFileCuestionarioDto {
    formData: File;
    Ruc: String;
    Periodo: String;
    constructor(data?: IFileCuestionarioDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.formData = _data["formData"];
            this.Ruc = _data["Ruc"];
            this.Periodo = _data["Periodo"];
        }
    }
    static fromJS(data: any): FileCuestionarioDto {
        data = typeof data === 'object' ? data : {};
        let result = new FileCuestionarioDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["formData"] = this.formData;
        data["Ruc"] = this.Ruc;
        data["Periodo"] = this.Periodo;
        return data;
    }
}