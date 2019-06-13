import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanizeSymbolPipe'
})
export class HumanizeSymbolPipe implements PipeTransform {
  public names = {
    'qan-mysql-perfschema-agent': 'MySQL Performance Schema',
    'mysql': 'MySQL'
  };

  transform(value: any, args?: any): any {
    return value in this.names ? this.names[value] : value
  }

}
