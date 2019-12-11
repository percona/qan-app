import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FilterMenuService } from './filter-menu.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import _ from 'lodash';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit, OnChanges {
  public currentFilters: any = [];
  public filterScrollConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  @ViewChildren('checkBoxText') checkBoxText: QueryList<ElementRef>;
  @Input() set processLabels(filters: any) {
    this.currentFilters = filters || [];
    this.toggleLabels();
  }

  // isSelectable is used to display *Labels* in the filter component and
  // in object details label list component in different way.
  @Input()
  isSelectable = true;

  public expanded = {};
  public defaultLimit = 5;
  private charsLimit = 15;
  public selected: any = this.filterMenuService.getSelected.getValue();

  constructor(private filterMenuService: FilterMenuService) {
    this.filterMenuService.getSelected
      .pipe(catchError(() => of([])))
      .subscribe(response => {
        this.selected = response;
        this.toggleLabels();
      });
  }

  ngOnInit() { }

  ngOnChanges() { }

  toggleExpanded(group) {
    this.expanded[group.filterGroup] = !this.isExpanded(group);
  }

  setConfigs(selectedFilter) {
    const [filterName, groupName, state, count] = [...selectedFilter];
    const filter = {
      filterName: filterName,
      groupName: groupName,
      state: state,
      count: count,
      urlParamName: `${groupName}:${filterName}`
    };

    this.selected = this.makeSelectedArray(filter);
    this.filterMenuService.updateSelected(this.selected);
  }

  makeSelectedArray(filter) {
    if (filter.state) {
      this.selected.push(filter);
      return _.uniqBy(this.selected, function(elem) {
        return [elem.groupName, elem.filterName].join();
      });
    } else {
      return this.selected.filter(function(elem) {
        return (
          [elem.groupName, elem.filterName].join() !==
          [filter.groupName, filter.filterName].join()
        );
      });
    }
  }

  resetAllFilters() {
    this.currentFilters.forEach(group =>
      group.items.forEach(item => (item.state = false))
    );
  }

  checkSelectedFilters() {
    this.selected.forEach(selectedItem => {
      const group = this.currentFilters.find(
        filterGroup => filterGroup.filterGroup === selectedItem.groupName
      );
      if (group) {
        const filter = group.items.find(
          item => item.value === selectedItem.filterName
        );
        if (filter) {
          filter.state = true;
        }
      }
    });
  }

  toggleLabels() {
    if (this.currentFilters.length) {
      this.resetAllFilters();
      if (this.selected.length) {
        this.checkSelectedFilters();
      }
    }
  }

  humanizeLabels(groupName) {
    return this.filterMenuService.humanNamesForGroup(groupName);
  }

  isTooltip(value) {
    return FilterMenuService.checkForTooltip(value, this.charsLimit);
  }

  isExpanded(filterGroup) {
    return (
      this.expanded.hasOwnProperty(filterGroup.filterGroup) &&
      this.expanded[filterGroup.filterGroup]
    );
  }
}
