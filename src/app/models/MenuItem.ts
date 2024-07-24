export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}


export interface IResponseMenuItemGetDto {
    success: boolean;
    message: String;
    datos: MenuItemGetDto[];
}
export class ResponseMenuItemGetDto implements IResponseMenuItemGetDto {
    success: boolean;
    message: String;
    datos: MenuItemGetDto[];
    constructor(data?: IResponseMenuItemGetDto) {
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
                    this.datos!.push(MenuItemGetDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ResponseMenuItemGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseMenuItemGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;  
        return data;
    }
}


export interface IMenuItemGetDto {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;    
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
    subItems?: MenuItemGetDto[];
}
export class MenuItemGetDto implements IMenuItemGetDto {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;    
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
    subItems?: MenuItemGetDto[]=[];
    constructor(data?: IMenuItemGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.label = _data["label"];
            this.icon = _data["icon"];
            this.link = _data["link"];
            this.isTitle = _data["isTitle"];
            this.parentId = _data["parentId"];
            if (Array.isArray(_data["subItems"]) && _data["subItems"].length > 0) {
                this.subItems = [] as any;
                for (let item of _data["subItems"])
                    this.subItems!.push(MenuItemGetDto.fromJS(item));
            }   
        }
    }
    static fromJS(data: any): MenuItemGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new MenuItemGetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}