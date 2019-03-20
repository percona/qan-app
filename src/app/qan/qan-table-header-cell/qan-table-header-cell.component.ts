import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.css']
})
export class QanTableHeaderCellComponent implements OnInit {

  @Input() currentColumnName: any;
  @Input() options: any;

  public columns: any;
  public selectedQueryColumn: string;

  constructor() {
  }

  ngOnInit() {
    this.selectedQueryColumn = this.options.filter(option => option.name === this.currentColumnName)[0];
  }

}
