import {Component, OnDestroy, OnInit} from '@angular/core';
import {QueryTableConfigService} from '../core/services/query-table-config.service';
import {FilterSearchService} from '../core/services/filter-search.service';

@Component({
  selector: 'app-qan-edit-column',
  templateUrl: './qan-edit-column.component.html',
  styleUrls: ['./qan-edit-column.component.scss']
})
export class QanEditColumnComponent implements OnInit, OnDestroy {

  private subscription: any;
  public isConfigMenu = false;
  public configs: any;
  public mainCheckboxClass = 'checkbox-container__main-input';
  public configSearchValue = '';
  public configSearchValues = [];

  constructor(private configService: QueryTableConfigService, private filterSearchService: FilterSearchService) {
    this.configService.getConfigurations();
    this.subscription = this.configService.source.subscribe(items => {
      this.configs = items;
      this.configs.forEach(config => localStorage.setItem(config.name, JSON.stringify(config)));
    });
  }

  ngOnInit() {
    this.configSearchValues = this.configs;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setConfig(event, config) {
    const currentConfig = this.configs.find(item => item.name === config.name);
    const isMainCheckbox = event.target.className.includes(this.mainCheckboxClass);
    const isAllChecked = currentConfig.columns.some(column => column.value === true);
    config.checked = currentConfig.checked = !isMainCheckbox && !isAllChecked ? false : config.checked;

    if (isMainCheckbox && !isAllChecked) {
      currentConfig.columns.forEach(column => column.value = true);
    }

    this.configService.setConfig(this.configs);
  }

  findConfigs(searchValue) {
    if (!searchValue) {
      this.configSearchValues = this.configs;
      return;
    }

    this.configSearchValues = this.configs.filter(config => this.filterSearchService.findBySearch(config.name, searchValue));
  }
}
