import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Instance, InstanceService } from '../core/instance.service';
import { CoreComponent } from '../core/core.component';
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
export class MongoQueryDetailsComponent extends CoreComponent {

  protected queryID: string;
  protected queryDetails: QueryDetails;
  public fingerprint: string;
  public queryExample: string;
  protected classicExplain;
  protected jsonExplain;
  protected errExplain;
  protected dbName: string;
  public dbTblNames: string;
  isSummary: boolean;
  isLoading: boolean;
  isExplainLoading: boolean;

  constructor(protected route: ActivatedRoute, protected router: Router,
    protected instanceService: InstanceService, protected queryDetailsService: MongoQueryDetailsService) {
    super(route, router, instanceService);
  }

  onChangeParams(params) {
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
        this.fingerprint = this.queryDetails.Query.Fingerprint;
        this.queryExample = hljs.highlight('json', vkbeautify.json(this.queryDetails.Example.Query)).value;
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
    this.isExplainLoading = true;
    this.jsonExplain = '';
    this.errExplain = '';
    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;
    if (this.dbName === '') {
      this.dbName = this.getDBName();
    }

    const query = this.queryDetails.Example.Query;
    let data = await this.queryDetailsService.getExplain(agentUUID, dbServerUUID, this.dbName, query);
    try {
      if (data.Error === '') {
        this.jsonExplain = hljs.highlight('json', vkbeautify.json(JSON.parse(atob(data.Data)).JSON)).value;
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
}
