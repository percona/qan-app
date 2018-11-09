import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-query-profile-cell',
  templateUrl: './query-profile-cell.component.html',
  styleUrls: ['./query-profile-cell.component.scss']
})
export class QueryProfileCellComponent implements OnInit {

  @Input() type: string;
  @Input() row: any;

  constructor() {
  }

  ngOnInit() {
  }
}
