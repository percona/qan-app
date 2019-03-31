import { Component, OnInit } from '@angular/core';
import { SelectOptionModel } from '../qan-table-header-cell/modesl/select-option.model';
import { GetProfileBody, QanTableService } from '../qan-table/qan-table.service';
import { GroupByMock } from './mock/group-by.mock';

@Component({
  selector: 'app-main-cell',
  templateUrl: './main-cell.component.html',
  styleUrls: ['./main-cell.component.scss']
})
export class MainCellComponent implements OnInit {
  public groupByData = GroupByMock;
  public groupByItems: SelectOptionModel[];
  public groupBy: SelectOptionModel;
  public profileParams: GetProfileBody;

  constructor(private qanTableService: QanTableService) {
    this.groupByItems = Object.entries(this.groupByData).map(metric => new SelectOptionModel(metric));
    this.profileParams = this.qanTableService.getProfileParamsState;
    this.groupBy = this.qanTableService.getGroupByValue || this.groupByItems[0];
  }

  ngOnInit() {
  }

  onChangeGroupBy(value) {
    this.qanTableService.setGroupByValue = value;
    this.profileParams.group_by = value.name;
    this.qanTableService.updateProfileParams(this.profileParams);
  }
}
