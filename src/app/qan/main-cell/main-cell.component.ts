import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {QanTableService} from '../qan-table/qan-table.service';

@Component({
  selector: 'app-main-cell',
  templateUrl: './main-cell.component.html',
  styleUrls: ['./main-cell.component.css']
})
export class MainCellComponent implements OnInit {
  public groupByData = {
    queryid: 'Query',
    d_server: 'Server',
    d_database: 'Database',
    d_schema: 'Schema',
    d_username: 'User',
    d_client_host: 'Host'
  };
  public groupByItems: SelectOptionModel[];
  public groupBy: SelectOptionModel;

  constructor(private qanTableService: QanTableService) {
    this.groupByItems = Object.entries(this.groupByData).map(metric => new SelectOptionModel(metric));
    this.groupBy = this.groupByItems[0];
    this.onChangeGroupBy(this.groupBy);
  }

  ngOnInit() {
  }

  onChangeGroupBy(value) {
    this.qanTableService.setGroupBy(value.name);
  }
}
