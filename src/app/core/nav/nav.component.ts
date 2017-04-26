import 'rxjs/add/operator/filter';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Instance, InstanceService } from '../../core/instance.service';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { MomentFormatPipe } from 'app/shared/moment-format.pipe';
import { QueryParams, BaseComponent } from '../../mysql/base.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class NavComponent extends BaseComponent implements OnInit, OnDestroy {
  protected routerSubscription: Subscription;
  private alertSubscription: Subscription;
  public alert: string;

  public searchValue: string;

  public isExtHidden: boolean;

  public timezone: string;

  public constructor(route: ActivatedRoute, router: Router, instanceService: InstanceService) {
    super(route, router, instanceService);
    const momentFormatPipe = new MomentFormatPipe();
    this.timezone = momentFormatPipe.getCookie('timezone') || 'local';
  }

  onChangeParams(params) {
    console.log('onChangeParams', params);
  }

  closeAlert() {
    this.alert = '';
  }

  setTimeZone(tz = 'utc') {
    this.timezone = tz;
    const expireDays = moment().utc().add(7, 'y').toString();
    document.cookie = `timezone=${tz}; expires=${expireDays}; path=/`;
  }

  setQuickRange(num = 0, unit = 's') {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = moment().valueOf();
    params.from = moment().subtract(num, unit).valueOf();
    this.router.navigate(['profile'], { queryParams: params });
  }

  setTimeRange(from, to) {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = moment([to.year, to.month - 1, to.day]).valueOf();
    params.from = moment([from.year, from.month - 1, from.day]).valueOf();
    this.router.navigate(['profile'], { queryParams: params });
  }

  search() {
    const params: QueryParams = Object.assign({}, this.queryParams);
    if (!!this.searchValue) { params.search = this.searchValue; }
    this.router.navigate(['profile'], { queryParams: params });
  }

  reset() {
    const params: QueryParams = Object.assign({}, this.queryParams);
    delete params.search;
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
    this.alertSubscription.unsubscribe();
  }
}
