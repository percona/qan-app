import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortingTable'})
export class SortingTablePipe implements PipeTransform {

  transform(instance: any[], path: string[], order: number = 1): any[] {
    // Check if is not null
    if (!instance || !path || !order) {
      return instance;
    }

    return instance.sort((a: string, b: string) => {
      // We go for each property followed by path
      path.forEach(property => {
        if (!a[property] || !b[property]) {
          return
        }

        a = a[property];
        b = b[property];
      });

      if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase() > b.toLowerCase() ? order : order * (-1); // Order * (-1): We change our order
      }
    })
  }

}
