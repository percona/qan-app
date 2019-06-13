import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanLabels'
})
export class HumanLabelsPipe implements PipeTransform {
  public lablesNames = {
    'qan-mysql-perfschema-agent': 'MySQL Performance Schema',
    'mysql': 'MySQL'
  };

  transform(value: any, args?: any): any {
    return value in this.lablesNames ? this.lablesNames[value] : value
  }

}
