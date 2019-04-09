import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as hljs from 'highlight.js';
import * as vkbeautify from 'vkbeautify';
import { CoreComponent, QueryParams } from '../../core/core.component';
import { InstanceService } from '../../core/services/instance.service';
import { QueryDetails, QueryDetailsService } from './query-details.service';
import { Component, OnInit } from '@angular/core';
import { QanTableService } from '../qan-table/qan-table.service';
import { catchError, retryWhen, switchMap } from 'rxjs/operators';
import { MetricsService } from '../../inventory-api/services/metrics.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.scss']
})

export class QueryDetailsComponent implements OnInit {
  public queryDetails: any | QueryDetails;
  protected dbName: string;
  protected newDBTblNames: string;
  public dbTblNames: string;
  public queryExample: string;
  public fingerprint: string;
  public tableInfo;
  public createTable: string;
  public statusTable;
  public indexTable;
  public explainClassic;
  public explainVisual;
  public explainData;
  isLoading: boolean;
  isMongo = false;
  isExplain: boolean;
  isFirstSeen: boolean;
  isSummary: boolean;
  isExplainLoading: boolean;
  firstSeen: string;
  lastSeen: string;
  isTableInfoLoading: boolean;

  createTableError: string;
  statusTableError: string;
  indexTableError: string;

  explainError: string;

  explainJsonString: string;
  explainJson: string;
  isCopied = {
    fingerprint: false,
    example: false,
    json: false,
    visual: false,
    create: false,
  };
  accordionIds = {
    serverSummary: ['metrics-table'],
    querySection: ['query-fingerprint'],
    explainSection: ['classic-explain'],
    tableSection: ['table-create'],
  };

