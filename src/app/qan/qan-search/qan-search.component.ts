import { Component, OnDestroy, OnInit } from '@angular/core';
import { QanFilterService } from '../qan-filter/qan-filter.service';
import { FilterSearchService } from '../../core/services/filter-search.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { GetProfileBody, QanTableService } from '../qan-table/qan-table.service';
import { FiltersSearchModel } from '../qan-filter/models/filters-search.model';

@Component({
  selector: 'app-qan-search',
  templateUrl: './qan-search.component.html',
  styleUrls: ['./qan-search.component.scss']
})
export class QanSearchComponent implements OnInit, OnDestroy {

  public selected: Array<{}> = [];
  private filterSubscription$: Subscription;
  public filters: any;
  public profileParams: GetProfileBody;

  autocomplete = [];
  autocompleteBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;

  constructor(private qanFilterService: QanFilterService,
    private qanTableService: QanTableService,
    private filterSearchService: FilterSearchService) {
    this.profileParams = this.qanTableService.getProfileParamsState;

    this.qanFilterService.filterSource.pipe(
      map(response => {
        this.filters = response;
        const modif = response.map(responseItem => responseItem.items.map(item => new FiltersSearchModel(responseItem.filterGroup, item)));
        return [].concat(...modif)
      })
    ).subscribe(configs => {
      this.autocomplete = configs;
      this.selected = configs.filter(group => group.state);
      this.autocompleteBuffer = this.autocomplete.slice(0, this.bufferSize);
    });
  }

  ngOnInit() {
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.autocomplete.length === this.autocompleteBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.autocompleteBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.autocompleteBuffer.length;
    const more = this.autocomplete.slice(len, this.bufferSize + len);
    this.autocompleteBuffer = this.autocompleteBuffer.concat(more);
  }

  ngOnDestroy() {
    this.filterSubscription$.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  // toggleItem(event) {
  //   if (event.groupName) {
  //     const group = this.filters.find(filter => event.groupName === filter.filterGroup);
  //     const itemS = group.items.find(groupItem => groupItem.value === event.filterName);
  //     itemS.state = !itemS.state;
  //     this.qanFilterService.updateFilterConfigs(this.filters);
  //   }
  // }

  changeFilterState(event: any = false) {
    if (!event) {
      this.resetAll();
    }
    if (event && event.groupName) {
      this.toggleItem(event);
    }
    this.qanFilterService.updateFilterConfigs(this.filters);
  }

  toggleItem(item) {
    const group = this.filters.find(filter => item.groupName === filter.filterGroup);
    const itemS = group.items.find(groupItem => groupItem.value === item.filterName);
    itemS.state = !itemS.state;
  }

  resetAll() {
    this.filters.forEach(filter => filter.items.forEach(item => item.state = false));
  }

  autocompleteSearch = (term: string, item: any) => {
    return this.filterSearchService.findBySearch(item.filterName, term)
      || this.filterSearchService.findBySearch(item.groupName, term);
  };
}
