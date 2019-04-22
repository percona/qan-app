import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HumanizePipe } from './humanize.pipe';
import { LatencyChartDirective } from './latency-chart.directive';
import { LoadSparklinesDirective } from './load-sparklines.directive';
import { MapToIterablePipe } from './map-to-iterable.pipe';
import { MomentFormatPipe } from './moment-format.pipe';
import { TruncateRootPipe } from './truncate-root.pipe';
import { ParseQueryParamDatePipe } from './parse-query-param-date.pipe';
import { SortingTablePipe } from './sorting-table.pipe';
import { TableHeadersToMultiplePipe } from './table-headers-to-multiple.pipe';
import { LoadBarChartDirective } from './load-bar-chart.directive';
import { LoadPolygonChartDirective } from './load-polygon-chart.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HumanizePipe,
    LatencyChartDirective,
    LoadSparklinesDirective,
    MapToIterablePipe,
    MomentFormatPipe,
    TruncateRootPipe,
    ParseQueryParamDatePipe,
    SortingTablePipe,
    TableHeadersToMultiplePipe,
    LoadBarChartDirective,
    LoadPolygonChartDirective,
  ],
  exports: [
    MapToIterablePipe,
    MomentFormatPipe,
    TruncateRootPipe,
    HumanizePipe,
    LatencyChartDirective,
    LoadSparklinesDirective,
    LoadBarChartDirective,
    LoadPolygonChartDirective,
    SortingTablePipe,
    TableHeadersToMultiplePipe,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
