import 'rxjs/add/operator/filter';
import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Instance, InstanceService } from '../../core/instance.service';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { MomentFormatPipe } from '../../shared/moment-format.pipe';
import { QueryParams, CoreComponent } from '../core.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { environment } from '../../environment';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class NavComponent extends CoreComponent implements OnDestroy {
  protected routerSubscription: Subscription;

  public isDemo = false;

  public isExtHidden: boolean;

  public timezone: string;

  public fromDateCompact: string;

  public toDateCompact: string;

  private compactDateFormat = 'MMM D, YYYY HH:mm:ss';

  public fromTimeRaw: string;
  public toTimeRaw: string;

  public isValidToInput = true;
  public isValidFromInput = true;
  public path: string;
  public hostSelectorPath = [];
  public testingVariable = true;

  public constructor(route: ActivatedRoute, router: Router, instanceService: InstanceService) {
    super(route, router, instanceService);
    const momentFormatPipe = new MomentFormatPipe();
    this.isDemo = environment.demoHosts.includes(location.hostname);
    this.timezone = momentFormatPipe.getCookie('timezone') || 'browser';
  }

  onChangeParams(params) {
    // checks changing tz
    const momentFormatPipe = new MomentFormatPipe();
    this.fromDateCompact = momentFormatPipe.transform(this.from, this.compactDateFormat);
    this.toDateCompact = momentFormatPipe.transform(this.to, this.compactDateFormat);
    const pathWithParams = this.router.url;
    this.path = pathWithParams.substr(0, pathWithParams.indexOf('?'));
    this.isExtHidden = true;
    this.hostSelectorPath = [];

    if (this.router.url.startsWith('/profile')) {
      this.isExtHidden = false;
      this.hostSelectorPath = ['/profile'];
    }
  }

  changeDateInput(event, dir) {
    const val = event.trim();
    let time = '';
    const reg = /^(now)([-/+])(\d+)([yMwdhms])$/;
    if (reg.test(val)) {
      const [, , sign, num, unit] = reg.exec(val);
      switch (sign) {
        case '-':
          time = moment().subtract(num as moment.unitOfTime.DurationConstructor, unit).valueOf().toString();
          this.testingVariable = true;
          break;
        case '+':
          time = moment().add(num as moment.unitOfTime.DurationConstructor, unit).valueOf().toString();
          this.testingVariable = true;
          break;
        case '/':
          time = moment().startOf(unit as moment.unitOfTime.StartOf).valueOf().toString();
          this.testingVariable = true;
          break;
      }
    } else {
      if (val.length > 3) {
        try {
          if (moment(val, 'YYYY-MM-DD HH:mm').isValid()) {
            time = moment(val, 'YYYY-MM-DD HH:mm').valueOf().toString();
            this.testingVariable = true;
          } else {
            throw new Error('Input value is invalid');
          }
        } catch (err) {
          if (dir === 'from') {
            this.isValidFromInput = false;
          } else {
            this.isValidToInput = false;
          }
        }
      }
    }

    if (time !== '') {
      if (dir === 'from') {
        this.isValidFromInput = true;
        this.fromTimeRaw = time;
      } else {
        this.isValidToInput = true;
        this.toTimeRaw = time;
      }
    }
  }

  changeDateCal(event, dir) {
    if (dir === 'from') {
      this.fromTimeRaw = moment([event.year, event.month - 1, event.day]).valueOf().toString();
    } else {
      this.toTimeRaw = moment([event.year, event.month - 1, event.day]).valueOf().toString();
    }
  }

  setTimeZone(tz = 'utc') {
    this.timezone = tz;
    const expireDays = moment().utc().add(7, 'y').toString();
    document.cookie = `timezone=${tz}; expires=${expireDays}; path=/`;
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.tz = tz;
    this.router.navigate([this.path], { queryParams: params, relativeTo: this.route });
  }

  setQuickRange(num: string, unit = 's') {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = moment().valueOf().toString();
    params.from = moment().subtract(num as moment.unitOfTime.DurationConstructor, unit).valueOf().toString();
    this.router.navigate(['profile'], { queryParams: params });
    this.testingVariable = true;
  }

  setTimeRange(from, to) {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = this.toTimeRaw;
    params.from = this.fromTimeRaw;
    this.router.navigate(['profile'], { queryParams: params });
    this.testingVariable = true;
  }

  getDBLogo(distro: string): string {
    let src: string;
    switch (true) {
      case distro.indexOf('Percona Server') !== -1:
        src = 'assets/percona-server-black-50.png';
        this.testingVariable = true;
        break;
      case distro.indexOf('Percona XtraDB') !== -1:
        src = 'assets/Percona_XtraDB_Cluster.png';
        this.testingVariable = true;
        break;
      default:
        src = 'assets/database.png';
        this.testingVariable = true;
        break;
    }
    return src;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
