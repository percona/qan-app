import { Pipe, PipeTransform } from '@angular/core';
import { HumanizeSymbolPipe } from '../../../shared/humanize-symbol-pipe';
import { FilterMenuService } from '../../../qan/filter-menu/filter-menu.service';

@Pipe({
  name: 'ellipsisMiddle'
})
export class EllipsisMiddlePipe implements PipeTransform {
  public charsLimit = 9;
  public charsToView = 4;

  constructor(
    private _humanizeSymbol: HumanizeSymbolPipe,
    private filterMenuService: FilterMenuService
  ) {

  }


  transform(value: any, args?: any): any {
    return this.filterMenuService.checkForTooltip(value) ?
      value.slice(0, this.charsToView) + '...' + value.slice(-this.charsToView) : this._humanizeSymbol.transform(value);
  }

}
