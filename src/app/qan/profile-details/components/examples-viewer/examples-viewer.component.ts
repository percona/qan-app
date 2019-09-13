import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { QanProfileService } from '../../../profile/qan-profile.service';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { ProfileDetailsService } from '../../profile-details.service';
import { ObjectDetails } from '../../../profile/interfaces/object-details.interface';

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
  public isLoading: boolean;

  constructor(
    protected qanProfileService: QanProfileService,
    protected objectDetailsService: ObjectDetailsService,
    protected profileDetailsService: ProfileDetailsService
  ) {
    this.isLoading = true;
    this.currentDetails = this.qanProfileService.getCurrentDetails;
    this.example$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.isLoading = true;
        return this.getExample(parsedParams)
      }))
      .subscribe(
        response => {
          this.exampleParams = response;
          this.profileDetailsService.updateExamples(this.exampleParams);
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {
    this.defaultExample$ = this.getExample(this.currentDetails)
      .pipe(take(1))
      .subscribe(response => {
        this.exampleParams = response;
        this.profileDetailsService.updateExamples(this.exampleParams);
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    this.example$.unsubscribe();
    this.defaultExample$.unsubscribe();
  }

  getExample(responseParams) {
    return this.objectDetailsService.GetQueryExample(responseParams).pipe(
      catchError(err => {
        return of({ query_examples: [] })
      }),
      map(response => response.query_examples),
      catchError(err => of([])))
  }
}
