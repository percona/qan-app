import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { QanFilterService } from '../qan-filter/qan-filter.service';
import { FilterSearchService } from '../../core/services/filter-search.service';
import { QanFilterModel } from '../../core/models/qan-fliter.model';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { FiltersSearchModel } from './models/filters-search.model';
import { QanTableService } from '../qan-table/qan-table.service';

@Component({
  selector: 'app-qan-search',
  templateUrl: './qan-search.component.html',
  styleUrls: ['./qan-search.component.scss']
})
export class QanSearchComponent implements OnInit, OnDestroy {

  @ViewChild('tabs')
  private tabs: NgbTabset;

  public autocomplete: Array<{}> = [];
  public selected: Array<{}> = [];
  private filterSubscription$: Subscription;
  public filters: any;
  public scrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private qanFilterService: QanFilterService,
    private qanTableService: QanTableService,
    private filterSearchService: FilterSearchService) {
    this.filterSubscription$ = this.qanFilterService.filterSource.pipe(
      map(groups => groups.map(group => group.items.map(item => new FiltersSearchModel(group.filterGroup, item))))
    ).subscribe(items => {
      this.filters = [].concat(...items);
      this.selected = this.filters.filter(item => item['state']);
      this.groupSelected();
    });


  }

  ngOnInit() {
    // this.filters.forEach(group => {
    //   this.autocomplete = [...this.autocomplete, ...group['values'].slice()];
    // });
  }

  ngOnDestroy() {
    this.filterSubscription$.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  changeFilterState(event: any = new QanFilterModel(), state = false) {
    if (event.groupName) {
      const filtersGroup = this.qanTableService.getFiltersState.find(group => group.filterGroup === event.groupName);
      filtersGroup.items.find(value => value.value === event.filterName).state = state;
      this.qanFilterServie.updateFilterConfigs(this.qanTableService.getFiltersState);
    } else {
      this.qanTableService.getFiltersState.forEach(group => {
        group.items.forEach(value => value.state = state);
      });
    }
    this.qanFilterService.updateFilterConfigs(this.filters);
  }

  autocompleteSearch = (term: string, item: any) => {
    return this.filterSearchService.findBySearch(item.filterName, term)
      || this.filterSearchService.findBySearch(item.groupName, term);
  };
}
