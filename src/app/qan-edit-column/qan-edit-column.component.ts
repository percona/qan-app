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

  constructor(public configService: QueryTableConfigurationService) {
    this.subscription = this.configService.source.subscribe(item => {
      this.columns = item;
    });
  }

  // isMainChecked() {
  //   const isLoad = this.columns[0].sparkline || this.columns[0].value || this.columns[0].percentage;
  //   const isCount = this.columns[1].sparkline || this.columns[1].queriesPerSecond || this.columns[1].value || this.columns[1].percentage;
  //   const isLatency = this.columns[2].sparkline || this.columns[2].value || this.columns[2].distribution;
  //   if (!isLoad) {
  //     this.configService.toggleConfig('load', 'checked')
  //   }
  //   if (!isCount) {
  //     this.configService.toggleConfig('count', 'checked')
  //   }
  //   if (!isLatency) {
  //     this.configService.toggleConfig('latency', 'checked')
  //   }
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
