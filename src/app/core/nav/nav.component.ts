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

  public isDemo = environment.demo;

  public isExtHidden: boolean;

  public timezone: string;

  public fromDateCompact: string;

  public toDateCompact: string;

  private compactDateFormat = 'MMM D, YYYY HH:mm:ss';

  private fromTimeRaw: string;
  private toTimeRaw: string;

  public isValidToInput = true;
  public isValidFromInput = true;
  public path: string;

  public constructor(route: ActivatedRoute, router: Router, instanceService: InstanceService) {
    super(route, router, instanceService);
    const momentFormatPipe = new MomentFormatPipe();
    this.timezone = momentFormatPipe.getCookie('timezone') || 'local';
  }

  onChangeParams(params) {
    // checks changing tz
    const momentFormatPipe = new MomentFormatPipe();
    this.fromDateCompact = momentFormatPipe.transform(this.from, this.compactDateFormat);
    this.toDateCompact = momentFormatPipe.transform(this.to, this.compactDateFormat);
    let pathWithParams = this.router.url;
    this.path = pathWithParams.substr(0, pathWithParams.indexOf('?'));
    this.isExtHidden = false;
    if (this.router.url.startsWith('/sys-summary') ||
      this.router.url.startsWith('/settings')) {
      this.isExtHidden = true;
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
          time = moment().subtract(num, unit).valueOf();
          break;
        case '+':
          time = moment().add(num, unit).valueOf();
          break;
        case '/':
          time = moment().startOf(num, unit).valueOf();
          break;
      }
    } else {
      if (val.length > 3) {
        console.log('val', val);
        try {
          if (moment(val, 'YYYY-MM-DD HH:mm').isValid()) {
            time = moment(val, 'YYYY-MM-DD HH:mm').valueOf();
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
      this.fromTimeRaw = moment([event.year, event.month - 1, event.day]).valueOf();
    } else {
      this.toTimeRaw = moment([event.year, event.month - 1, event.day]).valueOf();
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

  setQuickRange(num = 0, unit = 's') {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = moment().valueOf();
    params.from = moment().subtract(num, unit).valueOf();
    this.router.navigate(['profile'], { queryParams: params });
  }

  setTimeRange(from, to) {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = this.toTimeRaw;
    params.from = this.fromTimeRaw;
    this.router.navigate(['profile'], { queryParams: params });
  }

  getDBLogo(distro: string): string {
    let src: string;
    switch (true) {
      case distro.indexOf('Percona Server') !== -1:
        src = 'assets/percona-server-black-50.png';
        break;
      case distro.indexOf('Percona XtraDB') !== -1:
        src = 'assets/Percona_XtraDB_Cluster.png';
        break;
      default:
        src = 'assets/database.png';
        break;
    }
    return src;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
