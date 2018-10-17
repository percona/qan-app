import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Instance, InstanceService } from '../core/instance.service';
import { CoreComponent, QueryParams } from '../core/core.component';
import { MongoQueryDetailsService, QueryDetails } from './mongo-query-details.service';
import * as hljs from 'highlight.js';
import * as vkbeautify from 'vkbeautify';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './mongo-query-details.component.html',
  styleUrls: ['./mongo-query-details.component.scss']
})
export class MongoQueryDetailsComponent extends CoreComponent implements OnInit {

  protected queryID: string;
  public queryDetails: any | QueryDetails;
  public fingerprint: string;
  public queryExample: string;
  public classicExplain;
  public jsonExplainString;
  public jsonExplain;
  public errExplain;
  public dbName: string;
  public dbTblNames: string;
  isCopied = {
    queryExample: false,
    fingerprint: false,
    jsonExplain: false
  };
  isSummary: boolean;
  isLoading: boolean;
  isExplainLoading: boolean;
  isFirstSeen: boolean;
  firstSeen: string;
  lastSeen: string;
  event = new Event('showSuccessNotification');

  constructor(protected route: ActivatedRoute, protected router: Router,
              protected instanceService: InstanceService, public queryDetailsService: MongoQueryDetailsService) {
    super(route, router, instanceService);
  }

  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    this.parseParams();
    this.onChangeParams(this.queryParams);
  }

  showSuccessNotification(key) {
    this.isCopied[key] = true;
    setTimeout( () => { this.isCopied[key] = false }, 3000);
    window.parent.document.dispatchEvent(this.event);
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

  getQueryDetails(dbServerUUID, queryID, from, to: string) {
    this.isLoading = true;
    this.dbName = this.dbTblNames = '';
    this.queryExample = '';
    this.queryDetailsService.getQueryDetails(dbServerUUID, queryID, from, to)
      .then(data => {
        this.queryDetails = data;
        this.firstSeen = moment(this.queryDetails.Query.FirstSeen).calendar(null, {sameElse: 'lll'});
        this.lastSeen = moment(this.queryDetails.Query.LastSeen).calendar(null, {sameElse: 'lll'});
        this.fingerprint = this.queryDetails.Query.Fingerprint;
        this.queryExample = hljs.highlight('json', vkbeautify.json(this.queryDetails.Example.Query)).value;
        this.isFirstSeen = moment.utc(this.queryDetails.Query.FirstSeen).valueOf() > moment.utc(this.fromUTCDate).valueOf();
        this.isLoading = false;
      })
      .then(() => this.getExplain())
      .catch(err => console.log(err));
  }

  getServerSummary(dbServerUUID: string, from: string, to: string) {
    this.dbName = this.dbTblNames = '';
    this.queryDetailsService.getSummary(dbServerUUID, from, to)
      .then(data => {
        this.queryDetails = data;
      })
      .catch(err => console.log(err));
  }

  async getExplain() {
    if (!this.dbServer || !this.dbServer.Agent) { return; }
    this.isExplainLoading = true;
    this.jsonExplain = '';
    this.errExplain = '';
    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    if (this.dbName === '') {
      this.dbName = this.getDBName();
    }

    const query = this.queryDetails.Example.Query;
    const data = await this.queryDetailsService.getExplain(agentUUID, dbServerUUID, this.dbName, query);
    try {
      if (data.Error === '') {
        const jsonSection = JSON.parse(atob(data.Data)).JSON;
        this.jsonExplain = typeof jsonSection === 'string' ? JSON.parse(jsonSection) : jsonSection;
        this.jsonExplainString = JSON.stringify(this.jsonExplain);
      } else {
        this.errExplain = data.Error
      }
      this.isExplainLoading = false;
    } catch (err) {
      console.log(err);
      this.isExplainLoading = false;
    }
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
