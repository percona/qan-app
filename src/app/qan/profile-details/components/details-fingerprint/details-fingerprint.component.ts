import { Component, OnDestroy, OnInit } from '@angular/core';
import { QanProfileService, ObjectDetails } from '../../../profile/qan-profile.service';
import { FilterMenuService } from '../../../filter-menu/filter-menu.service';
import { Observable, Subscription, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details-fingerprint',
  templateUrl: './details-fingerprint.component.html',
  styleUrls: ['./details-fingerprint.component.css']
})
export class DetailsFingerprintComponent implements OnInit, OnDestroy {
  public fingerprint: string;
  public details: ObjectDetails;
  public header: Observable<string>;
  constructor(
    private qanProfileService: QanProfileService,
    private filterMenuService: FilterMenuService
  ) {
    this.header = zip(
      this.qanProfileService.getProfileInfo.details,
      this.qanProfileService.getProfileInfo.fingerprint
    ).pipe(
      map(
        zips => {
          this.details = zips[0];
          this.fingerprint = zips[1];
          if (this.details.group_by === 'queryid') {
            return this.fingerprint || 'Queries'
          } else {
            return this.humanizeLabels(this.details.group_by) + ': ' +
              (this.details.filter_by === '' ? 'TOTAL' : this.details.filter_by);
          }
        }
      )
    );
  }

  humanizeLabels(groupName) {
    return this.filterMenuService.humanNamesForGroup(groupName);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
