import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {QueryTableConfigurationService} from '../query-profile/query-table-configuration.service';

@Component({
  selector: 'app-query-profile-cell',
  templateUrl: './query-profile-cell.component.html',
  styleUrls: ['./query-profile-cell.component.scss']
})
export class QueryProfileCellComponent implements OnChanges, OnInit {

  // @Input() selectedColumn: any;
  @Input() queryProfile: any;
  @Input() profileTotal: any;

  public isLoadColumn: boolean;
  public isCountColumn: boolean;
  public isLatencyColumn: boolean;
  public selectedOption: any;
  public checkedColumns: any;
  public isMainColumn: boolean;
  public isRowsScanned: boolean;
  public isLoad = false;
  public isCount = false;
  public isLatency = false;

  constructor(private configService: QueryTableConfigurationService) {
  }


  ngOnInit() {
    this.configService.source.subscribe(items => {
      this.checkedColumns = items.filter((config: any) => !!config.checked);
      if (!!this.checkedColumns.length) {
        this.selectedOption = (!this.selectedOption || !this.checkedColumns.find(item => {return item.id === this.selectedOption.id})) ?
          this.checkedColumns[0] : this.selectedOption;
        this.checkEmptyColumn(this.selectedOption);
      } else {
        this.selectedOption = '';
      }

    });
  }

  ngOnChanges() {
    const isEmptyColumn = !Object.keys(this.selectedOption).length;

    this.isLoadColumn = !isEmptyColumn && this.selectedOption.id === this.configService.source.value[0].id;
    this.isCountColumn = !isEmptyColumn && this.selectedOption.id === this.configService.source.value[1].id;
    this.isLatencyColumn = !isEmptyColumn && this.selectedOption.id === this.configService.source.value[2].id;
  }

  checkEmptyColumn(selected) {
    switch (selected.id) {
      case 'load':
        this.isLoad = true;
        this.isMainColumn = selected.sparkline || selected.value;
        this.isRowsScanned = selected.percentage;
        break;
      case 'count':
        this.isCount = true;
        this.isMainColumn = selected.sparkline || selected.queriesPerSecond;
        this.isRowsScanned = selected.value || selected.percentage;
        break;
      case 'latency':
        this.isLatency = true;
        this.isMainColumn = selected.sparkline || selected.value;
        this.isRowsScanned = selected.distribution;
        break;
    }
  }

}
