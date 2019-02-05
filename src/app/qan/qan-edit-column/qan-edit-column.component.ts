import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterSearchService} from '../../core/services/filter-search.service';
import {QanEditColumnService} from './qan-edit-column.service';

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

  constructor(private configService: QanEditColumnService, private filterSearchService: FilterSearchService) {
    this.configService.getConfigs();
    this.subscription = this.configService.source.subscribe(items => {
      this.configs = items;
      this.configs.forEach(config => localStorage.setItem(config.name, JSON.stringify(config)));
    });
  }

  /**
   * Set config groups for edit column menu
   */
  ngOnInit() {
    this.configSearchValues = this.configs;
  }

  /**
   * Destroys route subscription on component unload.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Check checked configs in group and if all is unchecked, disable all config group
   * @param event - change event, need to check if current checkbox contains main class
   * @param config - current config group
   */
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

  /**
   * Search in edit column configs by value in search field
   * @param searchValue - value, which user type in search field
   */
  findConfigs(searchValue: string) {
    if (!searchValue) {
      this.configSearchValues = this.configs;
      return;
    }

    this.configSearchValues = this.configs.filter(config => this.filterSearchService.findBySearch(config.name, searchValue));
  }
}
