import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavService, Instance } from '../core/nav.service';
import { BaseComponent } from './base.component';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { SettingsService } from './settings.service';

@Component({
    moduleId: module.id,
    templateUrl: 'settings.component.html',
    providers: [SettingsService],
})
export class SettingsComponent extends BaseComponent {

    public agent: Instance;
    public dbServer: Instance;
    public agentStatus: {};
    public qanConf: {};
    public agentConf: {};
    public interval: number = 1;
    public collectFrom: 'perfschema' | 'slowlog' = 'slowlog';
    public exampleQueries: boolean;
    public statusUpdatedFromNow$: Observable<string>;
    public logUpdatedFromNow$: Observable<string>;
    public agentLog: {};
    public severityLeveles: Array<string> = [
        'emerg', 'alert', 'crit', 'err',
        'warning', 'notice', 'info', 'debug'
    ];

    public logPeriod: number = 6;

    constructor(protected route: ActivatedRoute, protected router: Router, protected settingsService: SettingsService, protected navService: NavService) {
        super(route, router, navService);
    }

    setLogPeriod(period): void {
        this.logPeriod = period;
        this.getAgentLog(this.agent.UUID, this.logPeriod);
    }

    refreshAgentLog(): void {
        this.getAgentLog(this.agent.UUID, this.logPeriod);
    }

    getSetting() {
        this.settingsService.getQanConfig(this.navService.nav.dbServer.UUID)
            .then(res => this.qanConf = res)
            .catch(err => console.error(err));
    }

    getAgentDefaults() {
        this.settingsService.getAgentDefaults(this.agent.UUID, this.dbServer.UUID)
            .then(res => {
                this.agentConf = res;
                this.interval = this.agentConf.qan.Interval / 60;
                console.log(this.agentConf);
                this.collectFrom = this.agentConf.qan.CollectFrom;
                this.exampleQueries = this.agentConf.qan.ExampleQueries;
            })
            .catch(err => console.error(err));
    }

    setAgentDefaults() {
        console.log('exampleQueries', this.exampleQueries);
        this.settingsService.setAgentDefaults(this.agent.UUID, this.dbServer.UUID, this.interval, this.exampleQueries, this.collectFrom)
            .then(res => {this.agentConf = res; console.log('ddd', res); })
            .catch(err => console.error(err));
    }

    getAgentStatus() {
        this.agentStatus = this.settingsService.getAgentStatus(this.agent.UUID);
        let updated: moment.Moment = moment();
        this.statusUpdatedFromNow$ = Observable.interval(60000).map(n => updated.fromNow());
    }

    getAgentLog(agentUUID: string, period: number) {
        let begin = moment.utc().subtract(period, 'h').format('YYYY-MM-DDTHH:mm:ss');
        let end = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
        this.agentLog = this.settingsService.getAgentLog(agentUUID, begin, end);
        let updated: moment.Moment = moment();
        this.logUpdatedFromNow$ = Observable.interval(60000).map(n => updated.fromNow());
    }

    onChangeParams(params) {
        this.dbServer = this.navService.nav.dbServer;
        this.agent = this.navService.nav.dbServer.Agent;
        this.getSetting();
        this.getAgentDefaults();
        this.getAgentStatus();
        this.getAgentLog(this.agent.UUID, this.logPeriod);
    }

    ngOnInit() {
        super.ngOnInit();
        this.navService.setNavigation({ 'subPath': 'settings' });
    }
}