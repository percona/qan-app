
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BaseComponent } from './base.component'
import { SummaryService } from './summary.service';
import { NavService } from '../core/nav.service';

@Component({
    moduleId: module.id,
    template: `
<div class="row">
    <div class="col-md-12">
        <ngb-accordion activeIds="system-summary-panel,mysql-summary-panel">
            <ngb-panel id="system-summary-panel">
                <template ngbPanelTitle>
                    <h5>System Summary</h5>
                </template>
                <template ngbPanelContent>
                    <pre style="margin: 1rem">{{ serverSummary ? serverSummary : 'Loading...' }}</pre>
                </template>
            </ngb-panel>
            <ngb-panel id="mysql-summary-panel">
                <template ngbPanelTitle>
                    <h5>MySQL Summary</h5>
                </template>
                <template ngbPanelContent>
                    <pre style="margin: 1rem">{{ mysqlSummary ? mysqlSummary : 'Loading...' }}</pre>
                </template>
            </ngb-panel>
        </ngb-accordion>
    </div>
</div>`
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