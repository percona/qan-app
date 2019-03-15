import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-qan-table-cell',
  templateUrl: './qan-table-cell.component.html',
  styleUrls: ['./qan-table-cell.component.css']
})
export class QanTableCellComponent implements OnInit {
  @Input() cellData: any;
  constructor() { }

  ngOnInit() {
  }

}
