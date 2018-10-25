import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortingTable'})
export class SortingTablePipe implements PipeTransform {

  transform(instance: any[], path: string[], order: number = 1): any[] {
    // Check if is not null
    if (!instance || !path || !order) {
      return instance;
    }

    return instance.sort((a: any, b: any) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      });

      // Order * (-1): We change our order
      return a > b ? order : order * (-1);
    })
  }

}
