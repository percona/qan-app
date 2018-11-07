/**
 * Base class for query-details-pages.
 */
import {CoreComponent} from './core.component';
import {QueryDetails} from './base-query-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from './instance.service';
import {BaseQueryDetailsService} from './base-query-details.service';
import * as moment from 'moment';
import * as hljs from 'highlight.js';
import * as vkbeautify from 'vkbeautify';

export abstract class BaseQueryDetailsComponent extends CoreComponent {
  public queryDetails: any | QueryDetails;
  protected dbName: string;
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

  constructor(protected route: ActivatedRoute, protected router: Router,
              public instanceService: InstanceService, public queryDetailsService: BaseQueryDetailsService) {
    super(route, router, instanceService);
  }

  onChangeParams(params) {
    if (!this.dbServer) { return }

    if (['TOTAL', undefined].indexOf(this.queryParams.queryID) !== -1) {
      this.isSummary = true;
      this.getServerSummary(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate);
    } else {
      this.isSummary = false;
      this.getQueryDetails(this.dbServer.UUID, this.queryParams.queryID, this.fromUTCDate, this.toUTCDate);
      this.accordionIds = {
        serverSummary: ['metrics-table'],
        querySection: ['query-fingerprint'],
        explainSection: ['classic-explain'],
        tableSection: ['table-create'],
      };
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

  async getQueryDetails(dbServerUUID, queryID, from, to: string) {
    this.isLoading = true;
    this.dbName = this.dbTblNames = '';
    this.queryExample = '';
    try {
      this.queryDetails = await this.queryDetailsService.getQueryDetails(dbServerUUID, queryID, from, to);
      this.firstSeen = moment(this.queryDetails.Query.FirstSeen).calendar(null, {sameElse: 'lll'});
      this.lastSeen = moment(this.queryDetails.Query.LastSeen).calendar(null, {sameElse: 'lll'});
      this.isFirstSeen = moment.utc(this.queryDetails.Query.FirstSeen).valueOf() > moment.utc(this.fromUTCDate).valueOf();

      switch (this.dbServer.Subsystem) {
        case('mysql'):
          this.fingerprint = hljs.highlight('sql', this.fixBeautifyText(this.queryDetails.Query.Fingerprint)).value;
          this.queryExample = hljs.highlight('sql', this.fixBeautifyText(this.queryDetails.Example.Query)).value;
          this.getTableInfo();
          break;
        case('mongo'):
          this.fingerprint = this.queryDetails.Query.Fingerprint;
          this.queryExample = hljs.highlight('json', vkbeautify.json(this.queryDetails.Example.Query)).value;
          break;
        default:
          throw new Error();
      }

      if (this.queryExample) {
        this.getExplain();
      }
    } catch (err) {
      console.error(err);
    }
    this.isLoading = false;
  }

  async getExplain() {
    if (!this.dbServer.Agent) { return }

    this.isExplainLoading = true;
    this.explainJson = '';
    this.explainError = '';

    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    const query = this.queryDetails.Example.Query;
    const maxExampleBytes = 10240;

    if (query.length >= maxExampleBytes) {
      this.explainError = `
        Cannot explain truncated query.
        This query was truncated to maximum size of ${maxExampleBytes} bytes.
      `;
      this.isExplainLoading = false;
      return
    }

    if (this.dbName === '') {
      this.dbName = this.getDBName();
    }

    try {
      this.explainData = await this.queryDetailsService.getExplain(agentUUID, dbServerUUID, this.dbName, query);

      if (this.explainData.hasOwnProperty('Error') && this.explainData['Error'] !== '') {
        throw new Error(this.explainData['Error']);
      }

      this.explainData = JSON.parse(atob(this.explainData.Data));
      this.explainJson = typeof this.explainData.JSON === 'string' ? JSON.parse(this.explainData.JSON) : this.explainData.JSON;
      this.explainJsonString = JSON.stringify(this.explainJson);

      if (this.dbServer.Subsystem === 'mysql') {
        this.explainClassic = this.explainData.Classic;
        this.explainVisual = this.explainData.Visual;
      }
    } catch (err) {
      switch (this.dbServer.Subsystem) {
        case('mysql'):
          this.explainError = 'This type of query is not supported for EXPLAIN';
          break;
        case('mongo'):
          this.explainError = this.explainData.Error;
          break;
        default:
          console.error(err);
      }
    }

    this.isExplainLoading = false;
  }

  getTableInfo() {
    if (!this.dbServer.Agent) { return }

    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    let dbName, tblName: string;

    this.isTableInfoLoading = true;
    this.statusTableError = '';
    this.indexTableError = '';
    this.createTableError = '';

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
        } catch (e) {
        }
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
      && this.queryDetails.Query.Tables !== null // ?????????
      && this.queryDetails.Query.Tables.length > 0) {
      return this.queryDetails.Query.Tables[0].Db;
    }
    return '';
  }

  /**
   * Fix beautify dispalying text, will be delete after approve https://github.com/vkiryukhin/vkBeautify/pull/25
   * @param {string} text
   * @returns {string}
   */
  fixBeautifyText(text: string): string {
    return vkbeautify.sql(text.toLowerCase()).replace('explain', 'EXPLAIN ').replace('  ', ' ');
  }

  showSuccessNotification(key) {
    this.isCopied[key] = true;
    setTimeout(() => {
      this.isCopied[key] = false
    }, 3000);
    window.parent.document.dispatchEvent(this.event);
  }
}
