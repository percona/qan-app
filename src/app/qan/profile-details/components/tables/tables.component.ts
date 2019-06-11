import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../../../../pmm-api-services/services/actions.service';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { QanProfileService } from '../../../profile/qan-profile.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private actionsService: ActionsService,
    protected objectDetailsService: ObjectDetailsService,
    protected qanProfileService: QanProfileService) {
  }

  ngOnInit() {
    this.actionsService.StartMySQLExplainTraditionalJSONAction({ service_id: '2' }).subscribe(res => {
      console.log('res - ', res);
    })
  }

}
