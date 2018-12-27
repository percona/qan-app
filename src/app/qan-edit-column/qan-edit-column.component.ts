import {Component, OnDestroy} from '@angular/core';
import {QueryTableConfigService} from '../core/services/query-table-config.service';

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
  public isAnyChecked: boolean;
  // private ids = {
  //   load: 'load',
  //   count: 'count',
  //   latency: 'latency'
  // };
  // private configurations = {
  //   loadOptions: ['sparkline', 'value', 'percentage'],
  //   countOptions: ['sparkline', 'value', 'percentage', 'queriesPerSecond'],
  //   latencyOptions: ['sparkline', 'value', 'distribution']
  // };

  constructor(public configService: QueryTableConfigService) {
    this.configService.getConfigurations();
    this.subscription = this.configService.source.subscribe(items => {
      this.columns = items;
    });
  }

  undisableOptions(config) {
    // this.configService.toggleConfig(id, key);
    // switch (id) {
    //   case this.ids.load:
    //     this.isAnyChecked = this.columns[0].sparkline || this.columns[0].value || this.columns[0].percentage;
    //     if (!this.isAnyChecked) {
    //       this.toggleAll(id, key, 'loadOptions');
    //     }
    //     break;
    //   case this.ids.count:
    //     this.isAnyChecked =
    //       this.columns[1].sparkline || this.columns[1].value || this.columns[1].percentage || this.columns[1].queriesPerSecond;
    //     if (!this.isAnyChecked) {
    //       this.toggleAll(id, key, 'countOptions');
    //     }
    //     break;
    //   case this.ids.latency:
    //     this.isAnyChecked = this.columns[2].sparkline || this.columns[2].value || this.columns[2].distribution;
    //     if (!this.isAnyChecked) {
    //       this.toggleAll(id, key, 'latencyOptions');
    //     }
    //     break;
    // }
    console.log('config - ', config);
  }

  saveConfig(configuration) {
    localStorage.setItem(configuration.name, JSON.stringify(configuration));
    this.configService.setConfig(this.columns)
  }

  checkConfigurations(id, key) {
    // this.configService.toggleConfig(id, key);
    //
    // switch (id) {
    //   case this.ids.load:
    //     this.isSubMain = this.columns[0].sparkline || this.columns[0].value || this.columns[0].percentage;
    //     this.isMainChecked = this.columns[0].checked && this.isSubMain;
    //     break;
    //   case this.ids.count:
    //     this.isSubMain =
    //       this.columns[1].sparkline || this.columns[1].value || this.columns[1].percentage || this.columns[1].queriesPerSecond;
    //     this.isMainChecked = this.columns[1].checked && this.isSubMain;
    //     break;
    //   case this.ids.latency:
    //     this.isSubMain = this.columns[2].sparkline || this.columns[2].value || this.columns[2].distribution;
    //     this.isMainChecked = this.columns[2].checked && this.isSubMain;
    //     break;
    // }
    //
    // if (!this.isMainChecked) {
    //   this.configService.toggleConfig(id, 'checked');
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
