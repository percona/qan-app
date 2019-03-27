import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../core/services/instance.service';
import { CoreComponent } from '../core/core.component';
import { environment } from '../environment';
import * as moment from 'moment';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SettingsService],
})
export class SettingsComponent {
  // public agentStatus: {};
  // public qanConf: {};
  // public agentConf: any;
  // public oldInterval = '1';
  // public interval = '1';
  // public collectFrom: 'perfschema' | 'slowlog' = 'slowlog';
  // public exampleQueries: boolean;
  // public statusUpdatedFromNow$: Observable<string>;
  // public logUpdatedFromNow$: Observable<string>;
  // public agentLog: {};
  // public severityLeveles: Array<string> = [
  //   'emerg', 'alert', 'crit', 'err',
  //   'warning', 'notice', 'info', 'debug'
  // ];
  //
  // public logPeriod = 12;
  // public isDemo = false;
  // event = new Event('showSuccessNotification');
  // isApplied = false;
  // isError = false;
  //
  // constructor(protected route: ActivatedRoute, protected router: Router,
  //             public settingsService: SettingsService,
  //             protected instanceService: InstanceService) {
  //   super(route, router, instanceService);
  //   this.isDemo = environment.demoHosts.includes(location.hostname);
  // }
  //
  //
  // /**
  //  * Get agent log for N last hours.
  //  * @param period time period integer in hours
  //  */
  // setLogPeriod(period): void {
  //   this.logPeriod = period;
  //   this.getAgentLog();
  // }
  //
  // /**
  //  * get fresh agent log
  //  */
  // refreshAgentLog(): void {
  //   this.getAgentLog();
  // }
  //
  // validateValue(value) {
  //   if (this.interval === null) { return this.interval = ''; }
  //
  //   if (this.oldInterval !== value) {
  //       this.interval = (value > 60 || value < 1) ? this.oldInterval : value;
  //   }
  //   this.oldInterval = this.interval;
  // }
  //
  // /**
  //  * Get from agent:
  //  *  - Collect interval: positive integer;
  //  *  - Send real query examples: boolean;
  //  *  - Collect from: 'slowlog' or 'perfschema'.
  //  */
  // public async getAgentDefaults() {
  //   if (!this.agent || !this.dbServer || this.isAllSelected || this.isNotExistSelected) { return }
  //
  //   const res = await this.settingsService.getAgentDefaults(this.agent.UUID, this.dbServer.UUID);
  //   try {
  //     this.agentConf = res;
  //     this.interval = (this.agentConf.qan.Interval / 60).toString();
  //     this.collectFrom = this.agentConf.qan.CollectFrom;
  //     this.exampleQueries = this.agentConf.qan.ExampleQueries;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  //
  // /**
  //  * Set on agent:
  //  *  - Collect interval: positive integer;
  //  *  - Send real query examples: boolean;
  //  *  - Collect from: 'slowlog' or 'perfschema'.
  //  */
  // public async setAgentDefaults() {
  //   const res = await this.settingsService.setAgentDefaults(
  //     this.agent.UUID,
  //     this.dbServer.UUID,
  //     +this.interval,
  //     this.exampleQueries,
  //     this.collectFrom
  //   );
  //   const visibleMessageTime = 3000;
  //   try {
  //     // this.agentConf = res; // diffrent responce than GetDefaults.
  //     this.isApplied = true;
  //     window.parent.document.dispatchEvent(this.event);
  //     setTimeout(() => {
  //       this.isApplied = false;
  //     }, visibleMessageTime);
  //     this.getAgentDefaults();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  //
  // /**
  //  * Get slice of exported variables of agent.
  //  */
  // getAgentStatus() {
  //   if (!this.agent || this.isAllSelected || this.isNotExistSelected) { return }
  //
  //   this.agentStatus = this.settingsService.getAgentStatus(this.agent.UUID);
  //   const updated: any = moment();
  //   this.statusUpdatedFromNow$ = interval(60000).pipe(map(n => updated.fromNow()));
  // }
  //
  // /**
  //  * get agent log for some period.
  //  */
  // getAgentLog() {
  //   if (!this.agent || this.isAllSelected || this.isNotExistSelected) { return }
  //
  //   const begin = moment.utc().subtract(this.logPeriod, 'h').format('YYYY-MM-DDTHH:mm:ss');
  //   const end = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
  //   this.agentLog = this.settingsService.getAgentLog(this.agent.UUID, begin, end);
  //   const updated: any = moment();
  //   this.logUpdatedFromNow$ = interval(60000).pipe(map(n => updated.fromNow()));
  // }
  //
  // /**
  //  * Overrides parent method.
  //  * Executes on route was changed to refresh data.
  //  * @param params - URL query parameters
  //  */
  // onChangeParams(params) {
  //   this.getAgentDefaults();
  //   this.getAgentStatus();
  //   this.getAgentLog();
  // }
}
