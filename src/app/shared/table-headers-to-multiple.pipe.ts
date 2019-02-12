import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tableHeadersToMultiple'
})
export class TableHeadersToMultiplePipe implements PipeTransform {

  transform(value: string) {
    let returnValue;
    switch (value) {
      case 'Query':
        returnValue = 'Queries';
        break;
      case 'Server':
        returnValue = 'Servers';
        break;
      case 'Host':
        returnValue = 'Hosts';
        break;
      default:
        returnValue = '';
    }
    return returnValue;
  }

}
