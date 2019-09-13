import { Input, Pipe, PipeTransform } from '@angular/core';
import { HumanizeSymbolPipe } from '../../../shared/humanize-symbol-pipe';
import { FilterMenuService } from '../../../qan/filter-menu/filter-menu.service';

@Pipe({
  name: 'ellipsisMiddle'
})
export class EllipsisMiddlePipe implements PipeTransform {
  public defaultCharsLimit = 9;

  constructor(
    private _humanizeSymbol: HumanizeSymbolPipe,
    private filterMenuService: FilterMenuService
  ) {

  }


  transform(value: any, charsLimit?: number): any {
    if (charsLimit === undefined) {
      charsLimit = this.defaultCharsLimit
    }
    const charsToViewEnd = 4;
    const charsToViewBegin = charsLimit - charsToViewEnd - 3;
    return this.filterMenuService.checkForTooltip(value, charsLimit) ?
      value.slice(0, charsToViewBegin) + '...' + value.slice(-charsToViewEnd) : this._humanizeSymbol.transform(value);
  }

}
