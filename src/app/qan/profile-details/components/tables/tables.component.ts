import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsService } from '../../../../pmm-api-services/services/actions.service';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { ObjectDetails, QanProfileService } from '../../../profile/qan-profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
  private example$: Subscription;
  private defaultExample$: Subscription;
  private classicStart$: Subscription;
  private jsonStart$: Subscription;

  public currentDetails: ObjectDetails;
  public classicOutput: string;
  public jsonOutput: string;
  public visualOutput: string;
  public isExplainLoading: boolean;

  constructor(
    private actionsService: ActionsService,
    protected objectDetailsService: ObjectDetailsService,
    protected qanProfileService: QanProfileService,
  ) {
    this.isExplainLoading = true;
    this.currentDetails = this.qanProfileService.getCurrentDetails;
    this.example$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => this.getExample(parsedParams)))
      .subscribe(
        response => this.startTablesActions(response[0])
      );
    this.defaultExample$ = this.getExample(this.currentDetails)
      .pipe(take(1))
      .subscribe(response => this.startTablesActions(response[0]))
  }

  ngOnInit() {
  }

  private startTablesActions(value) {
    this.startShowCreateTable(value);
    this.startMySQLShowTableStatus(value);
  }

  private startShowCreateTable(value) {
    this.classicStart$ = this.actionsService.StartMySQLShowCreateTableAction({
      service_id: value.service_id,
      database: value.schema,
    }).pipe(switchMap((item) => this.getActionResult(item))).subscribe(res => {
      console.log('ShowCreateTable');
      if (res.done) {
        this.classicOutput = res.output;
        if (this.classicStart$) {
          this.classicStart$.unsubscribe()
        }
      }
    });
  }

  private startMySQLShowTableStatus(value) {
    this.jsonStart$ = this.actionsService.StartMySQLShowCreateTableAction({
      service_id: value.service_id,
      database: value.schema,
    }).pipe(switchMap((item) => this.getActionResult(item))).subscribe(res => {
      if (res.done) {
        this.jsonOutput = res.output;
        if (this.jsonStart$) {
          this.jsonStart$.unsubscribe()
        }
        this.isExplainLoading = false;
      }
    });
  }

  private getActionResult(item) {
    return interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.actionsService.GetAction({ action_id: item.action_id }))
      );
  }

  getExample(responseParams) {
    return this.objectDetailsService.GetQueryExample(responseParams).pipe(
      catchError(err => of({ query_examples: [] })),
      map(response => response.query_examples),
      catchError(err => of([])))
  }

  ngOnDestroy(): void {
    if (this.classicStart$) {
      this.classicStart$.unsubscribe()
    }
    if (this.jsonStart$) {
      this.jsonStart$.unsubscribe()
    }
    this.example$.unsubscribe();
    this.defaultExample$.unsubscribe();
  }

}
