import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {QanFilterService} from './qan-filter.service';
import {FilterSearchService} from '../../core/services/filter-search.service';
import {QanFilterModel} from '../../core/models/qan-fliter.model';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('tabs') tabs: NgbTabset;

  public isEmptySearch = false;
  public limits = {};
  public filtersSearchedValues = [];
  public selected: Array<{}> = [];
  public defaultLimit = 4;
  public filterSearchValue = '';
  private filterSubscription: any;
  public filters: any;
  public scrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private qanFilterService: QanFilterService, private filterSearchService: FilterSearchService) {
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filters = items;
      this.selected = [];
      this.filters.forEach(group => {
        localStorage.setItem(group.name, JSON.stringify(group));
        this.selected = [...this.selected, ...group.values.filter((value: any) => value.state)];
      });
      this.groupSelected();
      if (!this.selected.length) {
        this.tabs.select('filters-tab')
      }
    });
  }

  ngOnInit() {
    this.filters.forEach(group => {
      this.limits[group['name']] = this.defaultLimit;
    });
    this.filtersSearchedValues = this.filters;
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  toggleMenu() {
    this.setFilterHeight();
  }

  setFilterHeight() {
    const qanTable = document.getElementById('qanTable');
    const filters = document.getElementsByClassName('aside-menu') as HTMLCollectionOf<HTMLElement>;
    filters[0].style.setProperty('--filters-height', `${qanTable.offsetHeight}px`);
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
  }

  resetToggleFilterMenuLimits() {
    this.filtersSearchedValues.forEach(value => this.limits[value.name] = this.defaultLimit);
  }

  countFilters(item) {
    const checkedFilters = item.values.filter(value => value.state === true).length;
    const allFilters = this.filters.find(value => value.name === item.name).values.length;
    return `(${checkedFilters}/${allFilters})`
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  setConfigs() {
    this.qanFilterService.setFilterConfigs(this.filters);
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
    this.setConfigs();
  }

  findFilters(searchValue) {
    this.resetToggleFilterMenuLimits();
    if (!searchValue) {
      this.filtersSearchedValues = this.filters;
      this.isEmptySearch = false;
      return;
    }

    const searchByGroup = this.filters.filter(group => this.filterSearchService.findBySearch(group.name, searchValue));
    const searchByValues = this.filters.map(item => {
      const values = item.values.filter(value => this.filterSearchService.findBySearch(value.filterName, searchValue));
      return values.length ? {name: item.name, values: values} : false;
    });
    this.filtersSearchedValues = searchByGroup.length ? searchByGroup : searchByValues.filter(value => value);
    if (searchByGroup.length === 1) {
      searchByGroup.forEach(group => this.limits[group.name] = group.values.length);
    }
  }
}
