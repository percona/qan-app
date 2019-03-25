import { Component, OnInit } from '@angular/core';
import {MetricsNamesService} from '../../inventory-api/services/metrics-names.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-main-cell',
  templateUrl: './main-cell.component.html',
  styleUrls: ['./main-cell.component.css']
})
export class MainCellComponent implements OnInit {
  public queryTypes = ['Query', 'Schema', 'Server', 'Database', 'User', 'Host'];
  public selectedQueryType: string;
  public metrics$: Subscription;

  constructor(private metricsNamesService: MetricsNamesService) {
    this.selectedQueryType = this.queryTypes[0];
  }

  ngOnInit() {
  }

}
