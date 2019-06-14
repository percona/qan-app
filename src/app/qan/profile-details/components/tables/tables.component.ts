import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsService } from '../../../../pmm-api-services/services/actions.service';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { ObjectDetails, QanProfileService } from '../../../profile/qan-profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
  public tablesNames$ = new BehaviorSubject([]);
  public globalConfig: any;

  private example$: Subscription;
  private defaultExample$: Subscription;
  private classicStart$: Subscription;

  public currentDetails: ObjectDetails;
  public classicOutput: any;
  public tablesError = '';
  public unsubscribe = false;
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
      .subscribe(response => this.startTablesActions(response[0]));

    this.tablesNames$.pipe(filter(names => !!names.length))
  }

  ngOnInit() {
  }

  private startTablesActions(value) {
    this.globalConfig = value;
    this.startClassic(value);
  }

  private startClassic(value) {
    this.classicStart$ = this.actionsService.StartMySQLExplainTraditionalJSONAction({
      service_id: value.service_id,
      query: value.example,
      database: value.schema,
    }).pipe(
      catchError(error => {
        error.error.done = true;
        return of(error.error)
      }),
      switchMap((item) => !item.error ? this.getActionResult(item) : of(item))
    ).subscribe(res => {
      if (res.done) {
        const names = [];
        if (!res.error) {
          let indexOfName;
          this.tablesError = '';
          this.classicOutput = JSON.parse(res.output);
          this.classicOutput.forEach((row, index) => {
            if (!index) {
              indexOfName = row.indexOf('table');
            } else {
              names.push(row[indexOfName]);
            }
          })
        } else {
          this.tablesError = res.error;
        }
        if (this.classicStart$) {
          this.tablesNames$.next(names);
          this.classicStart$.unsubscribe()
        }
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

    this.example$.unsubscribe();
    this.defaultExample$.unsubscribe();
  }

}
