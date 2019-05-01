import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { ObjectDetails, QanProfileService } from '../../../profile/qan-profile.service';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-examples-viewer',
  templateUrl: './examples-viewer.component.html',
  styleUrls: ['./examples-viewer.component.css']
})
export class ExamplesViewerComponent implements OnInit, OnDestroy {
  private example$: Subscription;
  private defaultExample$: Subscription;
  public exampleParams: any;
  public currentDetails: ObjectDetails;

  constructor(
    protected qanProfileService: QanProfileService,
    protected objectDetailsService: ObjectDetailsService,
  ) {
    this.currentDetails = this.qanProfileService.getCurrentDetails;
    this.example$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => this.getExample(parsedParams)))
      .subscribe(
        response => this.exampleParams = response
      );
  }

  ngOnInit() {
    this.defaultExample$ = this.getExample(this.currentDetails)
      .pipe(take(1))
      .subscribe(response => this.exampleParams = response)
  }

  ngOnDestroy() {
    this.example$.unsubscribe();
    this.defaultExample$.unsubscribe();
  }

  getExample(responseParams) {
    return this.objectDetailsService.GetQueryExample(responseParams).pipe(
      catchError(err => of({ query_examples: [] })),
      map(response => response.query_examples),
      catchError(err => of([])))
  }
}
