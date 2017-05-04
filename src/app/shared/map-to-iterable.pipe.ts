import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'mapToIterable'
})
export class MapToIterablePipe implements PipeTransform  {
  transform(dict: Object): Array<{}> {
    if (dict === null) {
      return null;
    }
    const a: Array<{}> = [];
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}
