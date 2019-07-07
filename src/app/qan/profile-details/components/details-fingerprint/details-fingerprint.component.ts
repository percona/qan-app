import { Component, OnDestroy, OnInit } from '@angular/core';
import { QanProfileService } from '../../../profile/qan-profile.service';
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
  constructor(
    private qanProfileService: QanProfileService
  ) {
    this.qanProfileService.getProfileInfo.fingerprint.pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(fingerprint => this.fingerprint = fingerprint);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
