import {Component, OnDestroy} from '@angular/core';
import {QueryTableConfigurationService} from '../query-profile/query-table-configuration.service';

@Component({
  selector: 'app-qan-edit-column',
  templateUrl: './qan-edit-column.component.html',
  styleUrls: ['./qan-edit-column.component.scss']
})
export class QanEditColumnComponent implements OnDestroy {

  public isConfigurationMenu = false;
  public columns: any;
  private subscription: any;
  public isMainChecked: boolean;
  public isSubMain: boolean;
  public isAllUnchecked: boolean;
  private ids = {
    load: 'load',
    count: 'count',
    latency: 'latency'
  };
  private configurations = {
    loadOptions: ['sparkline', 'value', 'percentage'],
    countOptions: ['sparkline', 'value', 'percentage', 'queriesPerSecond'],
    latencyOptions: ['sparkline', 'value', 'distribution']
  };

  constructor(public configService: QueryTableConfigurationService) {
    this.subscription = this.configService.source.subscribe(items => {
      this.columns = items;
    });
  }

  undisableOptions(id, key) {
    this.configService.toggleConfig(id, key);
    switch (id) {
      case this.ids.load:
        this.isAllUnchecked = this.columns[0].sparkline || this.columns[0].value || this.columns[0].percentage;
        if (!this.isAllUnchecked) {
          this.toggleAll(id, key, 'loadOptions');
        }
        break;
      case this.ids.count:
        this.isAllUnchecked =
          this.columns[1].sparkline || this.columns[1].value || this.columns[1].percentage || this.columns[1].queriesPerSecond;
        if (!this.isAllUnchecked) {
          this.toggleAll(id, key, 'countOptions');
        }
        break;
      case this.ids.latency:
        this.isAllUnchecked = this.columns[2].sparkline || this.columns[2].value || this.columns[2].distribution;
        if (!this.isAllUnchecked) {
          this.toggleAll(id, key, 'latencyOptions');
        }
        break;
    }
  }

  toggleAll(id, key, subOptions) {
    this.configurations[subOptions].forEach(item => {
      this.configService.toggleConfig(id, item);
    })
  }

  checkConfigurations(id, key) {
    this.configService.toggleConfig(id, key);

    switch (id) {
      case this.ids.load:
        this.isSubMain = this.columns[0].sparkline || this.columns[0].value || this.columns[0].percentage;
        this.isMainChecked = this.columns[0].checked && this.isSubMain;
        break;
      case this.ids.count:
        this.isSubMain =
          this.columns[1].sparkline || this.columns[1].value || this.columns[1].percentage || this.columns[1].queriesPerSecond;
        this.isMainChecked = this.columns[1].checked && this.isSubMain;
        break;
      case this.ids.latency:
        this.isSubMain = this.columns[2].sparkline || this.columns[2].value || this.columns[2].distribution;
        this.isMainChecked = this.columns[2].checked && this.isSubMain;
        break;
    }

    if (!this.isMainChecked) {
      this.configService.toggleConfig(id, 'checked');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
