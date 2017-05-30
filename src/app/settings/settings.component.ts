import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Instance, InstanceService } from '../core/instance.service';
import { CoreComponent } from '../core/core.component';
import { environment } from '../environment';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { SettingsService } from './settings.service';

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

    public logPeriod = 1;
    public isDemo = environment.demo;

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected settingsService: SettingsService,
        protected instanceService: InstanceService) {
        super(route, router, instanceService);
    }

    setLogPeriod(period): void {
        this.logPeriod = period;
        this.getAgentLog();
    }

    refreshAgentLog(): void {
        this.getAgentLog();
    }

    getSetting() {
        this.settingsService.getQanConfig(this.dbServer.UUID)
            .then(res => this.qanConf = res)
            .catch(err => console.error(err));
    }

    getAgentDefaults() {
        this.settingsService.getAgentDefaults(this.agent.UUID, this.dbServer.UUID)
            .then(res => {
                this.agentConf = res;
                this.interval = this.agentConf.qan.Interval / 60;
                this.collectFrom = this.agentConf.qan.CollectFrom;
                this.exampleQueries = this.agentConf.qan.ExampleQueries;
            })
            .catch(err => console.error(err));
    }

    setAgentDefaults() {
        this.settingsService.setAgentDefaults(this.agent.UUID, this.dbServer.UUID,
            this.interval, this.exampleQueries, this.collectFrom)
            .then(res => { this.agentConf = res; })
            .catch(err => console.error(err));
    }

    getAgentStatus() {
        this.agentStatus = this.settingsService.getAgentStatus(this.agent.UUID);
        const updated: any = moment();
        this.statusUpdatedFromNow$ = Observable.interval(60000).map(n => updated.fromNow());
    }

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
        this.getSetting();
        this.getAgentDefaults();
        this.getAgentStatus();
        this.getAgentLog();
    }
}
