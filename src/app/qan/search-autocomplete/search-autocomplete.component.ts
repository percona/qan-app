import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterMenuService } from '../filter-menu/filter-menu.service';
import { FilterSearchService } from '../../core/services/filter-search.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { FiltersSearchModel } from '../filter-menu/models/filters-search.model';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';

@Component({
  selector: 'app-qan-search',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit, OnDestroy {

  public selected: Array<{}> = [];
  private filterSubscription$: Subscription;
  public filters: any;
  public currentParams: GetProfileBody;

  autocomplete = [];
  autocompleteBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;

  constructor(private qanFilterService: FilterMenuService,
    private qanProfileService: QanProfileService,
    private filterSearchService: FilterSearchService) {
    this.currentParams = JSON.parse(JSON.stringify(this.qanProfileService.getProfileParams.getValue()));

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
