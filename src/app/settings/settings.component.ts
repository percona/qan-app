import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Instance, InstanceService} from '../core/instance.service';
import {CoreComponent} from '../core/core.component';
import {environment} from '../environment';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import {SettingsService} from './settings.service';

@Component({
  moduleId: module.id,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SettingsService],
})
export class SettingsComponent extends CoreComponent {
  public agentStatus: {};
  public qanConf: {};
  public agentConf: any;
  public interval = 1;
  public collectFrom: 'perfschema' | 'slowlog' = 'slowlog';
  public exampleQueries: boolean;
  public statusUpdatedFromNow$: Observable<string>;
  public logUpdatedFromNow$: Observable<string>;
  public agentLog: {};
  public severityLeveles: Array<string> = [
    'emerg', 'alert', 'crit', 'err',
    'warning', 'notice', 'info', 'debug'
  ];

  public logPeriod = 12;
  public isDemo = false;
  isSuccess = false;
  isError = false;

  constructor(protected route: ActivatedRoute, protected router: Router,
              protected settingsService: SettingsService,
              protected instanceService: InstanceService) {
    super(route, router, instanceService);
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }


  /**
   * Get agent log for N last hours.
   * @param period time period integer in hours
   */
  setLogPeriod(period): void {
    this.logPeriod = period;
    this.getAgentLog();
  }

  /**
   * get fresh agent log
   */
  refreshAgentLog(): void {
    this.getAgentLog();
  }

  /**
   * Get from agent:
   *  - Collect interval: positive intager;
   *  - Send real query examples: boolean;
   *  - Collect from: 'slowlog' or 'perfschema'.
   */
  public async getAgentDefaults() {
    const res = await this.settingsService.getAgentDefaults(this.agent.UUID, this.dbServer.UUID);
    try {
      this.agentConf = res;
      this.interval = this.agentConf.qan.Interval / 60;
      this.collectFrom = this.agentConf.qan.CollectFrom;
      this.exampleQueries = this.agentConf.qan.ExampleQueries;
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Set on agent:
   *  - Collect interval: positive intager;
   *  - Send real query examples: boolean;
   *  - Collect from: 'slowlog' or 'perfschema'.
   */
  public async setAgentDefaults() {
    const res = await this.settingsService.setAgentDefaults(
      this.agent.UUID,
      this.dbServer.UUID,
      this.interval,
      this.exampleQueries,
      this.collectFrom
    );
    const visibleMessageTime = 5000;
    try {
      // this.agentConf = res; // diffrent responce than GetDefaults.
      this.isSuccess = true;
      this.isError = false;
      setTimeout(() => {
        this.isSuccess = false;
        this.isError = false;
      }, visibleMessageTime); // add const
      this.getAgentDefaults();
    } catch (err) {
      this.isSuccess = false;
      this.isError = true;
      setTimeout(() => {
        this.isSuccess = false;
        this.isError = false;
      }, visibleMessageTime);
      console.error(err);
    }
  }

  /**
   * Get slice of exported variables of agent.
   */
  getAgentStatus() {
    this.agentStatus = this.settingsService.getAgentStatus(this.agent.UUID);
    const updated: any = moment();
    this.statusUpdatedFromNow$ = Observable.interval(60000).map(n => updated.fromNow());
  }

  /**
   * get agent log for some period.
   */
  getAgentLog() {
    const begin = moment.utc().subtract(this.logPeriod, 'h').format('YYYY-MM-DDTHH:mm:ss');
    const end = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
    this.agentLog = this.settingsService.getAgentLog(this.agent.UUID, begin, end);
    const updated: any = moment();
    this.logUpdatedFromNow$ = Observable.interval(60000).map(n => updated.fromNow());
  }
  /**
   * Ovverrides parent method.
   * Executes on route was changed to refresh data.
   * @param params - URL query parameters
   */
  onChangeParams(params) {
    this.getAgentDefaults();
    this.getAgentStatus();
    this.getAgentLog();
  }
}
