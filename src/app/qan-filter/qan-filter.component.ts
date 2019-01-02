import {Component, OnDestroy, OnInit} from '@angular/core';
import {QanFilterService} from './qan-filter.service';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit, OnDestroy {

  public isToggleMenu = false;
  public categoriesStates: Array<{}> = [];
  public selected: Array<{}> = [];
  public limits = {};
  public mainLimit = 4;
  public filterMenuCategories: any;
  public checkedFilters: Array<{}>;
  private filterSubscription: any;
  private selectedSubscription: any;

  constructor(private qanFilterService: QanFilterService) {
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filterMenuCategories = items;
      this.checkedFilters = [];
      this.filterMenuCategories.forEach(category => {
        this.checkedFilters = [...this.checkedFilters, ...category.states.filter((state: any) => state.value)];
      });
      this.qanFilterService.setSelectedValues(this.checkedFilters);
    });

    this.selectedSubscription = this.qanFilterService.selectedSource.subscribe(items => {
      this.selected = items;
    });
  }

  ngOnInit() {
    this.getParameters();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['category'].localeCompare(b['category']))];
    this.qanFilterService.setSelectedValues(this.selected);
  }

  getAll(category) {
    this.limits[category.name] = this.limits[category.name] <= this.mainLimit ? category.states.length - 1 : this.mainLimit;
  }

  getParameters() {
    this.filterMenuCategories.forEach(item => {
      this.categoriesStates = [...this.categoriesStates, ...item['states'].slice()];
      this.limits[item['name']] = this.mainLimit;
    });
  }

  countChecked(states) {
    return states.filter(state => state.value === true).length;
  }

  saveConfiguration(category) {
    localStorage.setItem(category.name, JSON.stringify(category));
    this.qanFilterService.setFilterConfigs(this.filterMenuCategories);
  }
}
