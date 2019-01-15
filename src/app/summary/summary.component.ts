import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CoreComponent } from '../core/core.component';
import { SummaryService } from './summary.service';
import { InstanceService } from '../core/services/instance.service';
import * as JSZip from 'jszip';
import saveAs from 'jszip/vendor/FileSaver';
import * as moment from 'moment';
import { MomentFormatPipe } from '../shared/moment-format.pipe';


/**
 * Shows MySQL and Server Summary
 */
@Component({
  moduleId: module.id,
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends CoreComponent {

    public serverSummary: string;
    public mysqlSummary: string;
    public mongoSummary: string;
    public testingVariable = false;

    public serverSummaryError: string;
    public mysqlSummaryError: string;
    public mongoSummaryError: string;

    public serverSummaryLoader: boolean;
    public mysqlSummaryLoader: boolean;
    public mongoSummaryLoader: boolean;

    constructor(protected route: ActivatedRoute, protected router: Router,
        public summaryService: SummaryService, protected instanceService: InstanceService) {
        super(route, router, instanceService);
    }

    /**
     * Gets MySQL summary via API, Agent from `pt-summary`.
     * @param agentUUID agent UUID that is installed on same host as MySQL.
     */
    getServerSummary(agentUUID: string): void {
      if (!this.dbServer || this.isAllSelected || this.isNotExistSelected) { return; }
        this.summaryService
            .getServer(agentUUID, this.dbServer.ParentUUID)
            .then(data => this.serverSummary = data)
            .catch(err => this.serverSummaryError = err.message)
            .then(() => this.serverSummaryLoader = false);
    }

    /**
     * Gets MySQL summary via API, Agent from `pt-mysql-summary`.
     * @param agentUUID agent UUID that is monitoring MySQL Server.
     */
    getMySQLSummary(agentUUID: string): void {
      if (!this.dbServer || this.dbServer.Subsystem !== 'mysql' || this.isAllSelected || this.isNotExistSelected) { return; }
      this.summaryService
            .getMySQL(agentUUID, this.dbServer.UUID)
            .then(data => this.mysqlSummary = data)
            .catch(err => this.mysqlSummaryError = err.message)
            .then(() => this.mysqlSummaryLoader = false);
    }

     /**
     * Gets MongoDB summary via API, Agent from `pt-mongodb-summary`.
     * @param agentUUID agent UUID that is monitoring MongoDB Server.
     */
    getMongoSummary(agentUUID: string): void {
      if (!this.dbServer || this.dbServer.Subsystem !== 'mongo' || this.isAllSelected || this.isNotExistSelected) { return; }
        this.summaryService
            .getMongo(agentUUID, this.dbServer.UUID)
            .then(data => this.mongoSummary = data)
            .catch(err => this.mongoSummaryError = err.message)
            .then(() => this.mongoSummaryLoader = false);
    }

    downloadSummary() {
        if (!this.dbServer) { return; }

        const momentFormatPipe = new MomentFormatPipe();
        const date = momentFormatPipe.transform(moment.utc(), 'YYYY-MM-DDTHH:mm:ss');
        const filename = `pmm-${this.dbServer.Name}-${date}-summary.zip`;
        const zip = new JSZip();
        zip.file('system_summary.txt', this.serverSummary);
        if (this.dbServer.Subsystem === 'mongo') {
            zip.file('server_summary.txt', this.mongoSummary);
            this.testingVariable = true;
        } else if (this.dbServer.Subsystem === 'mysql') {
            zip.file('server_summary.txt', this.mysqlSummary);
            this.testingVariable = true;
        }
        zip.generateAsync({type: 'blob'})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, filename);
        });
    }


    /**
     * Ovverrides parent method.
     * Executes on route was changed to refresh data.
     * @param params - URL query parameters
     */
    onChangeParams(params) {
        if (!this.dbServer || !this.agent || !this.dbServer.Subsystem || this.isAllSelected || this.isNotExistSelected) { return; }
        // to initalise loader when host was changed
        this.mysqlSummary = '';
        this.mongoSummary = '';
        this.serverSummary = '';
        this.mysqlSummaryError = '';
        this.mongoSummaryError = '';
        this.serverSummaryError = '';
        this.mysqlSummaryLoader = true;
        this.mongoSummaryLoader = true;
        this.serverSummaryLoader = true;

        this.getServerSummary(this.agent.UUID);
        if (this.dbServer.Subsystem === 'mysql') {
            this.getMySQLSummary(this.agent.UUID);
        }
        if (this.dbServer.Subsystem === 'mongo') {
            this.getMongoSummary(this.agent.UUID)
        }
    }
}
