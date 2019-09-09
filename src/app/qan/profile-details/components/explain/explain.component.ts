import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsService } from '../../../../pmm-api-services/services/actions.service';
import { interval, of, Subscription } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap, take } from 'rxjs/operators';
import { QanProfileService } from '../../../profile/qan-profile.service';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { ObjectDetails } from '../../../profile/interfaces/object-details.interface';

@Component({
  selector: 'app-explain',
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.css']
})
export class ExplainComponent implements OnInit, OnDestroy {
  private example$: Subscription;
  private defaultExample$: Subscription;
  private classicStart$: Subscription;
  private jsonStart$: Subscription;

  public currentDetails: ObjectDetails;
  public classicOutput: string;
  public classicError = '';
  public jsonOutput: string;
  public jsonError = '';
  public visualOutput: string;
  public isClassicLoading: boolean;
  public isJsonLoading: boolean;

  constructor(
    private actionsService: ActionsService,
    protected objectDetailsService: ObjectDetailsService,
    protected qanProfileService: QanProfileService,
  ) {
    this.isClassicLoading = true;
    this.currentDetails = this.qanProfileService.getCurrentDetails;
    this.example$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.isClassicLoading = true;
        this.isJsonLoading = true;
        return this.getExample(parsedParams)
      }))
      .subscribe(
        response => {
          this.startExplainActions(response[0])
        }
      );

    this.defaultExample$ = this.getExample(this.currentDetails)
      .pipe(take(1))
      .subscribe(response => this.startExplainActions(response[0]))
  }

  ngOnInit() {
  }

  private startExplainActions(value) {
    switch (value.service_type) {
      case 'mysql':
        this.startClassic(value);
        this.startJson(value);
        break;
      default:
        this.classicError = 'Not implemented yet.';
        this.isClassicLoading = false;
        this.jsonError = 'Not implemented yet.';
        this.isJsonLoading = false;
        return
    }
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
        if (!res.error) {
          this.classicError = '';
          this.classicOutput = JSON.parse(res.output);
        } else {
          this.classicError = res.error;
        }
        this.isClassicLoading = false;
        if (this.classicStart$) {
          this.classicStart$.unsubscribe()
        }
      }
    });
  }

  private startJson(value) {
    this.jsonStart$ = this.actionsService.StartMySQLExplainJSONAction({
      service_id: value.service_id,
      query: value.example,
      database: value.schema,
    }).pipe(
      catchError(error => {
        error.error.done = true;
        return of(error.error)
      }),
      switchMap((item) => !item.error ? this.getActionResult(item) : of(item))
    ).subscribe(
      res => {
        if (res.done) {
          if (!res.error) {
            this.jsonError = '';
            this.jsonOutput = JSON.parse(res.output);
          } else {
            this.jsonError = res.error;
          }
          this.isJsonLoading = false;
          if (this.jsonStart$) {
            this.jsonStart$.unsubscribe();
          }
        }
      },
      err => {
        this.isJsonLoading = false;
        console.log('error - ', err)
      }
    );
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
