import { Pipe, PipeTransform } from '@angular/core';
import { HumanizeSymbolPipe } from '../../../shared/humanize-symbol-pipe';

@Pipe({
  name: 'ellipsisMiddle'
})
export class EllipsisMiddlePipe implements PipeTransform {
  public charsLimit = 9;
  public charsToView = 4;

  constructor(private _humanizeSymbol: HumanizeSymbolPipe) {

  }


  transform(value: any, args?: any): any {
    return value.length > this.charsLimit && value.includes('id') ?
      value.slice(0, this.charsToView) + '...' + value.slice(-this.charsToView) : this._humanizeSymbol.transform(value);
  }

}
