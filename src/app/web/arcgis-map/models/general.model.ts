import { Output, EventEmitter } from '@angular/core';

export class FieldTableDataComponent {
  name: string='';
  alias: string='';
  type?: string;
  visible?: boolean;
  sort?: boolean;
  sortDirection?: string;
  filter?: boolean;
  downloadFileIcon?: string;
  downloadFileUrl?: string;
}

export class ConfigTableDataComponent {
  searchField: string='';
  searchSrcImg: string='';
  searchEvent: boolean=false;
}

export class ConfigTableExport {
  title: string='';
  header: ConfigTableExportHeader[]=[];
  filename: string='';
  isExport: boolean=false;
}

export class ConfigTableExportHeader {
  name: string='';
  alias: string='';
  format?: any;
  width?: number;

  constructor() {
    this.format = 'string';
    this.width = 20;
  }
}

export class RandomColors {
  size: number;
  light: boolean;
  bright: boolean;

  constructor() {
    this.size = 0;
    this.light = false;
    this.bright = false;
  }

  generate(): string[] {
    const colors: string[] = [];
    for (let i = 0; i < this.size; i++) {
      if (this.bright) {
        colors.push(this.getSwitchColors());
      } else {
        colors.push(this.getColor());
      }
    }
    return colors;
  }

  private getColor(): string {
    let color: string;
    let min: number;
    let max: number;
    if (this.light) {
      min = 130; max = 200;
    } else {
      min = 50; max = 150;
    }
    const r = this.getRandomNumberBetween(min, max);
    const g = this.getRandomNumberBetween(min, max);
    const b = this.getRandomNumberBetween(min, max);
    color = this.getRGBtoHex(r, g, b);
    return color;
  }

  private getRGBtoHex(r: number, g: number, b: number): string {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  private componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  private getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private getSwitchColors() {
    let r: number; let g: number; let b: number; let rg: number; let gb: number; let rb: number;
    const range = 255;
    const sep = range / 4;
    do {
      r = Math.floor(Math.random() * range);
      g = Math.floor(Math.random() * range);
      b = Math.floor(Math.random() * range);

      rg = Math.abs(r - g);
      gb = Math.abs(g - b);
      rb = Math.abs(r - b);
    } while (rg < sep || gb < sep || rb < sep);


    const rStr = this.rgbtohex(r);
    const gStr = this.rgbtohex(g);
    const bStr = this.rgbtohex(b);
    const final = '#' + rStr + gStr + bStr;

    return final;
  }

  private rgbtohex(rgb:any) {
    let first; let second;
    first = Math.floor(rgb / 16);
    second = rgb % 16;
    first = first.toString(16);
    second = second.toString(16);
    const rgbtohex = first + second;
    return rgbtohex;
  }

}

export class Emission {
  type: string='';
  transmitter: any;
}

export class ItemDropdownIconComponent {
  imgSrc: string='';
  title: string='';
}

export class ConfigListFilesDataComponent {
  fieldNameUrl: string='';
  fieldNameFile: string='';
  fieldNameDate: string='';
  fieldNameType: string='';
  filedNameLanguage: string='';
}

export class GroupItemsFiles {
  year: number;
  items: ItemFile[];

  constructor(year: number) {
    this.year = year;
    this.items = [];
  }
}

export class ItemFile {
  date: Date;
  fileName: string;
  url: string;
  type: string;
  language: string;

  constructor(date: Date, fileName: string, type: string, url: string, language: string) {
    this.date = date;
    this.fileName = fileName;
    this.url = url;
    this.type = type;
    this.language = language;
  }
}

export class CoordinatesStatusMap {
  zoneUTM: number=0;
  xUTM: number=0;
  yUTM: number=0;
  longitude: number=0;
  latitude: number=0;
  height: number=0;
}
