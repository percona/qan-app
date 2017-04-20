import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BaseComponent } from '../base.component';
import { SummaryService } from './summary.service';
import { Instance, InstanceService } from '../../core/instance.service';

/**
 * Shows MySQL and Server Summary
 */
@Component({
  moduleId: module.id,
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends BaseComponent {

    public serverSummary: string;
    public mysqlSummary: string;

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected summaryService: SummaryService, protected instanceService: InstanceService) {
        super(route, router, instanceService);
    }

    /**
     * Gets MySQL summary via API, Agent from `pt-summary`.
     * @param agentUUID agent UUID that is installed on same host as MySQL.
     */
    getServerSummary(agentUUID: string): void {
        this.summaryService
            .getServer(agentUUID)
            .then(data => this.serverSummary = data);
    }

    /**
     * Gets MySQL summary via API, Agent from `pt-mysql-summary`.
     * @param agentUUID agent UUID that is monitoring MySQL Server.
     */
    getMySQLSummary(agentUUID: string): void {
        this.summaryService
            .getMySQL(agentUUID)
            .then(data => this.mysqlSummary = data);
    }

    /**
     * Ovverrides parent method.
     * Executes on route was changed to refresh data.
     * @param params - URL query parameters
     */
    onChangeParams(params) {
        this.getServerSummary(this.agent.UUID);
        this.getMySQLSummary(this.agent.UUID);
    }
}
