import {Component, Input, OnInit} from '@angular/core';
import {QanTableService} from '../qan-table/qan-table.service';
import {SelectOptionModel} from './modesl/select-option.model';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.css']
})
export class QanTableHeaderCellComponent implements OnInit {
  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() index: any;

  public options: Array<SelectOptionModel>;
  public selectedQueryColumn: SelectOptionModel;

  constructor(private qanTableService: QanTableService) {
    this.options = this.qanTableService.getOptions();
  }

  ngOnInit() {
    this.selectedQueryColumn = this.options.filter(option => option.name === this.currentColumnName)[0];
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
  }
}
