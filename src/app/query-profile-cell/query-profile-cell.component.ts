import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {QueryTableConfigurationService} from '../query-profile/query-table-configuration.service';

@Component({
  selector: 'app-query-profile-cell',
  templateUrl: './query-profile-cell.component.html',
  styleUrls: ['./query-profile-cell.component.scss']
})
export class QueryProfileCellComponent implements OnChanges {

  @Input() selectedColumn: any;
  @Input() row: any;
  @Input() profileTotal: any;

  public isLoad: boolean;
  public isCount: boolean;
  public isLatency: boolean;

  constructor(private configService: QueryTableConfigurationService) {
  }

  ngOnChanges() {
    this.isLoad = this.selectedColumn.id === this.configService.source.value[0].id;
    this.isCount = this.selectedColumn.id === this.configService.source.value[1].id;
    this.isLatency = this.selectedColumn.id === this.configService.source.value[2].id;
  }
}
