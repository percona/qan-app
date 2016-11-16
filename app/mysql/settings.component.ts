import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../core/nav.service';
import { BaseComponent } from './base.component'

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';


import { SettingsService } from './settings.service';

@Component({
    templateUrl: '/app/mysql/settings.component.html',
    providers: [SettingsService],
})
export class SettingsComponent extends BaseComponent {

    public agentUUID: string = '3f87c6cae45c456e6f97200729b2c3b5';
    public agentStatus: {};
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
        this.getAgentLog(this.agentUUID, this.logPeriod)
    }

    refreshAgentLog(): void {
        this.getAgentLog(this.agentUUID, this.logPeriod)
    }

    getAgentStatus(agentUUID: string) {
        this.agentStatus = this.settingsService.getAgentStatus(agentUUID);
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
        let agentUUID = this.navigation.dbServer.Agent.UUID;
        this.getAgentStatus(agentUUID);
        this.getAgentLog(agentUUID, this.logPeriod);
    }

    ngOnInit() {
        super.ngOnInit()
        this.navService.setNavigation({ 'subPath': 'settings' });
    }
}