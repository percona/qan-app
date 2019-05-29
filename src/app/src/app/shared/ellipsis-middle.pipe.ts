import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsisMiddle'
})
export class EllipsisMiddlePipe implements PipeTransform {
  public charsLimit = 9;
  public charsToView = 4;

  transform(value: any, args?: any): any {
    return value.length > this.charsLimit ? value.slice(0, this.charsToView) + '...' + value.slice(-this.charsToView) : value;
  }

}
