import {Component, OnDestroy } from '@angular/core';
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
