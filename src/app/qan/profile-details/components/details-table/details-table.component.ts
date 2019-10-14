import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { MetricModel } from "../../../profile-table/models/metric.model";
import { Router } from "@angular/router";
import { QanProfileService } from "../../../profile/qan-profile.service";
import { ObjectDetailsService } from "../../../../pmm-api-services/services/object-details.service";
import { DetailsSparklineModel } from "../../models/details-sparkline.model";
import { ObjectDetails } from "../../../profile/interfaces/object-details.interface";

@Component({
  selector: "app-details-table",
  templateUrl: "./details-table.component.html",
  styleUrls: ["./details-table.component.css"]
})
export class DetailsTableComponent implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: ElementRef;
  @ViewChildren("detailsTableRows") tableRows: QueryList<any>;
  @HostBinding("class.frame") isLoading = true;
  @Output() finishRender = new EventEmitter();

  protected dbName: string;
  public fingerprint: string;
  public currentParams: any;
  public dimension: string;
  public isTotal = false;
  public details: any = {};
  private group_by$: Subscription;
  private details$: Subscription;
  private firstDetails: ObjectDetails;
  public queryCount: any;

  constructor(
    protected router: Router,
    protected qanProfileService: QanProfileService,
    protected objectDetailsService: ObjectDetailsService
  ) {
    this.isLoading = true;
    this.details$ = this.qanProfileService.getProfileInfo.details
      .pipe(
        switchMap(parsedParams => {
          this.isLoading = true;
          this.currentParams = parsedParams;
          return this.getDetailsData(parsedParams);
        })
      )
      .subscribe(response => {
        this.details = response;
        this.details.metrics = this.detailsTableOrder(response["metrics"]);
        this.queryCount = this.details.metrics.find(
          item => item.metricName === "num_queries"
        ).stats["sum"];
        this.isTotal = !this.currentParams.filter_by;
        this.isLoading = false;
      });

    this.group_by$ = this.qanProfileService.getGroupBy.subscribe(
      () => (this.details.metrics = [])
    );
  }

  ngOnInit() {
    // this.firstDetails = this.qanProfileService.getCurrentDetails;
    // this.getDetailsData(this.firstDetails).subscribe(response => {
    //   this.details = response;
    //   this.details.metrics = this.detailsTableOrder(response['metrics']);
    //   this.isLoading = false;
    // });
  }

  ngAfterViewInit() {
    this.tableRows.changes.subscribe(() => {
      this.setLabelsHeight();
    });
  }

  createSparklineModel(sparklines, name) {
    return sparklines.map(item => new DetailsSparklineModel(item, name));
  }

  setLabelsHeight() {
    const tableHeight = this.table.nativeElement.offsetHeight;
    this.finishRender.emit(tableHeight);
  }

  detailsTableOrder(detailsTableData) {
    return detailsTableData.sort((a, b) => this.sortDetails(a, b));
  }

  getDetailsData(detailsParams) {
    return this.objectDetailsService.GetMetrics(detailsParams).pipe(
      catchError(err => of({ metrics: [], sparkline: [] })),
      map(response => {
        const withData =
          Object.entries(
            response.metrics ? response.metrics : response["totals"]
          )
            .filter(metricData => Object.keys(metricData[1]).length)
            .filter(
              metricData =>
                !(
                  metricData[1]["cnt"] !== 0 &&
                  metricData[1]["sum"] === undefined
                )
            )
            .map(withDataItem => {
              const sparklineData = this.createSparklineModel(
                response.sparkline,
                withDataItem[0]
              );
              return new MetricModel(withDataItem, sparklineData);
            }) || [];
        const withDataTotals =
          Object.entries(response["totals"])
            .filter(metricData => Object.keys(metricData[1]).length)
            .map(withDataTotalsItem => new MetricModel(withDataTotalsItem))
            .filter(totalsItem =>
              withData.some(
                metricsItem => metricsItem.metricName === totalsItem.metricName
              )
            ) || [];
        return {
          metrics: withData,
          totals: withDataTotals
        };
      }),
      catchError(err => of([]))
    );
  }

  sortDetails(a, b) {
    const order = [
      "num_queries",
      "num_queries_with_errors",
      "num_queries_with_warnings",
      "query_time",
      "lock_time",
      "rows_sent",
      "rows_examined",
      ""
    ];

    let indA = order.indexOf(a["metricName"]);
    let indB = order.indexOf(b["metricName"]);

    if (indA === -1) {
      indA = order.length - 1;
    }

    if (indB === -1) {
      indB = order.length - 1;
    }

    return indA < indB ? -1 : 1;
  }
}
