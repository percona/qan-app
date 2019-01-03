import {Component, OnDestroy, OnInit} from '@angular/core';
import {QanFilterService} from './qan-filter.service';
import {QanFilterModel} from './qan-fliter.model';

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
  private filterSubscription: any;

  constructor(private qanFilterService: QanFilterService) {
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
    return event.groupName ?
      this.filters.find(group => group.name === event.groupName)
        .values.find(value => value.filterName === event.filterName).state = state :
      this.filters.forEach(group => group.values.forEach(value => value.state = state));
  }

  countChecked(values) {
    return values.filter(value => value.state === true).length;
  }

  saveConfiguration(group) {
    localStorage.setItem(group.name, JSON.stringify(group));
    this.qanFilterService.setFilterConfigs(this.filters);
  }
}
