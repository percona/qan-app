import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Instance, InstanceService } from '../core/instance.service';
import { CoreComponent, QueryParams } from '../core/core.component';
import { MySQLQueryDetailsService, QueryDetails, ServerSummary } from './mysql-query-details.service';
import * as hljs from 'highlight.js';
import * as vkbeautify from 'vkbeautify';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './mysql-query-details.component.html',
  styleUrls: ['./mysql-query-details.component.scss']
})
export class MySQLQueryDetailsComponent extends CoreComponent implements OnInit {

  protected queryID: string;
  public queryDetails: QueryDetails;
  public tableInfo;
  public createTable: string;
  public statusTable;
  public indexTable;
  public fingerprint: string;
  public queryExample: string;
  public classicExplain;
  public jsonExplain;
  public visualExplain;
  public dataExplain;
  public dbName: string;
  public dbTblNames: string;
  protected newDBTblNames: string;
  isSummary: boolean;
  isLoading: boolean;
  isExplainLoading: boolean;
  isCopied: boolean;
  isTableInfoLoading: boolean;
  isFirstSeen: boolean;
  firstSeen: string;
  lastSeen: string;
  accordionIds = {
    serverSummary: 'metrics-table',
    querySection: 'query-fingerprint',
    explainSection: 'classic-explain',
    tableSection: 'table-create',
  };

  createTableError: string;
  statusTableError: string;
  indexTableError: string;
  jsonExplainError: string;
  classicExplainError: string;
  visualExplainError: string;

