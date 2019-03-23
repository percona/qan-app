import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-cell',
  templateUrl: './main-cell.component.html',
  styleUrls: ['./main-cell.component.css']
})
export class MainCellComponent implements OnInit {
  public queryTypes = ['Query', 'Schema', 'Server', 'Database', 'User', 'Host'];
  public selectedQueryType: string;

  constructor() {
    this.selectedQueryType = this.queryTypes[0];
  }

  ngOnInit() {
  }

}
