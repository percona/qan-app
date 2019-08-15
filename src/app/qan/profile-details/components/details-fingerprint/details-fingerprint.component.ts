import { Component, OnDestroy, OnInit } from '@angular/core';
import { QanProfileService, ObjectDetails } from '../../../profile/qan-profile.service';
import { FilterMenuService } from '../../../filter-menu/filter-menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-details-fingerprint',
  templateUrl: './details-fingerprint.component.html',
  styleUrls: ['./details-fingerprint.component.css']
})
export class DetailsFingerprintComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public fingerprint: string;
  public details: ObjectDetails;
  constructor(
    private qanProfileService: QanProfileService,
    private filterMenuService: FilterMenuService
  ) {
    this.qanProfileService.getProfileInfo.details.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      details => this.details = details
    );
    this.qanProfileService.getProfileInfo.fingerprint.pipe(
      takeUntil(this.destroy$)
    ).subscribe(fingerprint => this.fingerprint = fingerprint);
  }

  humanizeLabels(groupName) {
    return this.filterMenuService.humanNamesForGroup(groupName);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
