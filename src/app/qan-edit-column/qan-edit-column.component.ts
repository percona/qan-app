import {Component, OnDestroy} from '@angular/core';
import {QueryTableConfigService} from '../core/services/query-table-config.service';

@Component({
  selector: 'app-qan-edit-column',
  templateUrl: './qan-edit-column.component.html',
  styleUrls: ['./qan-edit-column.component.scss']
})
export class QanEditColumnComponent implements OnDestroy {

  private subscription: any;
  public isConfigMenu = false;
  public configs: any;
  public mainCheckboxClass = 'checkbox-container__main-input';

  constructor(public configService: QueryTableConfigService) {
    this.configService.getConfigurations();
    this.subscription = this.configService.source.subscribe(items => {
      this.configs = items;
    });
  }

  saveConfig(event, configuration) {
    const isMainCheckbox = event.target.className.includes(this.mainCheckboxClass);
    const isAllChecked = configuration.columns.some(column => column.value === true);
    configuration.checked = !isMainCheckbox && !isAllChecked ? false : configuration.checked;

     if (isMainCheckbox && !isAllChecked) {
      configuration.columns.forEach(column => column.value = true);
    }

    localStorage.setItem(configuration.name, JSON.stringify(configuration));
    this.configService.setConfig(this.configs);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
