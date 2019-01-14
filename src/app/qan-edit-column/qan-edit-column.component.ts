import {Component, OnDestroy, OnInit} from '@angular/core';
import {QueryTableConfigService} from '../core/services/query-table-config.service';

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
  public isEmptySearch = false;

  constructor(public configService: QueryTableConfigService) {
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
      this.isEmptySearch = false;
      return;
    }

    this.configSearchValues = [];
    this.configs.forEach(item => this.configSearchValues
      .push({name: item.name, checked: item.checked, columns: item.columns
          .filter(column => column.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))}));
    this.isEmptySearch = this.configSearchValues.every(value => value.columns.length === 0);
  }
}
