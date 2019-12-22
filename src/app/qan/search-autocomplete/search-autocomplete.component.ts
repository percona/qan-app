import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterMenuService } from '../filter-menu/filter-menu.service';
import { FilterSearchService } from '../../core/services/filter-search.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../profile/qan-profile.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-qan-search',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit, OnDestroy {

  public selected: any = [];
  private autocomplete$: Subscription;
  autocomplete: any = [];

  constructor(
    private qanFilterService: FilterMenuService,
    private qanProfileService: QanProfileService,
    private filterSearchService: FilterSearchService,
  ) {
    this.autocomplete$ = this.qanFilterService.getAutocompleteFilters
      .subscribe(configs => {
        this.autocomplete = configs
      });

    this.qanFilterService.getSelected.subscribe(response => {
      this.selected = response.filter(item => !item.groupName.endsWith('_id'));
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.autocomplete$.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  addToSelected(item) {
    item.state = true;
    this.selected.push(item);
    this.qanFilterService.updateSelected(this.selected);
  }

  removeAllFromSelected() {
    this.selected = [];
    this.qanFilterService.updateSelected(this.selected);
  }

  removeFromSelected(filter) {
    filter.state = false;
    this.selected = this.selected.filter(item => item['urlParamName'] !== filter.value.urlParamName);
    this.selected.forEach(item => item['state'] = true);
    this.qanFilterService.updateSelected(this.selected);
  }

  autocompleteSearch = (term: string, item: any) => {
    return this.filterSearchService.findBySearch(item.filterName, term)
      || this.filterSearchService.findBySearch(item.groupName, term);
  };

  addCustomScroll() {
    setTimeout(() => new PerfectScrollbar('.ng-dropdown-panel-items'), 0)
  }

  humanizeLabelGroup(groupName) {
    return this.qanFilterService.humanNamesForGroup(groupName);
  }
}
