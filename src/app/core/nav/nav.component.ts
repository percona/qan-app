import 'rxjs/add/operator/filter';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Instance, InstanceService } from '../../core/instance.service';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { MomentFormatPipe } from 'app/shared/moment-format.pipe';
import { QueryParams } from '../../mysql/base.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  protected routerSubscription: Subscription;
  private alertSubscription: Subscription;
  public queryParams: QueryParams;
  public alert: string;

  public from: any | moment.Moment;
  public to: any | moment.Moment;

  public agent: Instance;
  public dbServer: Instance;
  public dbServers: Array<Instance> = [];
  public dbServerMap: { [key: string]: Instance } = {};

  public searchValue: string;

  public isExtHidden: boolean;

  public timezone: string;

  public constructor(private route: ActivatedRoute, private router: Router,
    private instanceService: InstanceService) {
    this.dbServer = instanceService.dbServers[0];
    this.agent = instanceService.dbServers[0].Agent;
    this.dbServers = instanceService.dbServers;
    this.dbServerMap = instanceService.dbServerMap;
  }

  ngOnInit() {
    const parseQueryParamDatePipe = new ParseQueryParamDatePipe();
    const momentFormatPipe = new MomentFormatPipe();
    this.timezone = momentFormatPipe.getCookie('timezone') || 'local';

    this.routerSubscription = this.router.events.filter((e: any) => e instanceof NavigationEnd)
      .subscribe((val) => {
        this.queryParams = this.route.snapshot.queryParams as QueryParams;
        this.isExtHidden = !this.router.url.startsWith('/profile');
        this.from = parseQueryParamDatePipe.transform(this.queryParams.from, 'from');
        this.to = parseQueryParamDatePipe.transform(this.queryParams.to, 'to');
        this.onChangeParams(this.queryParams);
      });
  }

  onChangeParams(params) {
    console.log('onChangeParams', params);
  }

  protected closeAlert() {
    this.alert = '';
  }

  protected setTimeZone(tz = 'utc') {
    // if (tz === 'utc') {
    //   moment.tz.setDefault('UTC');
    // } else {
    //   moment.tz.setDefault(undefined);
    // }
    this.timezone = tz;
    const expireDays = moment().utc().add(7, 'y').toString();
    document.cookie = `timezone=${tz}; expires=${expireDays}; path=/`;
  }

  protected setQuickRange(num = 0, unit = 's') {
    const params: QueryParams = Object.assign({}, this.queryParams);
    params.to = moment().valueOf();
    params.from = moment().subtract(num, unit).valueOf();
    this.router.navigate(['profile'], { queryParams: params });
  }

  protected setTimeRange(from, to) {
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
    this.routerSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
  }
}
