import { Component, OnInit } from '@angular/core';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { GetProfileBody } from '../profile-table/profile-table.service';
import { GroupByMock } from './mock/group-by.mock';
import { QanProfileService } from '../profile/qan-profile.service';

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

  constructor(private qanProfileService: QanProfileService) {
    this.groupByItems = Object.entries(this.groupByData).map(metric => new SelectOptionModel(metric));
    this.profileParams = this.qanProfileService.getProfileParamsState;
    this.groupBy = this.qanProfileService.getGroupByValue || this.groupByItems[0];
  }

  ngOnInit() {
  }

  onChangeGroupBy(value) {
    this.qanProfileService.setGroupByValue = value;
    this.profileParams.group_by = value.name;
    this.qanProfileService.updateProfileParams(this.profileParams);
  }
}
