import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../core/services/instance.service';
import { QueryParams } from '../core/core.component';
import { MySQLQueryDetailsService } from './mysql-query-details.service';
import {BaseQueryDetailsService} from '../core/services/base-query-details.service';
import { QueryDetails } from '../core/services/base-query-details.service';
import * as hljs from 'highlight.js';
import {OldQueryDetailsComponent} from '../core/old-query-details.component';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './mysql-query-details.component.html',
  styleUrls: ['./mysql-query-details.component.scss']
})
export class MySQLQueryDetailsComponent extends OldQueryDetailsComponent implements OnInit {

  protected queryID: string;
  public queryDetails: QueryDetails;
  public tableInfo;
  public createTable: string;
  public statusTable;
  public indexTable;
  public dbName: string;
  public dbTblNames: string;
  protected newDBTblNames: string;
  isTableInfoLoading: boolean;

  createTableError: string;
  statusTableError: string;
  indexTableError: string;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              public instanceService: InstanceService,
              public mysqlQueryDetailsService: MySQLQueryDetailsService,
              public baseQueryDetailsService: BaseQueryDetailsService) {
    super(route, router, instanceService, baseQueryDetailsService);
  }

  /**
   * Set current query params when page is loaded
   */
  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    this.parseParams();
    this.onChangeParams(this.queryParams);
  }

  /**
   * Show table info for current table name if it in current db
   * @param dbName - name of current DB
   * @param tblName - name of current table
   */
  selectTableInfo(dbName: string, tblName: string) {
    if (!this.dbServer || !this.dbServer.Agent) { return; }
    const agentUUID = this.dbServer.Agent.UUID;
    const dbServerUUID = this.dbServer.UUID;

    this.isTableInfoLoading = true;
    this.statusTableError = '';
    this.indexTableError = '';
    this.createTableError = '';
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

  /**
   * Add DB and table name for current query
   */
  addDBTable() {
    if (this.newDBTblNames.length > 6) {
      const part = this.newDBTblNames.split('.');
      const db = part[0].replace(/`/g, '');
      const tbl = part[1].replace(/`/g, '');

      if (this.queryDetails.Query.Tables === null) {
        this.queryDetails.Query.Tables = [];
      }

      this.queryDetails.Query.Tables.push({Db: db, Table: tbl});
      this.mysqlQueryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
      this.dbTblNames = this.newDBTblNames;
      this.getTableInfo();
      this.newDBTblNames = '';
    }
    return false;
  }

  /**
   * Remove DB data from current query
   * @param dbTableItem - DB which need to remove
   */
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
    this.mysqlQueryDetailsService.updateTables(this.queryDetails.Query.Id, this.queryDetails.Query.Tables);
  }

  /**
   * Check if current DB is select
   * @param item - current DB
   * @return Match of current DB and selected DB
   */
  isSelectedDbTbl(item): boolean {
    return `\`${item.Db}\`.\`${item.Table}\`` === this.dbTblNames;
  }
}
