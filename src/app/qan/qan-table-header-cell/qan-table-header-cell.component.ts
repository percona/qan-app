import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.css']
})
export class QanTableHeaderCellComponent implements OnInit {

  public queryColumns: ['Load', 'Latency', 'Sparkline'];
  public selectedQueryColumn: string;

  constructor() {
    this.selectedQueryColumn = this.queryColumns[0];
  }

  ngOnInit() {
  }

}
