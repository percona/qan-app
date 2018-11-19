import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-query-profile-cell',
  templateUrl: './query-profile-cell.component.html',
  styleUrls: ['./query-profile-cell.component.scss']
})
export class QueryProfileCellComponent implements OnInit {

  @Input() cellName: string;
  @Input() cellConfiguration: any;
  @Input() row: any;
  @Input() profileTotal: any;

  constructor() {
  }

  ngOnInit() {
  }
}
