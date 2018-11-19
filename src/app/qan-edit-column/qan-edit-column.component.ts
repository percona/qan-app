import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-qan-edit-column',
  templateUrl: './qan-edit-column.component.html',
  styleUrls: ['./qan-edit-column.component.scss']
})
export class QanEditColumnComponent implements OnInit {

  @Output() configuration: EventEmitter<any> = new EventEmitter();

  public isConfigurationMenu = false;
  public cellConfiguration = [
    {
      name: 'Load',
      id: 'load',
      checked: true,
      sparkline: true,
      value: true,
      percentage: true
    },
    {
      name: 'Count',
      id: 'count',
      checked: true,
      queriesPerSecond: true,
      sparkline: true,
      value: true,
      percentage: true
    },
    {
      name: 'Avg Latency',
      id: 'latency',
      checked: true,
      sparkline: true,
      value: true,
      distribution: true
    }
  ];


  constructor() {
  }

  ngOnInit() {
    this.configuration.emit(this.cellConfiguration);
  }

}
