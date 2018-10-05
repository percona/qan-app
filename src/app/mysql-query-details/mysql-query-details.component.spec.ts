/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {MySQLQueryDetailsComponent} from './mysql-query-details.component';
import {HumanizePipe} from '../shared/humanize.pipe';
import {LoadSparklinesDirective} from '../shared/load-sparklines.directive';
import {LatencyChartDirective} from '../shared/latency-chart.directive';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {MapToIterablePipe} from '../shared/map-to-iterable.pipe';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {InstanceService} from '../core/instance.service';
import {HttpModule} from '@angular/http';
import {MySQLQueryDetailsService} from './mysql-query-details.service';
import {NgbAccordionConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('MySQLQueryDetailsComponent', () => {
  let component: MySQLQueryDetailsComponent;
  let fixture: ComponentFixture<MySQLQueryDetailsComponent>;
  const tableInfoJson = require('../mock-data/tableInfo-mock.json');
  const queryDetailsJson = require('../mock-data/query-details-mock.json');
  const explainJson = require('../mock-data/explain-mock.json');
  const tableInfoResponse = Object.assign({}, tableInfoJson);
  const queryDetailsResponse = Object.assign({}, queryDetailsJson);
  const explainResponse = Object.assign({}, explainJson);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MySQLQueryDetailsComponent,
        HumanizePipe,
        LoadSparklinesDirective,
        LatencyChartDirective,
        MapToIterablePipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ClipboardModule, RouterTestingModule, HttpModule, NgbModule],
      providers: [
        InstanceService,
        MySQLQueryDetailsService,
        NgbAccordionConfig,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                from: '1527630870872',
                queryID: 'E477191F9BF35C18',
                theme: 'dark',
                to: '1527674070873',
                type: 'mysql',
                tz: 'browser',
                'var-host': 'MySQL57',
              }
            }
          }
        },
        {
          provide: InstanceService,
          useValue: {
            dbServers: [{
              Agent: {
                Created: '2018-05-21T09:11:01Z', DSN: '', Deleted: '0001-01-01T00:00:00Z', Distro: '', Id: 0, Name: '3012cabc90ab',
                ParentUUID: 'ef6987220c804aca452d7d36f33d3872', Subsystem: 'agent', UUID: '696720d2db10400f537caeb90fa1faaf',
                Version: '1.0.5'
              },
              Created: '2018-05-24T10:17:18Z', DSN: 'root:***@tcp(localhost:3306)', Deleted: '1970-01-01T00:00:01Z',
              Distro: 'MySQL Community Server - GPL', Id: 0, Name: 'MySQL57', ParentUUID: 'ef6987220c804aca452d7d36f33d3872',
              Subsystem: 'mysql', UUID: '6623a82c865d402a5debe7c13efbda64', Version: '8.0.11'
            }]
          },
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySQLQueryDetailsComponent);
    component = fixture.componentInstance;
    component.queryDetails = {
      Begin: '2018-06-11T14:13:53Z',
      End: '2018-06-12T14:13:53Z',
      Example: {
        Db: '',
        InstanceUUID: '',
        Period: '2018-06-11T00:00:00Z',
        Query:
          'SELECT EVENT_NAME, COUNT_STAR, SUM_TIMER_WAIT↵	  FROM performance_schema.events_waits_summary_global_by_event_name',
        QueryId: '',
        QueryTime: 1528730000,
        Ts: '2018-06-11T15:28:28Z',
      },
      InstanceId: '595ad9076a1341a5609792d7253d7126',
      Metrics2: {
        Bytes_sent_avg: 0,
        Bytes_sent_max: 0,
        Bytes_sent_med: 0,
        Bytes_sent_min: 0,
        Bytes_sent_p95: 0,
        Bytes_sent_sum: 0,
        Full_scan_sum: 1754,
        Full_scan_sum_of_total: 0.019766275,
        Full_scan_sum_per_query: 1,
        Full_scan_sum_per_sec: 0.020300927,
        Lock_time_avg: 0,
        Lock_time_max: 0,
        Lock_time_med: 0,
        Lock_time_min: 0,
        Lock_time_p95: 0,
        Lock_time_sum: 0.323221,
        Lock_time_sum_of_total: 1.752181,
        Lock_time_sum_per_sec: 0.0000037409839,
        Point: 0,
        Query_count: 1754,
        Query_count_of_total: 0.010574419,
        Query_count_per_sec: 0.020300927,
        Query_time_avg: 0.010376815,
        Query_time_max: 18446744,
        Query_time_med: 0,
        Query_time_min: 0.0031904,
        Query_time_p95: 0,
        Query_time_sum: 19.563963,
        Query_time_sum_of_total: 0.03459275,
        Query_time_sum_per_sec: 0.00022643476,
        Rows_examined_avg: 0,
        Rows_examined_max: 0,
        Rows_examined_med: 0,
        Rows_examined_min: 0,
        Rows_examined_p95: 0,
        Rows_examined_sum: 620916,
        Rows_examined_sum_of_total: 0.027892668,
        Rows_examined_sum_per_rows: 1,
        Rows_examined_sum_per_sec: 7.1865277,
        Rows_sent_avg: 0,
        Rows_sent_max: 0,
        Rows_sent_med: 0,
        Rows_sent_min: 0,
        Rows_sent_p95: 0,
        Rows_sent_sum: 620916,
        Rows_sent_sum_of_total: 0.044020236,
        Rows_sent_sum_per_sec: 7.1865277,
        Ts: '0001-01-01T00:00:00Z',
      },
      Query: {
        Abstract: 'SELECT performance_schema.events_waits_summary_global_by_event_name',
        Fingerprint:
        'SELECT `EVENT_NAME` , `COUNT_STAR` , `SUM_TIMER_WAIT` FROM `performance_schema` . ' +
        '`events_waits_summary_global_by_event_name`',
        FirstSeen: '2018-09-11T08:39:00Z',
        Id: 'B32023956BDC8890',
        LastSeen: '2018-06-11T15:29:28Z',
        Status: 'new',
        Tables: [
          {
            Db: 'performance_schema',
            Table:
              'events_waits_summary_global_by_event_name'
          }
        ]
      },
      Sparks2: [{Point: 1, Ts: '2018-06-12T13:49:53Z'}, {Point: 2, Ts: '2018-06-12T13:25:53Z'}],
    };
    component.tableInfo = {
      Create: 'CREATE TABLE `events_statements_history` (↵  `THREAD_ID` bigint(20) unsigned NOT NULL,↵  ' +
      '`EVENT_ID` bigint(20) unsigned NOT NULL,↵  `END_EVENT_ID` bigint(20) unsigned DEFAULT NULL,↵  ' +
      '`EVENT_NAME` varchar(128) NOT NULL,↵  `SOURCE` varchar(64) DEFAULT NULL,↵  `TIMER_START` bigint(20) unsigned DEFAULT NULL,↵  ' +
      '`TIMER_END` bigint(20) unsigned DEFAULT NULL,↵  `TIMER_WAIT` bigint(20) unsigned DEFAULT NULL,↵  `LOCK_TIME` bigint(20) ' +
      'unsigned NOT NULL,↵  `SQL_TEXT` longtext,↵  `DIGEST` varchar(64) DEFAULT NULL,↵  `DIGEST_TEXT` longtext,↵  `CURRENT_SCHEMA` ' +
      'varchar(64) DEFAULT NULL,↵  `OBJECT_TYPE` varchar(64) DEFAULT NULL,↵  `OBJECT_SCHEMA` varchar(64) DEFAULT NULL,↵  `OBJECT_NAME` ' +
      'varchar(64) DEFAULT NULL,↵  `OBJECT_INSTANCE_BEGIN` bigint(20) unsigned DEFAULT NULL,↵  `MYSQL_ERRNO` int(11) DEFAULT NULL,↵  ' +
      '`RETURNED_SQLSTATE` varchar(5) DEFAULT NULL,↵  `MESSAGE_TEXT` varchar(128) DEFAULT NULL,↵  `ERRORS` bigint(20)' +
      ' unsigned NOT NULL,↵  `WARNINGS` bigint(20) unsigned NOT NULL,↵  `ROWS_AFFECTED` bigint(20) unsigned NOT NULL,↵  `ROWS_SENT` ' +
      'bigint(20) unsigned NOT NULL,↵  `ROWS_EXAMINED` bigint(20) unsigned NOT NULL,↵  `CREATED_TMP_DISK_TABLES` bigint(20) ' +
      'unsigned NOT NULL,↵  `CREATED_TMP_TABLES` bigint(20) unsigned NOT NULL,↵  `SELECT_FULL_JOIN` bigint(20) unsigned NOT NULL,↵ ' +
      ' `SELECT_FULL_RANGE_JOIN` bigint(20) unsigned NOT NULL,↵  `SELECT_RANGE` bigint(20) unsigned NOT NULL,↵  `SELECT_RANGE_CHECK` ' +
      'bigint(20) unsigned NOT NULL,↵  `SELECT_SCAN` bigint(20) unsigned NOT NULL,↵  `SORT_MERGE_PASSES` bigint(20) unsigned NOT NULL,↵  ' +
      '`SORT_RANGE` bigint(20) unsigned NOT NULL,↵  `SORT_ROWS` bigint(20) unsigned NOT NULL,↵  `SORT_SCAN` bigint(20) ' +
      'unsigned NOT NULL,↵  `NO_INDEX_USED` bigint(20) unsigned NOT NULL,↵  `NO_GOOD_INDEX_USED` bigint(20) unsigned NOT NULL,↵ ' +
      ' `NESTING_EVENT_ID` bigint(20) unsigned DEFAULT NULL,↵  `NESTING_EVENT_TYPE` ' +
      'enum(\'TRANSACTION\',\'STATEMENT\',\'STAGE\',\'WAIT\')' +
      ' DEFAULT NULL,↵  `NESTING_EVENT_LEVEL` int(11) DEFAULT NULL,↵  PRIMARY KEY (`THREAD_ID`,`EVENT_ID`)↵) ' +
      'ENGINE=PERFORMANCE_SCHEMA DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci',
      Index: {
        PRIMARY: [
          {
            Cardinality: null, Collation: null, ColumnName: 'THREAD_ID', Comment: '', IndexComment: '', IndexType: 'HASH',
            KeyName: 'PRIMARY', NonUnique: false, Null: '', Packed: null, SeqInIndex: 1, SubPart: null, Table: 'events_statements_history',
            Visible: 'YES'
          },
          {
            Cardinality: null, Collation: null, ColumnName: 'EVENT_ID', Comment: '', IndexComment: '', IndexType: 'HASH',
            KeyName: 'PRIMARY', NonUnique: false, Null: '', Packed: null, SeqInIndex: 2, SubPart: null, Table: 'events_statements_history',
            Visible: 'YES'
          }
        ]
      },
      Status: {
        AutoIncrement: null, AvgRowLength: 0, CheckTime: '0001-01-01T00:00:00Z', Checksum: null, Collation: 'utf8mb4_0900_ai_ci',
        Comment: '', CreateOptions: '', CreateTime: '2018-08-14T14:16:29Z', DataFree: 0, DataLength: 0, Engine: 'PERFORMANCE_SCHEMA',
        IndexLength: 0, MaxDataLength: 0, Name: 'events_statements_history', RowFormat: 'Dynamic', Rows: 2560,
        UpdateTime: '0001-01-01T00:00:00Z', Version: '10',
      }
    };
    component.accordionIds = {
      serverSummary: 'metrics-table',
      querySection: 'query-fingerprint, query-example',
      explainSection: 'classic-explain, json-explain, visual-explain',
      tableSection: 'table-create, table-status, table-indexes',
    };
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should return Db name if it presented', () => {
    component.queryDetails.Example.Db = 'performance_schema';
    const result = component.getDBName();
    fixture.detectChanges();
    expect(result).toEqual('performance_schema');
  });

  it('should return empty string if queryDetails.Query.Tables is null', () => {
    component.queryDetails.Query.Tables = null;
    const result = component.getDBName();
    fixture.detectChanges();
    expect(result).toEqual('');
  });

  it('should return performance_schema string if queryDetails.Query.Tables is presented', () => {
    component.queryDetails.Query.Tables = [
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_name'
      }
    ];
    const result = component.getDBName();
    fixture.detectChanges();
    expect(result).toEqual('performance_schema');
  });

  it('should return empty string if queryDetails.Query.Tables is empty array', () => {
    component.queryDetails.Query.Tables = [];
    const result = component.getDBName();
    fixture.detectChanges();
    expect(result).toEqual('');
  });

  it('should return Db name if it presented', () => {
    component.queryDetails.Example.Db = 'performance_schema';
    const result = component.getDBName();
    fixture.detectChanges();
    expect(result).toEqual('performance_schema');
  });

  it('should return empty string if queryDetails.Query.Tables is null', () => {
    component.queryDetails.Query.Tables = null;
    const result = component.getTableName();
    fixture.detectChanges();
    expect(result).toEqual('');
  });

  it('should return performance_schema string if queryDetails.Query.Tables is presented', () => {
    component.queryDetails.Query.Tables = [
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_name'
      }
    ];
    const result = component.getTableName();
    fixture.detectChanges();
    expect(result).toEqual('events_waits_summary_global_by_event_name');
  });

  it('should return false if newDBTblNames length is less than 6', () => {
    (component as any).newDBTblNames = '1';
    const result = component.addDBTable();
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should empty array if queryDetails.Query.Tables is null', () => {
    (component as any).newDBTblNames = '`database-name`.`table-name`';
    const result = component.addDBTable();
    fixture.detectChanges();
    expect(component.dbTblNames).toEqual('`database-name`.`table-name`');
  });

  it('should call getTableInfo if newDBTblNames length is less than 6', () => {
    (component as any).newDBTblNames = '`database-name`.`table-name`';
    const spy = spyOn(component, 'getTableInfo');
    component.addDBTable();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should create queryDetails.Query.Tables if queryDetails.Query.Tables is null', () => {
    (component as any).newDBTblNames = '`database-name`.`table-name`';
    component.queryDetails.Query.Tables = null;
    component.addDBTable();
    fixture.detectChanges();
    expect(component.queryDetails.Query.Tables).toEqual([{
      Db: 'database-name',
      Table: 'table-name'
    }]);
  });

  it('should return false when call selectTableInfo if dbServer is null', () => {
    component.dbServer = null;
    fixture.detectChanges();
    const dbName = 'dbName';
    const tblName = 'tblName';
    const result = component.selectTableInfo(dbName, tblName);
    expect(result).toBeFalsy();
  });

  it('should return false when call selectTableInfo if dbServer.Agent is null', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: null
    };
    fixture.detectChanges();
    const dbName = 'dbName';
    const tblName = 'tblName';
    const result = component.selectTableInfo(dbName, tblName);
    expect(result).toBeFalsy();
  });

  it('should return true if all data for selectTableInfo is presented', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    fixture.detectChanges();
    const dbName = 'dbName';
    const tblName = 'tblName';
    component.selectTableInfo(dbName, tblName);
    expect(component.testingVariable).toBeTruthy();
  });

  it('should return false when call getTableInfo if dbServer is null', () => {
    component.dbServer = null;
    fixture.detectChanges();
    const result = component.getTableInfo();
    expect(result).toBeFalsy();
  });

  it('should return false when call getTableInfo if dbServer.Agent is null', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: null
    };
    fixture.detectChanges();
    const result = component.getTableInfo();
    expect(result).toBeFalsy();
  });

  it('should call getDBName() and getTableName() if dbTblNames is empty string', () => {
    const getDBNameSpy = spyOn(component, 'getDBName');
    const getTableNameSpy = spyOn(component, 'getTableName');
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.queryDetails.Query.Tables = [
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_name'
      }
    ];
    component.dbTblNames = '';
    component.getTableInfo();
    fixture.detectChanges();
    [getDBNameSpy, getTableNameSpy].map(item => expect(item).toHaveBeenCalled());
  });

  it('should create dbName if dbTblNames is presented', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_waits_summary_global_by_event_name`';
    component.getTableInfo();
    fixture.detectChanges();
    expect(component.getTableInfo()).toBeFalsy();
  });

  it('should create error message if queryDetails.Example.Query.length more than maxExampleBytes', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.maxExampleBytes = 1;
    component.getExplain();
    fixture.detectChanges();
    expect(component.jsonExplainError).toBeTruthy();
  });

  it('should be truthy if total query is not selected', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.queryParams = {
      from: '1242341241',
      to: '9991283',
      'var-host': 'MySQL67',
      search: 'sda',
      queryID: 'TOTAL',
      tz: 'tz',
      theme: 'dark',
      first_seen: false,
    };
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(component.isSummary).toBeTruthy();
  });

  it('should be truthy if query is undefined', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.queryParams = {
      from: '1242341241',
      to: '9991283',
      'var-host': 'MySQL67',
      search: 'sda',
      queryID: undefined,
      tz: 'tz',
      theme: 'dark',
      first_seen: false,
    };
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(component.isSummary).toBeTruthy();
  });

  it('should be false if query is not total', () => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.queryParams = {
      from: '1242341241',
      to: '9991283',
      'var-host': 'MySQL67',
      search: 'sda',
      queryID: 'adasdfee',
      tz: 'tz',
      theme: 'dark',
      first_seen: false,
    };
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(component.isSummary).toBeFalsy();
  });

  it('should return false if dbserver is not existed', () => {
    component.dbServer = null;
    component.queryParams = {
      from: '1242341241',
      to: '9991283',
      'var-host': 'MySQL67',
      search: 'sda',
      queryID: 'adasdfee',
      tz: 'tz',
      theme: 'dark',
      first_seen: false,
    };
    const result = component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });


  it('should be false if query params is null', () => {
    component.queryParams = null;
    fixture.detectChanges();
    expect(component.isSummary).toBeFalsy();
  });

  it('should be false if queryID is null', () => {
    component.queryParams.queryID = null;
    fixture.detectChanges();
    expect(component.isSummary).toBeFalsy();
  });

  it('should be false if queryID is null', () => {
    component.queryParams.queryID = null;
    fixture.detectChanges();
    expect(component.isSummary).toBeFalsy();
  });

  it('should be false if queryID is null', () => {
    component.queryDetails = null;
    fixture.detectChanges();
    expect(component.queryExample).toBeFalsy();
  });

  it('should be false if queryID.Example is null', () => {
    component.queryDetails.Example = null;
    fixture.detectChanges();
    expect(component.queryExample).toBeFalsy();
  });

  it('should be false if queryID.Example.Query is empty string', () => {
    component.queryDetails.Example.Query = '';
    fixture.detectChanges();
    expect(component.queryExample).toBeFalsy();
  });

  it('getExplain() should return false if dbServer is null', (done) => {
    component.dbServer = null;
    fixture.detectChanges();
    component.getExplain().then((data) => {
      expect(data).toBeFalsy();
      done();
    });
  });

  it('getExplain() should return false if dbServer.Agent is null', async(() => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: null
    };
    fixture.detectChanges();
    component.getExplain().then((data) => {
      expect(data).toBeFalsy();
    });
  }));

  it('should call getDBName() if dbName is empty string', () => {
    const spy = spyOn(component, 'getDBName');
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbName = '';
    component.getExplain();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should beautify text is it has explain substring', () => {
    const result = component.fixBeautifyText('explain spme test here');
    expect(result).toBe('EXPLAIN spme test here');
  });

  it('should return true if all data presented for removeDBTable()', () => {
    component.queryDetails.Query.Tables = [
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_name'
      },
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_status'
      },
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event'
      }
    ];
    component.removeDBTable({Db: 'performance_schema', Table: 'events_waits_summary_global_by_event_status'});
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be true if dbTnlNames is coincides with item argument in isSelectedDbTbl()', () => {
    component.queryDetails.Query.Tables = [
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_name'
      },
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_status'
      },
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event'
      }
    ];
    component.dbTblNames = '`performance_schema`.`events_waits_summary_global_by_event_name`';
    const item = {
      Db: 'performance_schema',
      Table:
        'events_waits_summary_global_by_event_name'
    };
    const result = component.isSelectedDbTbl(item);
    expect(result).toBeTruthy();
  });

  it('should be false if dbTnlNames is not coincides with item argument in isSelectedDbTbl()', () => {
    component.queryDetails.Query.Tables = [
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_name'
      },
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event_status'
      },
      {
        Db: 'performance_schema',
        Table:
          'events_waits_summary_global_by_event'
      }
    ];
    component.dbTblNames = '`performance_`.`events_waits_summary_global_by_event_name`';
    const item = {
      Db: 'performance_schema',
      Table:
        'events_waits_summary_global_by_event_name'
    };
    const result = component.isSelectedDbTbl(item);
    expect(result).toBeFalsy();
  });

  it('should be true if info has needed data', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    const response = Object.assign({}, tableInfoResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    delete response['performance_schema.events_statements_history']['Errors'];
    const spy = spyOn(component.queryDetailsService, 'getTableInfo').and.returnValue(Promise.resolve(response));
    component.getTableInfo();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.tableInfo).toBeTruthy();
      done();
    });
  });

  it('should be true if tableInfoResponse has Error property', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    const response = Object.assign({}, tableInfoResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    response['performance_schema.events_statements_history']['Errors'] = ['err1', 'err2'];
    const spy = spyOn(component.queryDetailsService, 'getTableInfo').and.returnValue(Promise.resolve(response));
    component.getTableInfo();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.testingVariable).toBeTruthy();
      done();
    });
  });

  it('should be true if data has been loaded', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    const response = Object.assign({}, tableInfoResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    delete response['Create'];
    response['performance_schema.events_statements_history']['Errors'] = [
      'SHOW CREATE TABLE sbtest1: Error 1046: No database selected',
      'SHOW INDEX FROM .sbtest1: Error 1046: No database selected',
      'SHOW TABLE STATUS FROM  WHERE Name=\'sbtest1\': Error 1064: You have an error in your SQL syntax; check the manual that' +
      ' corresponds to your MySQL server version for the right syntax to use near \'WHERE Name=\'sbtest1\'\' at line 1'
    ];
    console.log('response - ', response);
    const spy = spyOn(component.queryDetailsService, 'getTableInfo').and.returnValue(Promise.resolve(response));
    component.getTableInfo();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.isTableInfoLoading).toBeTruthy();
      done();
    });
  });

  it('should be true if info has needed data', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    const response = Object.assign({}, tableInfoResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    response['performance_schema.events_statements_history']['Errors'] = null;
    const spy = spyOn(component.queryDetailsService, 'getTableInfo').and.returnValue(Promise.resolve(response));
    component.selectTableInfo('performance_schema', 'events_statements_history');
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.tableInfo).toBeTruthy();
      done();
    });
  });

  it('should be true if object has Error property', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    const response = Object.assign({}, tableInfoResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    const spy = spyOn(component.queryDetailsService, 'getTableInfo').and.returnValue(Promise.resolve(response));
    component.selectTableInfo('performance_schema', 'events_statements_history');
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.testingVariable).toBeTruthy();
      done();
    });
  });

  it('should be true if data has been loaded', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.dbTblNames = '`performance_schema`.`events_statements_history`';
    const response = Object.assign({}, tableInfoResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    const spy = spyOn(component.queryDetailsService, 'getTableInfo').and.returnValue(Promise.resolve(response));
    component.selectTableInfo('performance_schema', 'events_statements_history');
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.isTableInfoLoading).toBeTruthy();
      done();
    });
  });

  it('should create visual explain if neede data is presented', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    const response = Object.assign({}, explainResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    const spy = spyOn(component.queryDetailsService, 'getExplain').and.returnValue(Promise.resolve(response));
    component.getExplain();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.visualExplain).toBeTruthy();
      done();
    });
  });

  it('should not call getExplain if needed data is not presented', () => {
    const spy = spyOn(component, 'getExplain');
    const response = Object.assign({}, queryDetailsResponse);
    response.Example = Object.assign({}, response.Example);
    response.Example.Query = Object.assign({}, response.Example.Query);
    response['Example']['Query'] = '';
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.fromUTCDate = '2017-08-23T08:45:59Z';
    component.toUTCDate = '92345678';
    component.getQueryDetails(component.dbServer.UUID, component.queryParams.queryID, component.fromUTCDate, component.toUTCDate);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should create error if error method is presented in response', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    const response = Object.assign({}, explainResponse);
    response['Error'] = 'error';
    const spy = spyOn(component.queryDetailsService, 'getExplain').and.returnValue(Promise.resolve(response));
    component.getExplain();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.testingVariable).toBeTruthy();
      done();
    });
  });

  it('should create fingerprint if needed data is presented', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.fromUTCDate = '12345678';
    component.toUTCDate = '92345678';
    const response = Object.assign({}, queryDetailsResponse);
    const spy = spyOn(component.queryDetailsService, 'getQueryDetails').and.returnValue(Promise.resolve(response));
    component.getQueryDetails(component.dbServer.UUID, component.queryParams.queryID, component.fromUTCDate, component.toUTCDate);
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.fingerprint).toBeTruthy();
      done();
    });
  });

  it('should create queryExample if needed data presented in response', (done) => {
    component.dbServer = {
      Created: 'string',
      DSN: 'string',
      Deleted: 'string',
      Distro: 'string',
      Id: 12,
      Name: 'string',
      ParentUUID: 'string',
      Subsystem: 'string',
      UUID: 'string',
      Version: 'string',
      Agent: {
        Created: 'string',
        DSN: 'string',
        Deleted: 'string',
        Distro: 'string',
        Id: 12,
        Name: 'string',
        ParentUUID: 'string',
        Subsystem: 'string',
        UUID: 'string',
        Version: 'string',
      }
    };
    component.fromUTCDate = '2017-08-23T08:45:59Z';
    component.toUTCDate = '92345678';
    const response = Object.assign({}, queryDetailsResponse);
    response.Example = Object.assign({}, response.Example);
    response.Example.Query = Object.assign({}, response.Example.Query);
    response.Example['Query'] = 'Query';
    const spy = spyOn(component.queryDetailsService, 'getQueryDetails').and.returnValue(Promise.resolve(response));
    component.getQueryDetails(component.dbServer.UUID, component.queryParams.queryID, component.fromUTCDate, component.toUTCDate);
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.queryExample).toBeTruthy();
      done();
    });
  });

  it('should be true for key and after 3,5 sec should be false', (done) => {
    const key = 'jsonExplain';
    component.showSuccessNotification(key);
    expect(component.isCopied[key]).toBeTruthy();
    setTimeout(() => {
      expect(component.isCopied[key]).toBeFalsy();
      done();
    }, 3500);
  });

});