  constructor(protected route: ActivatedRoute, protected router: Router,
              protected instanceService: InstanceService, protected queryDetailsService: MySQLQueryDetailsService) {
    super(route, router, instanceService);
  }

  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    this.parseParams();
    this.onChangeParams(this.queryParams);
  }

  onChangeParams(params) {
    if (!this.dbServer) { return; }
    if (['TOTAL', undefined].indexOf(this.queryParams.queryID) !== -1) {
      this.isSummary = true;
      this.getServerSummary(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate);
    } else {
      this.isSummary = false;
      this.getQueryDetails(this.dbServer.UUID, this.queryParams.queryID, this.fromUTCDate, this.toUTCDate);
    }
  }

  /**
   * Fix beautify dispalying text, will be delete after approve https://github.com/vkiryukhin/vkBeautify/pull/25
   * @param {string} text
   * @returns {string}
   */
  fixBeautifyText(text: string): string {
      return vkbeautify.sql(text.toLowerCase()).replace('explain', 'EXPLAIN ').replace('  ', ' ');
  }

  async getQueryDetails(dbServerUUID, queryID, from, to: string) {
    this.isLoading = true;
    this.dbName = this.dbTblNames = '';
    this.queryExample = '';
    try {
      this.queryDetails = await this.queryDetailsService.getQueryDetails(dbServerUUID, queryID, from, to);
      this.firstSeen = moment(this.queryDetails.Query.FirstSeen).calendar(null, {sameElse: 'lll'});
      this.lastSeen = moment(this.queryDetails.Query.LastSeen).calendar(null, {sameElse: 'lll'});
      this.fingerprint = hljs.highlight('sql', this.fixBeautifyText(this.queryDetails.Query.Fingerprint)).value;
      if (this.queryDetails !== null && this.queryDetails.Example !== null && this.queryDetails.Example.Query !== '') {
        this.queryExample = hljs.highlight('sql', this.fixBeautifyText(this.queryDetails.Example.Query)).value;
      }
      this.isFirstSeen = moment.utc(this.queryDetails.Query.FirstSeen).valueOf() > moment.utc(this.fromUTCDate).valueOf();
      this.isLoading = false;

      if (this.queryExample) {
        this.getExplain();
      }
      this.getTableInfo()
    } catch (err) {
      console.error(err);
    }
  }

  async getServerSummary(dbServerUUID: string, from: string, to: string) {
    this.dbName = this.dbTblNames = '';
    try {
      this.queryDetails = await this.queryDetailsService.getSummary(dbServerUUID, from, to) as QueryDetails;
    } catch (err) {
      console.error(err);
    }
  }

  async getExplain() {
    if (!this.dbServer || !this.dbServer.Agent) { return; }
    this.isExplainLoading = true;
    this.isCopied = false;
    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    this.classicExplainError = '';
    this.jsonExplainError = '';
    this.visualExplainError = '';
    if (this.dbName === '') {
      this.dbName = this.getDBName();
    }
    const query = this.queryDetails.Example.Query;
    // https://github.com/percona/go-mysql/blob/master/event/class.go#L25
    const maxExampleBytes = 10240;
    if (query.length >= maxExampleBytes) {
      this.jsonExplainError = `
        Cannot explain truncated query.
        This query was truncated to maximum size of ${maxExampleBytes} bytes.
      `;
      this.classicExplainError = this.jsonExplainError;
      this.visualExplainError = this.jsonExplainError;
      this.isExplainLoading = false;
      return
    }

    try {
      this.dataExplain = await this.queryDetailsService.getExplain(agentUUID, dbServerUUID, this.dbName, query);
      if (this.dataExplain.hasOwnProperty('Error') && this.dataExplain['Error'] !== '') {
        throw new Error(this.dataExplain['Error']);
      }
      this.dataExplain = JSON.parse(atob(this.dataExplain.Data));
      this.classicExplain = this.dataExplain.Classic;
      this.visualExplain = this.dataExplain.Visual;
      try {
        this.jsonExplain = JSON.parse(this.dataExplain.JSON);
      } catch (err) {
        this.jsonExplainError = err.message;
      }
    } catch (err) {
      this.classicExplainError = this.jsonExplainError = this.visualExplainError = 'This type of query is not supported for EXPLAIN';
    }

    this.isExplainLoading = false;
  }

  getTableInfo() {
    if (!this.dbServer || !this.dbServer.Agent) { return; }
    this.isTableInfoLoading = true;
    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    this.statusTableError = '';
    this.indexTableError = '';
    this.createTableError = '';
    let dbName, tblName: string;
    if (this.dbTblNames === '') {
      dbName = this.getDBName();
      tblName = this.getTableName();
      this.dbTblNames = `\`${dbName}\`.\`${tblName}\``;
    } else {
      const parts = this.dbTblNames.split('.');
      dbName = parts[0].replace(/`/g, '');
      tblName = parts[1].replace(/`/g, '');
    }

    this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
      .then(data => {
        const info = data[`${dbName}.${tblName}`];
        this.tableInfo = info;
        this.statusTable = info.Status;
        this.indexTable = info.Index;
        try {
          this.createTable = hljs.highlight('sql', this.tableInfo.Create).value;
        } catch (e) { }
        if (info.hasOwnProperty('Errors') && info['Errors'].length > 0) {
          throw info['Errors'];
        }
      })
      .catch(errors => {
        for (const err of errors) {
          if (err.startsWith('SHOW TABLE STATUS')) {
            this.statusTableError = err;
          }
          if (err.startsWith('SHOW INDEX FROM')) {
            this.indexTableError = err;
          }
          if (err.startsWith('SHOW CREATE TABLE')) {
            this.createTableError = err;
          }
        }

      })
      .then(() => this.isTableInfoLoading = false);
  }

  selectTableInfo(dbName: string, tblName: string) {
    if (!this.dbServer || !this.dbServer.Agent) { return; }
    this.isTableInfoLoading = true;
    this.statusTableError = '';
    this.indexTableError = '';
    this.createTableError = '';
    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    this.dbTblNames = `\`${dbName}\`.\`${tblName}\``;


    this.queryDetailsService.getTableInfo(agentUUID, dbServerUUID, dbName, tblName)
      .then(data => {
        const info = data[`${dbName}.${tblName}`];
        if (info.hasOwnProperty('Errors') && info['Errors'].length > 0) {
          throw info['Errors'];
        }
        this.tableInfo = info;
        this.createTable = hljs.highlight('sql', this.tableInfo.Create).value;
      })
      .catch(errors => {
        for (const err of errors) {
          if (err.startsWith('SHOW TABLE STATUS')) {
            this.statusTableError = err;
          }
          if (err.startsWith('SHOW INDEX FROM')) {
            this.indexTableError = err;
          }
          if (err.startsWith('SHOW CREATE TABLE')) {
            this.createTableError = err;
          }
        }

      })
      .then(() => this.isTableInfoLoading = false);
  }

  addDBTable() {
    if (this.newDBTblNames.length > 6) {
      const part = this.newDBTblNames.split('.');
      const db = part[0].replace(/`/g, '');
      const tbl = part[1].replace(/`/g, '');
      if (this.queryDetails.Query.Tables === null) {
        this.queryDetails.Query.Tables = [];
      }
      this.queryDetails.Query.Tables.push({Db: db, Table: tbl});
      this.queryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
      this.dbTblNames = this.newDBTblNames;
      this.getTableInfo();
      this.newDBTblNames = '';
    }
    return false;
  }

  removeDBTable(dbTableItem) {
    const len = this.queryDetails.Query.Tables.length;
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

  getTableName(): string {
    if (this.queryDetails.hasOwnProperty('Query')
      && this.queryDetails.Query.hasOwnProperty('Tables')
      && this.queryDetails.Query.Tables !== null
      && this.queryDetails.Query.Tables.length > 0) {
      return this.queryDetails.Query.Tables[0].Table;
    }
    return '';
  }

  getDBName(): string {
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
}
