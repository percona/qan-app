import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavService } from '../core/nav.service';
import { BaseComponent } from './base.component';
import { QueryDetailsService, QueryDetails } from './query-details.service';

@Component({
    moduleId: module.id,
    templateUrl: 'query-details.component.html',
})
export class QueryDetailsComponent extends BaseComponent {

    protected queryID: string;
    protected queryDetails: QueryDetails;
    protected tableInfo;
    protected classicExplain;
    protected jsonExplain;
    protected dbName: string = '';
    protected dbTblNames: string = '';
    protected newDBTblNames: string = '';
    // protected metrics: {};
    // protected sparklines: Array<{}>;
    // protected queryClass: QueryClass;
    // protected queryExample: QueryExample;

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected navService: NavService, protected queryDetailsService: QueryDetailsService) {
        super(route, router, navService);
    }

    onChangeParams(params) {
        this.queryID = params['queryID'];
        this.navService.setNavigation({ 'dbServerName': this.route.snapshot.parent.params['mysqlServer'] });
        let from = this.navService.nav.from.format('YYYY-MM-DDTHH:mm:ss');
        let to = this.navService.nav.to.format('YYYY-MM-DDTHH:mm:ss');
        this.getQueryDetails(this.navService.nav.dbServer.UUID, this.queryID, from, to);
    }

    getQueryDetails(dbServerUUID, queryID, from, to: string) {
        this.dbName = this.dbTblNames = '';
        this.queryDetailsService.getQueryDetails(dbServerUUID, queryID, from, to)
            .then(data => {
                this.queryDetails = data;
                // TODO: solve issue with async
                // this.metrics = data.Metrics2; this.sparklines = data.Sparks2; this.queryClass = data.Query; this.queryExample = data.Example;
            })
            .then(() => this.getExplain())
            .then(() => this.getTableInfo())
            .catch(err => console.error(err));

        // this.navService.setAlert(queryID);
        // throw new Error('hello error 22');
    }

    getExplain() {
        let agentUUID = this.navService.nav.dbServer.Agent.UUID;
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        if (this.dbName === '') {
            this.dbName = this.getDBName();
        }

        let query = this.queryDetails.Example.Query;
        this.queryDetailsService.getExplain(agentUUID, dbServerUUID, this.dbName, query)
            .then(data => {
                this.classicExplain = data.Classic;
                this.jsonExplain = JSON.parse(data.JSON);
            })
            .catch(err => console.error(err));
    }

    getTableInfo() {
        let agentUUID = this.navService.nav.dbServer.Agent.UUID;
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        let dbName, tblName: string;
        if (this.dbTblNames === '') {
            dbName = this.getDBName();
            tblName = this.getTableName();
            this.dbTblNames = `\`${dbName}\`.\`${tblName}\``;
        } else {
            let parts = this.dbTblNames.split('.');
            dbName = parts[0];
            tblName = parts[1];
        }

        this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
            .then(data => this.tableInfo = data[`${dbName}.${tblName}`])
            .catch(err => console.error(err));
    }

    selectTableInfo(dbName: string, tblName: string) {
        let agentUUID = this.navService.nav.dbServer.Agent.UUID;
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        this.dbTblNames = `\`${dbName}\`.\`${tblName}\``;

        this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
            .then(data => this.tableInfo = data[`${dbName}.${tblName}`])
            .catch(err => console.error(err));
    }

    addDBTable() {
        if (this.newDBTblNames.length < 7) {
            return false;
        }
        let part = this.newDBTblNames.split('.');
        let db = part[0].replace(/`/g, '');
        let tbl = part[1].replace(/`/g, '');
        this.queryDetails.Query.Tables.push({ Db: db, Table: tbl });
        this.queryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
        this.dbTblNames = this.newDBTblNames;
        this.getTableInfo();
        this.newDBTblNames = '';
    }

    removeDBTable(dbTableItem) {
        let len = this.queryDetails.Query.Tables.length;
        for (let i = 0; i < len; i++) {
            try {
                if (this.queryDetails.Query.Tables[i].Db === dbTableItem.Db
                    && this.queryDetails.Query.Tables[i].Table === dbTableItem.Table) {
                    this.queryDetails.Query.Tables.splice(i, 1);
                }
            } catch (e) {
                console.error(e);
            }
        }
        this.queryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
    }

    isSelectedDbTbl(item): boolean {
        return `\`${item.Db}\`.\`${item.Table}\`` === this.dbTblNames;
    }

    private getTableName(): string {
        if (this.queryDetails.hasOwnProperty('Query')
            && this.queryDetails.Query.hasOwnProperty('Tables')
            && this.queryDetails.Query.Tables !== null
            && this.queryDetails.Query.Tables.length > 0) {
            return this.queryDetails.Query.Tables[0].Table;
        }
        return '';
    }

    private getDBName(): string {
        if (this.queryDetails.Example.Db !== '') {
            return this.queryDetails.Example.Db;
        } else if (this.queryDetails.hasOwnProperty('Query')
            && this.queryDetails.Query.hasOwnProperty('Tables')
            && this.queryDetails.Query.Tables !== null
            && this.queryDetails.Query.Tables.length > 0) {
            return this.queryDetails.Query.Tables[0].Db;
        }
        return '';
    }

    ngOnInit() {
        super.ngOnInit();
        this.navService.setNavigation({ 'subPath': 'profile' });
    }
}