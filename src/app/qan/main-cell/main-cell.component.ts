import { Component, OnInit } from '@angular/core';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { GroupByMock } from './mock/group-by.mock';
import { QanProfileService } from '../profile/qan-profile.service';
import { GetProfileBody } from '../profile/interfaces/get-profile-body.interfaces';
import { QueryParamsService } from '../../core/services/query-params.service';

@Component({
  selector: 'app-main-cell',
  templateUrl: './main-cell.component.html',
  styleUrls: ['./main-cell.component.scss']
})
export class MainCellComponent implements OnInit {
  public groupByData = GroupByMock;
  public groupByItems: SelectOptionModel[];
  public groupBy: any;
  public currentGroupBy: string;
  public currentParams: GetProfileBody;

  constructor(private qanProfileService: QanProfileService, private queryParamsService: QueryParamsService) {
    this.groupByItems = Object.entries(this.groupByData).map(metric => new SelectOptionModel(metric));
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
    if (this.queryParamsService.takeParams().group_by) {
      this.currentGroupBy = this.queryParamsService.takeParams().group_by;
    } else {
      this.currentGroupBy = this.currentParams.group_by;
    }
    this.groupBy = this.groupByItems.find(item => item.name === this.currentGroupBy);
  }

  ngOnInit() {
  }

  onChangeGroupBy(value) {
    this.currentParams.group_by = value.name;
    this.qanProfileService.updateProfileParams(this.currentParams);
    this.qanProfileService.updateGroupBy(this.currentParams.group_by);
    this.queryParamsService.addDimension(this.currentParams.group_by)
  }
}
