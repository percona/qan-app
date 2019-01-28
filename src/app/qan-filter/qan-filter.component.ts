import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QanFilterService} from './qan-filter.service';
import {QanFilterModel} from '../core/models/qan-fliter.model';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {FilterSearchService} from '../core/services/filter-search.service';
import {CoreComponent} from '../core/core.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from '../core/services/instance.service';
import {QueryParams} from '../core/services/url-params.service';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent extends CoreComponent implements OnInit, OnDestroy {

  @ViewChild('tabs')
  private tabs: NgbTabset;

  public isToggleMenu = false;
  public isEmptySearch = false;
  public limits = {};
  public filtersSearchedValues = [];
  public autocomplete: Array<{}> = [];
  public selected: Array<{}> = [];
  public defaultLimit = 4;
  public filterSearchValue = '';
  private filterSubscription: any;
  public filters: any;
  public scrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private qanFilterService: QanFilterService,
              private filterSearchService: FilterSearchService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService) {
    super(route, router, instanceService);
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filters = items;
      this.selected = [];
      this.filters.forEach(group => {
        localStorage.setItem(group.name, JSON.stringify(group));
        this.selected = [...this.selected, ...group.values.filter((value: any) => value.state)];
      });
      this.groupSelected();
      this.addFilterToURL();
    });
    this.filtersSearchedValues = this.filters;
  }

  ngOnInit() {
    this.filters.forEach(group => {
      this.autocomplete = [...this.autocomplete, ...group['values'].slice()];
      this.limits[group['name']] = this.defaultLimit;
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  onChangeParams(params) {
  }

  setFilterHeight() {
    const qanTable = document.getElementById('qanTable');
    const filters = document.getElementsByClassName('filter-menu') as HTMLCollectionOf<HTMLElement>;
    filters[0].style.setProperty('--filters-height', `${qanTable.offsetHeight}px`);
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
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
    if (!this.selected.length && this.isToggleMenu) {
      this.tabs.select('filters-tab')
    }
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

  resetToggleFilterMenuLimits() {
    this.filtersSearchedValues.forEach(value => this.limits[value.name] = this.defaultLimit);
  }

  countFilters(item) {
    const checkedFilters = item.values.filter(value => value.state === true).length;
    const allFilters = this.filters.find(value => value.name === item.name).values.length;
    return `(${checkedFilters}/${allFilters})`
  }

  setConfigs() {
    this.qanFilterService.setFilterConfigs(this.filters);
  }

  addFilterToURL() {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.filters = '';
    params.queryID = '';
    params.search = '';
    if (this.selected.length) {
      this.selected.forEach(filter => params.filters += `${filter['groupName']}-${filter['filterName']},`);
    }
    this.router.navigate(['profile'], {queryParams: params});
    setTimeout(() => this.customEvents.sendEvent(this.customEvents.updateUrl));
  }

  autocompleteSearch = (term: string, item: any) => {
    return this.filterSearchService.findBySearch(item.filterName, term)
      || this.filterSearchService.findBySearch(item.groupName, term);
  };
}