  event = new Event('showSuccessNotification');

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected qanTableService: QanTableService,
    protected metricsService: MetricsService,
    public queryDetailsService: QueryDetailsService) {
    console.log('query details constructor');
    console.log('time range - ', this.qanTableService.getTimeRange);
    this.qanTableService.objectDetailsSource.pipe(
      switchMap(parsedParams => this.metricsService.GetMetrics(parsedParams)
        .pipe(
          catchError(err => {
            console.log('catch err details - ', err);
            return throwError(err)
          }),
        )),
      retryWhen(error => error)
    ).subscribe(
      response => console.log('response details - ', response),
      err => console.log('err details - ', err)
    )
  }

  ngOnInit() {
    // this.queryParams = this.route.snapshot.queryParams as QueryParams;
    // this.parseParams();
    // this.onChangeParams(this.queryParams);
  }

  // /**
  //  * Reset server summery and query details if query changes
  //  * @param params - current link params
  //  */
  // onChangeParams(params) {
  //   if (!this.dbServer) { return }
  //
  //   if (['TOTAL', undefined].indexOf(this.queryParams.queryID) !== -1) {
  //     this.isSummary = true;
  //     this.getServerSummary(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate);
  //   } else {
  //     this.isSummary = false;
  //     this.getQueryDetails(this.dbServer.UUID, this.queryParams.queryID, this.fromUTCDate, this.toUTCDate);
  //     this.accordionIds = {
  //       serverSummary: ['metrics-table'],
  //       querySection: ['query-fingerprint'],
  //       explainSection: ['classic-explain'],
  //       tableSection: ['table-create'],
  //     };
  //   }
  // }
  //
  // /**
  //  * Display server summery
  //  * @param dbServerUUID - UUID of current dbServer
  //  * @param from - start of date period
  //  * @param to - end of date period
  //  */
  // async getServerSummary(dbServerUUID: string, from: string, to: string) {
  //   this.dbName = this.dbTblNames = '';
  //   try {
  //     this.queryDetails = await this.queryDetailsService.getSummary(dbServerUUID, from, to) as QueryDetails;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  //
  // /**
  //  * Display query details of current query for selected date period
  //  * @param dbServerUUID - UUID of current dbServer
  //  * @param queryID - id of current query
  //  * @param from - start of date period
  //  * @param to - end of date period
  //  */
  // async getQueryDetails(dbServerUUID, queryID, from, to: string) {
  //   this.isLoading = true;
  //   this.dbName = this.dbTblNames = '';
  //   this.queryExample = '';
  //   try {
  //     this.queryDetails = await this.queryDetailsService.getQueryDetails(dbServerUUID, queryID, from, to);
  //     this.firstSeen = moment(this.queryDetails.Query.FirstSeen).calendar(null, { sameElse: 'lll' });
  //     this.lastSeen = moment(this.queryDetails.Query.LastSeen).calendar(null, { sameElse: 'lll' });
  //     this.isFirstSeen = moment.utc(this.queryDetails.Query.FirstSeen).valueOf() > moment.utc(this.fromUTCDate).valueOf();
  //
  //     switch (this.dbServer.Subsystem) {
  //       case ('mysql'):
  //         this.fingerprint = hljs.highlight('sql', this.fixBeautifyText(this.queryDetails.Query.Fingerprint)).value;
  //         this.queryExample = hljs.highlight('sql', this.fixBeautifyText(this.queryDetails.Example.Query)).value;
  //         this.getTableInfo();
  //         break;
  //       case ('mongo'):
  //         this.isMongo = true;
  //         this.fingerprint = this.queryDetails.Query.Fingerprint;
  //         this.queryExample = hljs.highlight('json', vkbeautify.json(this.queryDetails.Example.Query)).value;
  //         break;
  //       default:
  //         throw new Error();
  //     }
  //
  //     if (this.queryExample) {
  //       this.getExplain();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   this.isLoading = false;
  // }
  //
  // /**
  //  * Display Explain data for current query
  //  */
  // async getExplain() {
  //   if (!this.dbServer.Agent) { return }
  //
  //   this.isExplainLoading = true;
  //   this.explainJson = '';
  //   this.explainError = '';
  //
  //   const agentUUID = this.dbServer.Agent.UUID;
  //   const dbServerUUID = this.dbServer.UUID;
  //   const query = this.queryDetails.Example.Query;
  //   const maxExampleBytes = 10240;
  //
  //   if (query.length >= maxExampleBytes) {
  //     this.explainError = `
  //       Cannot explain truncated query.
  //       This query was truncated to maximum size of ${maxExampleBytes} bytes.
  //     `;
  //     this.isExplainLoading = false;
  //     return
  //   }
  //
  //   if (this.dbName === '') {
  //     this.dbName = this.getDBName();
  //   }
  //
  //   try {
  //     this.explainData = await this.queryDetailsService.getExplain(agentUUID, dbServerUUID, this.dbName, query);
  //
  //     if (this.explainData.hasOwnProperty('Error') && this.explainData['Error'] !== '') {
  //       throw new Error(this.explainData['Error']);
  //     }
  //
  //     this.explainData = JSON.parse(atob(this.explainData.Data));
  //     this.explainJson = typeof this.explainData.JSON === 'string' ? JSON.parse(this.explainData.JSON) : this.explainData.JSON;
  //     this.explainJsonString = JSON.stringify(this.explainJson);
  //
  //     if (this.dbServer.Subsystem === 'mysql') {
  //       this.explainClassic = this.explainData.Classic;
  //       this.explainVisual = this.explainData.Visual;
  //     }
  //   } catch (err) {
  //     switch (this.dbServer.Subsystem) {
  //       case ('mysql'):
  //         this.explainError = 'This type of query is not supported for EXPLAIN';
  //         break;
  //       case ('mongo'):
  //         this.explainError = this.explainData.Error;
  //         break;
  //       default:
  //         console.error(err);
  //     }
  //   }
  //   this.isExplain = !!(this.explainError || this.explainJson || this.explainVisual || this.explainClassic);
  //   this.isExplainLoading = false;
  // }
  //
  // /**
  //  * Display table data for current query
  //  */
  // getTableInfo() {
  //   if (!this.dbServer.Agent) { return }
  //
  //   const agentUUID = this.dbServer.Agent.UUID;
  //   const dbServerUUID = this.dbServer.UUID;
  //   let dbName, tblName: string;
  //
  //   this.isTableInfoLoading = true;
  //   this.statusTableError = '';
  //   this.indexTableError = '';
  //   this.createTableError = '';
  //
  //   if (this.dbTblNames === '') {
  //     dbName = this.getDBName();
  //     tblName = this.getTableName();
  //     this.dbTblNames = `\`${dbName}\`.\`${tblName}\``;
  //   } else {
  //     const parts = this.dbTblNames.split('.');
  //     dbName = parts[0].replace(/`/g, '');
  //     tblName = parts[1].replace(/`/g, '');
  //   }
  //
  //   this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
  //     .then(data => {
  //       const info = data[`${dbName}.${tblName}`];
  //       this.tableInfo = info;
  //       this.statusTable = info.Status;
  //       this.indexTable = info.Index;
  //       try {
  //         this.createTable = hljs.highlight('sql', this.tableInfo.Create).value;
  //       } catch (e) {
  //       }
  //       if (info.hasOwnProperty('Errors') && info['Errors'].length > 0) {
  //         throw info['Errors'];
  //       }
  //     })
  //     .catch(errors => {
  //       for (const err of errors) {
  //         if (err.startsWith('SHOW TABLE STATUS')) {
  //           this.statusTableError = err;
  //         }
  //         if (err.startsWith('SHOW INDEX FROM')) {
  //           this.indexTableError = err;
  //         }
  //         if (err.startsWith('SHOW CREATE TABLE')) {
  //           this.createTableError = err;
  //         }
  //       }
  //
  //     })
  //     .then(() => this.isTableInfoLoading = false);
  // }
  //
  // /**
  //  * Get table name
  //  * @return table name or empty string
  //  */
  // getTableName(): string {
  //   if (this.queryDetails.hasOwnProperty('Query')
  //     && this.queryDetails.Query.hasOwnProperty('Tables')
  //     && this.queryDetails.Query.Tables !== null
  //     && this.queryDetails.Query.Tables.length > 0) {
  //     return this.queryDetails.Query.Tables[0].Table;
  //   }
  //   return '';
  // }
  //
  // /**
  //  * Get DB name
  //  * @return DB name or empty string
  //  */
  // getDBName(): string {
  //   if (this.queryDetails.Example.Db !== '') {
  //     return this.queryDetails.Example.Db;
  //   } else if (this.queryDetails.hasOwnProperty('Query')
  //     && this.queryDetails.Query.hasOwnProperty('Tables')
  //     && this.queryDetails.Query.Tables !== null // ?????????
  //     && this.queryDetails.Query.Tables.length > 0) {
  //     return this.queryDetails.Query.Tables[0].Db;
  //   }
  //   return '';
  // }
  //
  // /**
  //  * Fix beautify dispalying text, will be delete after approve https://github.com/vkiryukhin/vkBeautify/pull/25
  //  * @param {string} text
  //  * @returns {string}
  //  */
  // fixBeautifyText(text: string): string {
  //   return vkbeautify.sql(text.toLowerCase()).replace('explain', 'EXPLAIN ').replace('  ', ' ');
  // }
  //
  // /**
  //  * Show notification if content has been copied
  //  * @param key - name of current copied section
  //  */
  // showSuccessNotification(key) {
  //   this.isCopied[key] = true;
  //   setTimeout(() => {
  //     this.isCopied[key] = false
  //   }, 3000);
  //   window.parent.document.dispatchEvent(this.event);
  // }
  //
  // /**
  //  * Show table info for current table name if it in current db
  //  * @param dbName - name of current DB
  //  * @param tblName - name of current table
  //  */
  // selectTableInfo(dbName: string, tblName: string) {
  //   if (!this.dbServer || !this.dbServer.Agent) { return; }
  //   const agentUUID = this.dbServer.Agent.UUID;
  //   const dbServerUUID = this.dbServer.UUID;
  //
  //   this.isTableInfoLoading = true;
  //   this.statusTableError = '';
  //   this.indexTableError = '';
  //   this.createTableError = '';
  //   this.dbTblNames = `\`${dbName}\`.\`${tblName}\``;
  //
  //   this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
  //     .then(data => {
  //       const info = data[`${dbName}.${tblName}`];
  //
  //       if (info.hasOwnProperty('Errors') && info['Errors'].length > 0) {
  //         throw info['Errors'];
  //       }
  //       this.tableInfo = info;
  //       this.createTable = hljs.highlight('sql', this.tableInfo.Create).value;
  //     })
  //     .catch(errors => {
  //       for (const err of errors) {
  //         if (err.startsWith('SHOW TABLE STATUS')) {
  //           this.statusTableError = err;
  //         }
  //         if (err.startsWith('SHOW INDEX FROM')) {
  //           this.indexTableError = err;
  //         }
  //         if (err.startsWith('SHOW CREATE TABLE')) {
  //           this.createTableError = err;
  //         }
  //       }
  //
  //     })
  //     .then(() => this.isTableInfoLoading = false);
  // }
  //
  // /**
  //  * Add DB and table name for current query
  //  */
  // addDBTable() {
  //   if (this.newDBTblNames.length > 6) {
  //     const part = this.newDBTblNames.split('.');
  //     const db = part[0].replace(/`/g, '');
  //     const tbl = part[1].replace(/`/g, '');
  //
  //     if (this.queryDetails.Query.Tables === null) {
  //       this.queryDetails.Query.Tables = [];
  //     }
  //
  //     this.queryDetails.Query.Tables.push({ Db: db, Table: tbl });
  //     this.queryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
  //     this.dbTblNames = this.newDBTblNames;
  //     this.getTableInfo();
  //     this.newDBTblNames = '';
  //   }
  //   return false;
  // }
  //
  // /**
  //  * Remove DB data from current query
  //  * @param dbTableItem - DB which need to remove
  //  */
  // removeDBTable(dbTableItem) {
  //   const len = this.queryDetails.Query.Tables.length;
  //
  //   for (let i = 0; i < len; i++) {
  //     try {
  //       if (this.queryDetails.Query.Tables[i].Db === dbTableItem.Db
  //         && this.queryDetails.Query.Tables[i].Table === dbTableItem.Table) {
  //         this.queryDetails.Query.Tables.splice(i, 1);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   this.queryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
  // }
  //
  // /**
  //  * Check if current DB is select
  //  * @param item - current DB
  //  * @return Match of current DB and selected DB
  //  */
  // isSelectedDbTbl(item): boolean {
  //   return `\`${item.Db}\`.\`${item.Table}\`` === this.dbTblNames;
  // }
}
