import {Component, Input, OnInit} from '@angular/core';
import {QanTableService} from '../qan-table/qan-table.service';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.css']
})
export class QanTableHeaderCellComponent implements OnInit {

  @Input() currentColumnName: any;
  @Input() currentMetric: any;
  @Input() options: any;
  @Input() fullData: any;
  @Input() index: any;

  public columns: any;
  public selectedQueryColumn: string;

  constructor(private qanTableService: QanTableService) {
  }

  ngOnInit() {
    this.selectedQueryColumn = this.options.filter(option => option.name === this.currentColumnName)[0];
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
    console.log(this.fullData);
    // this.currentMetric.isDeleted = true;
    this.qanTableService.setConfig(this.fullData);
    console.log('currentMetric - ', this.currentMetric);
  }

}
