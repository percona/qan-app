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
        this.queryDetailsService.getQueryDetails(dbServerUUID, queryID, from, to)
            .then(data => {
                this.queryDetails = data;
                // TODO: solve issue with async
                // this.metrics = data.Metrics2; this.sparklines = data.Sparks2; this.queryClass = data.Query; this.queryExample = data.Example;
            })
            .then(() => this.getTableInfo())
            .then(() => this.getExplain())
            .catch(err => console.error(err));

        // this.navService.setAlert(queryID);
        // throw new Error('hello error 22');
    }

    getExplain() {
        let agentUUID = this.navService.nav.dbServer.Agent.UUID;
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        let dbName = this.queryDetails.Example.Db || this.queryDetails.Query.Tables[0].Db;
        let query = this.queryDetails.Example.Query;
        this.queryDetailsService.getExplain(agentUUID, dbServerUUID, dbName, query)
            .then(data => {
                this.classicExplain = data.Classic;
                console.log('ddd', JSON.parse(data.JSON));
                this.jsonExplain = JSON.parse(data.JSON);
            })
            .catch(err => console.error(err));
    }

    getTableInfo() {
        let agentUUID = this.navService.nav.dbServer.Agent.UUID;
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        let dbName = this.queryDetails.Example.Db || this.queryDetails.Query.Tables[0].Db;
        let tblName = this.queryDetails.Query.Tables[0].Table;
        this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
            .then(data => this.tableInfo = data[`${dbName}.${tblName}`])
            .catch(err => console.error(err));
    }

    ngOnInit() {
        super.ngOnInit();
        this.navService.setNavigation({ 'subPath': 'profile' });
    }
}