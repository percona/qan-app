import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {QanFilterService} from '../qan-filter/qan-filter.service';
import {FilterSearchService} from '../../core/services/filter-search.service';
import {QanFilterModel} from '../../core/models/qan-fliter.model';

@Component({
  selector: 'app-qan-search',
  templateUrl: './qan-search.component.html',
  styleUrls: ['./qan-search.component.scss']
})
export class QanSearchComponent implements OnInit, OnDestroy {

  @ViewChild('tabs')
  private tabs: NgbTabset;

  public isToggleMenu = false;
  public autocomplete: Array<{}> = [];
  public selected: Array<{}> = [];
  private filterSubscription: any;
  public filters: any;
  public scrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private qanFilterService: QanFilterService, private filterSearchService: FilterSearchService) {
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filters = items;
      this.selected = [];
      this.filters.forEach(group => {
        this.selected = [...this.selected, ...group.values.filter((value: any) => value.state)];
      });
      this.groupSelected();
    });
  }

  ngOnInit() {
    this.filters.forEach(group => {
      this.autocomplete = [...this.autocomplete, ...group['values'].slice()];
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  changeFilterState(event = new QanFilterModel(), state = false) {
    if (event.groupName) {
      const filtersGroup = this.filters.find(group => group.name === event.groupName);
      filtersGroup.values.find(value => value.filterName === event.filterName).state = state;
    } else {
      this.filters.forEach(group => {
        group.values.forEach(value => value.state = state);
      });
    }
    this.qanFilterService.setFilterConfigs(this.filters);
    if (!this.selected.length && this.isToggleMenu) {
      this.tabs.select('filters-tab')
    }
  }

  autocompleteSearch = (term: string, item: any) => {
    return this.filterSearchService.findBySearch(item.filterName, term)
      || this.filterSearchService.findBySearch(item.groupName, term);
  };
}
