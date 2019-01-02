import {Component, OnDestroy, OnInit} from '@angular/core';
import {QanFilterService} from './qan-filter.service';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit, OnDestroy {

  public isToggleMenu = false;
  public mainLimit = 4;
  public limits = {};
  public filters: any;
  public autocomplete: Array<{}> = [];
  public selected: Array<{}> = [];
  public checkedFilters: Array<{}>;
  private filterSubscription: any;
  private selectedSubscription: any;

  constructor(private qanFilterService: QanFilterService) {
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filters = items;
      this.checkedFilters = [];
      this.filters.forEach(group => {
        this.checkedFilters = [...this.checkedFilters, ...group.values.filter((value: any) => value.state)];
      });
      this.qanFilterService.setSelectedValues(this.checkedFilters);
    });

    this.selectedSubscription = this.qanFilterService.selectedSource.subscribe(items => {
      this.selected = items;
    });
  }

  ngOnInit() {
    this.filters.forEach(group => {
      this.autocomplete = [...this.autocomplete, ...group['values'].slice()];
      this.limits[group['name']] = this.mainLimit;
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
  }

  groupSelected() {
    this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
    this.qanFilterService.setSelectedValues(this.selected);
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.mainLimit ? group.values.length - 1 : this.mainLimit;
  }

  countChecked(values) {
    return values.filter(value => value.state === true).length;
  }

  saveConfiguration(group) {
    localStorage.setItem(group.name, JSON.stringify(group));
    this.qanFilterService.setFilterConfigs(this.filters);
  }
}
