import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QanFilterService} from './qan-filter.service';
import {QanFilterModel} from './qan-fliter.model';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit, OnDestroy {

  @ViewChild('tabs')
  private tabs: NgbTabset;

  public isToggleMenu = false;
  public mainLimit = 4;
  public limits = {};
  public filters: any;
  public filterSearchValue = '';
  public filtersSearchedValues = [];
  public isEmptySearch = false;
  public autocomplete: Array<{}> = [];
  public selected: Array<{}> = [];
  private filterSubscription: any;
  public scrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private qanFilterService: QanFilterService) {
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filters = items;
      this.selected = [];
      this.filters.forEach(group => {
        localStorage.setItem(group.name, JSON.stringify(group));
        this.selected = [...this.selected, ...group.values.filter((value: any) => value.state)];
      });
      this.groupSelected();
    });
    this.filtersSearchedValues = this.filters;
  }

  setFilterHeight() {
    const qanTable = document.getElementById('qanTable');
    const filters = document.getElementsByClassName('filter-menu') as HTMLCollectionOf<HTMLElement>;
    filters[0].style.setProperty('--filters-height', `${qanTable.offsetHeight}px`);
  }

  ngOnInit() {
    this.filters.forEach(group => {
      this.autocomplete = [...this.autocomplete, ...group['values'].slice()];
      this.limits[group['name']] = this.mainLimit;
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.mainLimit ? group.values.length - 1 : this.mainLimit;
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
    if (!this.selected.length && this.isToggleMenu) this.tabs.select('filters-tab');
  }

  findFilters(searchValue) {
    if (!searchValue) {
      this.filtersSearchedValues = this.filters;
      this.isEmptySearch = false;
      return;
    }

    this.filtersSearchedValues = [];
    this.filters.forEach(item => this.filtersSearchedValues
      .push({name: item.name, values: item.values.filter(bv => bv.filterName.includes(searchValue))}));
    this.isEmptySearch = this.filtersSearchedValues.every(item => item.values.length === 0);
  }

  countFilters(item) {
    const checkedFilters = item.values.filter(value => value.state === true).length;
    const allFilters = this.filters.find(value => value.name === item.name).values.length;
    return `(${checkedFilters}/${allFilters})`
  }

  setConfigs() {
    this.qanFilterService.setFilterConfigs(this.filters);
  }
}
