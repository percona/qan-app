import { Component, OnInit } from '@angular/core';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { GroupByMock } from './mock/group-by.mock';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';

@Component({
  selector: 'app-main-cell',
  templateUrl: './main-cell.component.html',
  styleUrls: ['./main-cell.component.scss']
})
export class MainCellComponent implements OnInit {
  public groupByData = GroupByMock;
  public groupByItems: SelectOptionModel[];
  public groupBy: any;
  public currentParams: GetProfileBody;

  constructor(private qanProfileService: QanProfileService) {
    this.groupByItems = Object.entries(this.groupByData).map(metric => new SelectOptionModel(metric));
    this.currentParams = JSON.parse(JSON.stringify(this.qanProfileService.getProfileParams.getValue()));
    this.groupBy = this.groupByItems[0];
    this.qanProfileService.getProfileInfo.groupValue.subscribe(group_by => this.groupBy = group_by);
  }

  ngOnInit() {
  }

  onChangeGroupBy(value) {
    this.qanProfileService.updateGroupByValue(value);
    this.currentParams.group_by = value.name;
    // this.qanProfileService.updateProfileParams(this.currentParams);
  }
}
