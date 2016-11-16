
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BaseComponent } from './base.component'
import { SummaryService } from './summary.service';
import { NavService } from '../core/nav.service';

@Component({
    template: `
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header text-xs-center">System Summary</div>
            <div class="card-block">
                <pre>{{ serverSummary ? serverSummary : 'Loading...' }}</pre>
            </div>
        </div>
        <div class="card">
            <div class="card-header text-xs-center">MySQL Summary</div>
            <div class="card-block">
                <pre>{{ mysqlSummary ? mysqlSummary : 'Loading...' }}</pre>
            </div>
        </div>
    </div>
</div>
    `
})
export class SummaryComponent extends BaseComponent {

    public serverSummary: string;
    public mysqlSummary: string;

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected summaryService: SummaryService, protected navService: NavService) {
        super(route, router, navService);
    }

    getServerSummary(agentUUID: string): void {
        this.summaryService
            .getServer(agentUUID)
            .then(data => this.serverSummary = data);
    }

    getMySQLSummary(agentUUID: string): void {
        this.summaryService
            .getMySQL(agentUUID)
            .then(data => this.mysqlSummary = data);
    }

    onChangeParams(params) {
        let agentUUID = this.navService.dbServerMap[params.mysqlServer].Agent.UUID;
        this.getServerSummary(agentUUID);
        this.getMySQLSummary(agentUUID);
    }

    ngOnInit() {
        super.ngOnInit()
        this.navService.setNavigation({ 'subPath': 'sys-summary' });
    }
}