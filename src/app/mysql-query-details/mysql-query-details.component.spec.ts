/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
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
import {Instance, InstanceService} from '../core/instance.service';
import {HttpModule} from '@angular/http';
import {MySQLQueryDetailsService} from './mysql-query-details.service';
import {NgbAccordionConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';

fdescribe('MySQLQueryDetailsComponent', () => {
  let component: MySQLQueryDetailsComponent;
  let fixture: ComponentFixture<MySQLQueryDetailsComponent>;

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
        FirstSeen: '2018-06-11T08:39:00Z',
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

  it('should create fields with information about query', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const spanAbstract = fixture.nativeElement.querySelector('.query-abstract');
    const spanId = fixture.nativeElement.querySelector('.query-id');
    expect(spanAbstract.innerHTML).toBe(component.queryDetails.Query.Abstract);
    expect(spanId.innerHTML).toBe(component.queryDetails.Query.Id);
  });

  it('should create header section title if total query is not selected', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const headerSectionTitle = fixture.nativeElement.querySelector('.header-section-title');
    expect(headerSectionTitle).toBeTruthy();
  });

  it('should not create header section title if total query is selected', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const headerSectionTitle = fixture.nativeElement.querySelector('.header-section-title');
    expect(headerSectionTitle).toBeFalsy();
  });

  it('should create empty fields if Id or Abstract is not presented', () => {
    component.isSummary = false;
    component.queryDetails.Query.Abstract = undefined;
    component.queryDetails.Query.Id = undefined;
    fixture.detectChanges();
    const spanAbstract = fixture.nativeElement.querySelector('.query-abstract');
    const spanId = fixture.nativeElement.querySelector('.query-id');
    expect(spanAbstract.innerHTML).toBe('');
    expect(spanId.innerHTML).toBe('');
  });

  it('should create server summary section if total query is selected', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const serverSummary = fixture.nativeElement.querySelector('.server-summary');
    expect(serverSummary).toBeTruthy();
  });

  it('should create server summary section if query is selected', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const serverSummary = fixture.nativeElement.querySelector('.server-summary');
    expect(serverSummary).toBeTruthy();
  });

  it('should not create server summary section if query data is undefined', () => {
    component.isSummary = false;
    component.queryDetails.Metrics2 = undefined;
    fixture.detectChanges();
    const serverSummary = fixture.nativeElement.querySelector('.server-summary');
    expect(serverSummary).toBeFalsy();
  });

  it('should not create server summary section if query data is null', () => {
    component.isSummary = false;
    component.queryDetails.Metrics2 = undefined;
    fixture.detectChanges();
    const serverSummary = fixture.nativeElement.querySelector('.server-summary');
    expect(serverSummary).toBeFalsy();
  });

  it('should create server summary title if total query is selected', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const serverSummaryTitle = fixture.nativeElement.querySelector('.server-summary-title');
    expect(serverSummaryTitle).toBeTruthy();
  });

  it('should not create server summary title if total query is not selected', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const serverSummaryTitle = fixture.nativeElement.querySelector('.server-summary-title');
    expect(serverSummaryTitle).toBeFalsy();
  });

  it('should create query information element if total query is not selected', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const queryInformation = fixture.nativeElement.querySelector('.query-information');
    expect(queryInformation).toBeTruthy();
  });

  it('should not create query information element if total query is selected', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const queryInformation = fixture.nativeElement.querySelector('.query-information');
    expect(queryInformation).toBeFalsy();
  });

  it('should create metrics table if data was loaded', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const metricsTable = fixture.nativeElement.querySelector('.metrics-table');
    expect(metricsTable).toBeTruthy();
  });

  it('should not create metrics table if data is loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const metricsTable = fixture.nativeElement.querySelector('.metrics-table');
    expect(metricsTable).toBeFalsy();
  });

  it('should display additional information about query in metrics table if not total option is checked', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const nonSummaryInfo = fixture.nativeElement.querySelector('.non-summary-info');
    [nonSummaryInfo].map(item => expect(item).toBeTruthy());
  });

  it('should not display additional information about query in metrics table if total option is not checked ', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const nonSummaryInfo = fixture.nativeElement.querySelector('.non-summary-info');
    [nonSummaryInfo].map(item => expect(item).toBeFalsy());
  });

  it('should create needed table rows if needed data is present', () => {
    component.queryDetails.Metrics2['Lock_time_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_IO_r_wait_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_queue_wait_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_IO_r_ops_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_IO_r_bytes_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_pages_distinct_sum'] = 0.323221;
    component.queryDetails.Metrics2['QC_Hit_sum'] = 0.323221;
    component.queryDetails.Metrics2['Rows_sent_sum'] = 0.323221;
    component.queryDetails.Metrics2['Bytes_sent_sum'] = 0.323221;
    component.queryDetails.Metrics2['Rows_examined_sum'] = 0.323221;
    component.queryDetails.Metrics2['Rows_affected_sum'] = 0.323221;
    component.queryDetails.Metrics2['Filesort_sum'] = 0.323221;
    component.queryDetails.Metrics2['Filesort_on_disk_sum'] = 0.323221;
    component.queryDetails.Metrics2['Merge_passes_sum'] = 0.323221;
    component.queryDetails.Metrics2['Full_join_sum'] = 0.323221;
    component.queryDetails.Metrics2['Full_scan_sum'] = 0.323221;
    component.queryDetails.Metrics2['Tmp_table_sum'] = 0.323221;
    component.queryDetails.Metrics2['Tmp_tables_sum'] = 0.323221;
    component.queryDetails.Metrics2['Tmp_table_on_disk_sum'] = 0.323221;
    component.queryDetails.Metrics2['Tmp_disk_tables_sum'] = 0.323221;
    component.queryDetails.Metrics2['Tmp_table_sizes_sum'] = 0.323221;
    fixture.detectChanges();
    const lockTime = fixture.nativeElement.querySelector('.lock-time');
    const innoDBRecLockWaitSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum');
    const innoDBIoRWaitSum = fixture.nativeElement.querySelector('.innoDB-io-r-wait-sum');
    const innoDBQueueWaitSum = fixture.nativeElement.querySelector('.innoDB-queue-wait-sum');
    const innoDBIoROpsSum = fixture.nativeElement.querySelector('.innoDB-io-r-ops-sum');
    const innoDBIoRBytesSum = fixture.nativeElement.querySelector('.innoDB-io-r-bytes-sum');
    const innoDBPagesDistinctSum = fixture.nativeElement.querySelector('.innoDB-pages-distinct-sum');
    const qcHitSum = fixture.nativeElement.querySelector('.qc-hit-sum');
    const rowsSentSum = fixture.nativeElement.querySelector('.rows-sent-sum');
    const bytesSentSum = fixture.nativeElement.querySelector('.bytes-sent-sum');
    const rowsExaminedSum = fixture.nativeElement.querySelector('.rows-examined-sum');
    const rowsAffectedSum = fixture.nativeElement.querySelector('.rows-affected-sum');
    const filesortSum = fixture.nativeElement.querySelector('.filesort-sum');
    const filesortOnDisk = fixture.nativeElement.querySelector('.filesort-on-disk-sum');
    const mergePassesSum = fixture.nativeElement.querySelector('.merge-passes-sum');
    const fullJoinSum = fixture.nativeElement.querySelector('.full-join-sum');
    const fullScanSum = fixture.nativeElement.querySelector('.full-scan-sum');
    const tmpTableSum = fixture.nativeElement.querySelector('.tmp-table-sum');
    const tmpTablesSum = fixture.nativeElement.querySelector('.tmp-tables-sum');
    const tmpTableOnDiskSum = fixture.nativeElement.querySelector('.tmp-table-on-disk-sum');
    const tmpDiskTablesSum = fixture.nativeElement.querySelector('.tmp-disk-tables-sum');
    const tmpTableSizesSum = fixture.nativeElement.querySelector('.tmp-table-sizes-sum');
    [
      lockTime,
      innoDBRecLockWaitSum,
      innoDBIoRWaitSum,
      innoDBQueueWaitSum,
      innoDBIoROpsSum,
      innoDBIoRBytesSum,
      innoDBPagesDistinctSum,
      qcHitSum,
      rowsSentSum,
      bytesSentSum,
      rowsExaminedSum,
      rowsAffectedSum,
      filesortSum,
      filesortOnDisk,
      mergePassesSum,
      fullJoinSum,
      fullScanSum,
      tmpTableSum,
      tmpTablesSum,
      tmpTableOnDiskSum,
      tmpDiskTablesSum,
      tmpTableSizesSum
    ].map(item => expect(item).toBeTruthy());
  });

  it('should not create needed table rows if needed data is undefined', () => {
    component.queryDetails.Metrics2['Lock_time_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_IO_r_wait_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_queue_wait_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_IO_r_ops_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_IO_r_bytes_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_pages_distinct_sum'] = undefined;
    component.queryDetails.Metrics2['QC_Hit_sum'] = undefined;
    component.queryDetails.Metrics2['Rows_sent_sum'] = undefined;
    component.queryDetails.Metrics2['Bytes_sent_sum'] = undefined;
    component.queryDetails.Metrics2['Rows_examined_sum'] = undefined;
    component.queryDetails.Metrics2['Rows_affected_sum'] = undefined;
    component.queryDetails.Metrics2['Filesort_sum'] = undefined;
    component.queryDetails.Metrics2['Filesort_on_disk_sum'] = undefined;
    component.queryDetails.Metrics2['Merge_passes_sum'] = undefined;
    component.queryDetails.Metrics2['Full_join_sum'] = undefined;
    component.queryDetails.Metrics2['Full_scan_sum'] = undefined;
    component.queryDetails.Metrics2['Tmp_table_sum'] = undefined;
    component.queryDetails.Metrics2['Tmp_tables_sum'] = undefined;
    component.queryDetails.Metrics2['Tmp_table_on_disk_sum'] = undefined;
    component.queryDetails.Metrics2['Tmp_disk_tables_sum'] = undefined;
    component.queryDetails.Metrics2['Tmp_table_sizes_sum'] = undefined;
    fixture.detectChanges();
    const lockTime = fixture.nativeElement.querySelector('.lock-time');
    const innoDBRecLockWaitSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum');
    const innoDBIoRWaitSum = fixture.nativeElement.querySelector('.innoDB-io-r-wait-sum');
    const innoDBQueueWaitSum = fixture.nativeElement.querySelector('.innoDB-queue-wait-sum');
    const innoDBIoROpsSum = fixture.nativeElement.querySelector('.innoDB-io-r-ops-sum');
    const innoDBIoRBytesSum = fixture.nativeElement.querySelector('.innoDB-io-r-bytes-sum');
    const innoDBPagesDistinctSum = fixture.nativeElement.querySelector('.innoDB-pages-distinct-sum');
    const qcHitSum = fixture.nativeElement.querySelector('.qc-hit-sum');
    const rowsSentSum = fixture.nativeElement.querySelector('.rows-sent-sum');
    const bytesSentSum = fixture.nativeElement.querySelector('.bytes-sent-sum');
    const rowsExaminedSum = fixture.nativeElement.querySelector('.rows-examined-sum');
    const rowsAffectedSum = fixture.nativeElement.querySelector('.rows-affected-sum');
    const filesortSum = fixture.nativeElement.querySelector('.filesort-sum');
    const filesortOnDisk = fixture.nativeElement.querySelector('.filesort-on-disk-sum');
    const mergePassesSum = fixture.nativeElement.querySelector('.merge-passes-sum');
    const fullJoinSum = fixture.nativeElement.querySelector('.full-join-sum');
    const fullScanSum = fixture.nativeElement.querySelector('.full-scan-sum');
    const tmpTableSum = fixture.nativeElement.querySelector('.tmp-table-sum');
    const tmpTablesSum = fixture.nativeElement.querySelector('.tmp-tables-sum');
    const tmpTableOnDiskSum = fixture.nativeElement.querySelector('.tmp-table-on-disk-sum');
    const tmpDiskTablesSum = fixture.nativeElement.querySelector('.tmp-disk-tables-sum');
    const tmpTableSizesSum = fixture.nativeElement.querySelector('.tmp-table-sizes-sum');
    [
      lockTime,
      innoDBRecLockWaitSum,
      innoDBIoRWaitSum,
      innoDBQueueWaitSum,
      innoDBIoROpsSum,
      innoDBIoRBytesSum,
      innoDBPagesDistinctSum,
      qcHitSum,
      rowsSentSum,
      bytesSentSum,
      rowsExaminedSum,
      rowsAffectedSum,
      filesortSum,
      filesortOnDisk,
      mergePassesSum,
      fullJoinSum,
      fullScanSum,
      tmpTableSum,
      tmpTablesSum,
      tmpTableOnDiskSum,
      tmpDiskTablesSum,
      tmpTableSizesSum
    ].map(item => expect(item).toBeFalsy());
  });

  it('should not create needed table rows if needed data is null', () => {
    component.queryDetails.Metrics2['Lock_time_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_IO_r_wait_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_queue_wait_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_IO_r_ops_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_IO_r_bytes_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_pages_distinct_sum'] = null;
    component.queryDetails.Metrics2['QC_Hit_sum'] = null;
    component.queryDetails.Metrics2['Rows_sent_sum'] = null;
    component.queryDetails.Metrics2['Bytes_sent_sum'] = null;
    component.queryDetails.Metrics2['Rows_examined_sum'] = null;
    component.queryDetails.Metrics2['Rows_affected_sum'] = null;
    component.queryDetails.Metrics2['Filesort_sum'] = null;
    component.queryDetails.Metrics2['Filesort_on_disk_sum'] = null;
    component.queryDetails.Metrics2['Merge_passes_sum'] = null;
    component.queryDetails.Metrics2['Full_join_sum'] = null;
    component.queryDetails.Metrics2['Full_scan_sum'] = null;
    component.queryDetails.Metrics2['Tmp_table_sum'] = null;
    component.queryDetails.Metrics2['Tmp_tables_sum'] = null;
    component.queryDetails.Metrics2['Tmp_table_on_disk_sum'] = null;
    component.queryDetails.Metrics2['Tmp_disk_tables_sum'] = null;
    component.queryDetails.Metrics2['Tmp_table_sizes_sum'] = null;
    fixture.detectChanges();
    const lockTime = fixture.nativeElement.querySelector('.lock-time');
    const innoDBRecLockWaitSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum');
    const innoDBIoRWaitSum = fixture.nativeElement.querySelector('.innoDB-io-r-wait-sum');
    const innoDBQueueWaitSum = fixture.nativeElement.querySelector('.innoDB-queue-wait-sum');
    const innoDBIoROpsSum = fixture.nativeElement.querySelector('.innoDB-io-r-ops-sum');
    const innoDBIoRBytesSum = fixture.nativeElement.querySelector('.innoDB-io-r-bytes-sum');
    const innoDBPagesDistinctSum = fixture.nativeElement.querySelector('.innoDB-pages-distinct-sum');
    const qcHitSum = fixture.nativeElement.querySelector('.qc-hit-sum');
    const rowsSentSum = fixture.nativeElement.querySelector('.rows-sent-sum');
    const bytesSentSum = fixture.nativeElement.querySelector('.bytes-sent-sum');
    const rowsExaminedSum = fixture.nativeElement.querySelector('.rows-examined-sum');
    const rowsAffectedSum = fixture.nativeElement.querySelector('.rows-affected-sum');
    const filesortSum = fixture.nativeElement.querySelector('.filesort-sum');
    const filesortOnDisk = fixture.nativeElement.querySelector('.filesort-on-disk-sum');
    const mergePassesSum = fixture.nativeElement.querySelector('.merge-passes-sum');
    const fullJoinSum = fixture.nativeElement.querySelector('.full-join-sum');
    const fullScanSum = fixture.nativeElement.querySelector('.full-scan-sum');
    const tmpTableSum = fixture.nativeElement.querySelector('.tmp-table-sum');
    const tmpTablesSum = fixture.nativeElement.querySelector('.tmp-tables-sum');
    const tmpTableOnDiskSum = fixture.nativeElement.querySelector('.tmp-table-on-disk-sum');
    const tmpDiskTablesSum = fixture.nativeElement.querySelector('.tmp-disk-tables-sum');
    const tmpTableSizesSum = fixture.nativeElement.querySelector('.tmp-table-sizes-sum');
    [
      lockTime,
      innoDBRecLockWaitSum,
      innoDBIoRWaitSum,
      innoDBQueueWaitSum,
      innoDBIoROpsSum,
      innoDBIoRBytesSum,
      innoDBPagesDistinctSum,
      qcHitSum,
      rowsSentSum,
      bytesSentSum,
      rowsExaminedSum,
      rowsAffectedSum,
      filesortSum,
      filesortOnDisk,
      mergePassesSum,
      fullJoinSum,
      fullScanSum,
      tmpTableSum,
      tmpTablesSum,
      tmpTableOnDiskSum,
      tmpDiskTablesSum,
      tmpTableSizesSum
    ].map(item => expect(item).toBeFalsy());
  });

  it('should create needed table row data section if InnoDB_rec_lock_wait_sum_of_total and InnoDB_rec_lock_wait_sum are presented', () => {
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum_of_total'] = 0.323221;
    fixture.detectChanges();
    const tmpTablesSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum-of-total');
    expect(tmpTablesSum).toBeTruthy();
  });

  it('should not create needed table row data section if innoDB-rec-lock-wait-sum-of-total is undefined', () => {
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum_of_total'] = undefined;
    fixture.detectChanges();
    const tmpTablesSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum-of-total');
    expect(tmpTablesSum).toBeFalsy();
  });

  it('should not create needed table row data section if innoDB-rec-lock-wait-sum-of-total is null', () => {
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = 0.323221;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum_of_total'] = null;
    fixture.detectChanges();
    const tmpTablesSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum-of-total');
    expect(tmpTablesSum).toBeFalsy();
  });

  it('should not create needed table row data section if InnoDB_rec_lock_wait_sum is undefined', () => {
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = undefined;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum_of_total'] = 0.323221;
    fixture.detectChanges();
    const tmpTablesSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum-of-total');
    expect(tmpTablesSum).toBeFalsy();
  });

  it('should not create needed table row data section if InnoDB_rec_lock_wait_sum is null', () => {
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum'] = null;
    component.queryDetails.Metrics2['InnoDB_rec_lock_wait_sum_of_total'] = 0.323221;
    fixture.detectChanges();
    const tmpTablesSum = fixture.nativeElement.querySelector('.innoDB-rec-lock-wait-sum-of-total');
    expect(tmpTablesSum).toBeFalsy();
  });

  it('should create query details section wrapper if not total query is not selected', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const sectionWrapper = fixture.nativeElement.querySelector('.sections-wrapper');
    expect(sectionWrapper).toBeTruthy();
  });

  it('should not create query details section wrapper if total query is selected', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const sectionWrapper = fixture.nativeElement.querySelector('.sections-wrapper');
    expect(sectionWrapper).toBeFalsy();
  });

  it('should create Query section if needed data is presented', () => {
    component.isSummary = false;
    component.queryExample = 'testQueryExample';
    component.fingerprint = 'fingerprint';
    fixture.detectChanges();
    const query = fixture.nativeElement.querySelector('.query');
    expect(query).toBeTruthy();
  });

  it('should create Query section if queryExample data is presented and fingerprint data is not presented', () => {
    component.isSummary = false;
    component.queryExample = 'testQueryExample';
    component.fingerprint = '';
    fixture.detectChanges();
    const query = fixture.nativeElement.querySelector('.query');
    expect(query).toBeTruthy();
  });

  it('should create Query section if fingerprint data is presented and queryExample data is not presented', () => {
    component.isSummary = false;
    component.queryExample = '';
    component.fingerprint = 'testFingerprint';
    fixture.detectChanges();
    const query = fixture.nativeElement.querySelector('.query');
    expect(query).toBeTruthy();
  });

  it('should not create Query section if needed data is not presented', () => {
    component.isSummary = false;
    component.queryExample = '';
    component.fingerprint = '';
    fixture.detectChanges();
    const query = fixture.nativeElement.querySelector('.query');
    expect(query).toBeFalsy();
  });

  it('should display fingerprint section if fingerprint is presented', () => {
    component.fingerprint = 'testFingerprint';
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-fingerprint-header');
    expect(fingerprintOutput).toBeTruthy();
  });

  it('should not display fingerprint section if fingerprint is undefined', () => {
    component.fingerprint = undefined;
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-fingerprint-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should not display fingerprint section if fingerprint is null', () => {
    component.fingerprint = null;
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-fingerprint-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should display fingerprint output if data has been loaded', () => {
    component.isLoading = false;
    component.fingerprint = 'testFingerprint';
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('.fingerprint-output');
    expect(fingerprintOutput).toBeTruthy();
  });

  it('should not display fingerprint output if data is not loaded', () => {
    component.isLoading = true;
    component.fingerprint = 'testFingerprint';
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('.fingerprint-output');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should display query example section if query example data is presented', () => {
    component.queryExample = 'testFingerprint';
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-example-header');
    expect(fingerprintOutput).toBeTruthy();
  });

  it('should not display query example section if query example data is undefined', () => {
    component.queryExample = undefined;
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-example-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should not display query example section if query example data is null', () => {
    component.queryExample = null;
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-example-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should display query example output if data has been loaded', () => {
    component.isLoading = false;
    component.queryExample = 'testFingerprint';
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('.query-example-output');
    expect(fingerprintOutput).toBeTruthy();
  });

  it('should not display query example output if data is not loaded', () => {
    component.isLoading = true;
    component.queryExample = 'testFingerprint';
    fixture.detectChanges();
    const fingerprintOutput = fixture.nativeElement.querySelector('.query-example-output');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should not display explain section if needed data is not presented', () => {
    component.queryExample = '';
    component.classicExplainError = '';
    component.jsonExplain = false;
    component.jsonExplainError = '';
    component.visualExplain = false;
    component.visualExplainError = '';
    fixture.detectChanges();
    const explain = fixture.nativeElement.querySelector('.explain');
    expect(explain).toBeFalsy();
  });

  it('should create explain section if query details is undefined', () => {
    component.queryDetails = undefined;
    fixture.detectChanges();
    const explainWrapper = fixture.nativeElement.querySelector('.explain-wrapper');
    expect(explainWrapper).toBeFalsy();
  });

  it('should create explain section if if query details is null', () => {
    component.queryDetails = null;
    fixture.detectChanges();
    const explainWrapper = fixture.nativeElement.querySelector('.explain-wrapper');
    expect(explainWrapper).toBeFalsy();
  });

  it('should create detail information about query', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('should create Classic Explain section if data is correct', () => {
    component.queryExample = 'testQueryExample';
    component.isExplainLoading = false;
    component.classicExplainError = '';
    component.classicExplain = [{
      CreateTable: null,
      Extra: null,
      Filtered: 100,
      Id: 1,
      Key: 'PRIMARY',
      KeyLen: '4',
      Partitions: null,
      PossibleKeys: 'PRIMARY',
      Ref: 'const',
      Rows: 1,
      SelectType: 'SIMPLE',
      Table: 'sbtest1',
      Type: 'const'
    }];
    fixture.detectChanges();
    const classicExplain = fixture.nativeElement.querySelector('#classic-explain-header');
    expect(classicExplain).toBeTruthy();
  });

  it('should create Visual Explain section and Json Explain section if data is correct', () => {
    component.queryExample = 'testQueryExample';
    component.isExplainLoading = false;
    component.visualExplainError = component.jsonExplainError = '';
    component.visualExplain = component.jsonExplain = 'data';
    fixture.detectChanges();
    const visualExplain = fixture.nativeElement.querySelector('#visual-explain-header');
    const jsonExplain = fixture.nativeElement.querySelector('#json-explain-header');
    [jsonExplain, visualExplain].map(item => expect(item).toBeTruthy());
  });

  it('should not create Explain section if data is undefined', () => {
    component.classicExplain = component.jsonExplain = component.visualExplain = undefined;
    fixture.detectChanges();
    const jsonExplain = fixture.nativeElement.querySelector('#json-explain-header');
    const classicExplain = fixture.nativeElement.querySelector('#classic-explain-header');
    const visualExplain = fixture.nativeElement.querySelector('#visual-explain-header');
    [classicExplain, jsonExplain, visualExplain].map(item => expect(item).toBeFalsy());
  });

  it('should create Explain section if error is presented', () => {
    component.classicExplainError = component.jsonExplainError = component.visualExplainError = 'error';
    fixture.detectChanges();
    const jsonExplain = fixture.nativeElement.querySelector('#json-explain-header');
    const classicExplain = fixture.nativeElement.querySelector('#classic-explain-header');
    const visualExplain = fixture.nativeElement.querySelector('#visual-explain-header');
    [classicExplain, jsonExplain, visualExplain].map(item => expect(item).toBeTruthy());
  });

  it('should create table section if response has tables', () => {
    component.createTable = 'data';
    component.statusTable = 'data';
    component.indexTable = 'data';
    fixture.detectChanges();
    const tableCreate = fixture.nativeElement.querySelector('#table-create-header');
    const tableStatus = fixture.nativeElement.querySelector('#table-status-header');
    const tableIndexes = fixture.nativeElement.querySelector('#table-indexes-header');
    [tableCreate, tableStatus, tableIndexes].map(item => expect(item).toBeTruthy());
  });

  it('should not create table section if response has no tables', () => {
    component.queryDetails.Query.Tables = null;
    fixture.detectChanges();
    const tableCreate = fixture.nativeElement.querySelector('#table-create-header');
    const tableStatus = fixture.nativeElement.querySelector('#table-status-header');
    const tableIndexes = fixture.nativeElement.querySelector('#table-indexes-header');
    [tableCreate, tableStatus, tableIndexes].map(item => expect(item).toBeFalsy());
  });

  it('should not create table sections if data is undefined', () => {
    component.createTable = component.statusTable = component.indexTable = undefined;
    fixture.detectChanges();
    const tableCreateHeader = fixture.nativeElement.querySelector('#table-create-header');
    const tableStatusHeader = fixture.nativeElement.querySelector('#table-status-header');
    const tableIndexHeader = fixture.nativeElement.querySelector('#table-index-header');
    [tableCreateHeader, tableStatusHeader, tableIndexHeader].map(item => expect(item).toBeFalsy());
  });

  it('should display table spinner if data is loading', () => {
    component.indexTable = 'data';
    component.isTableInfoLoading = true;
    fixture.detectChanges();
    const tableSpinner = fixture.nativeElement.querySelector('.table-spinner');
    expect(tableSpinner).toBeTruthy();
  });

  it('should not display table spinner if data is loaded', () => {
    component.isSummary = false;
    component.indexTable = 'data';
    component.isTableInfoLoading = false;
    fixture.detectChanges();
    const tableSpinner = fixture.nativeElement.querySelector('.table-spinner');
    expect(tableSpinner).toBeFalsy();
  });

  it('should display error if index table error is presented', () => {
    component.isSummary = false;
    component.indexTable = 'data';
    component.isTableInfoLoading = false;
    component.indexTableError = 'Error';
    fixture.detectChanges();
    const indexTableError = fixture.nativeElement.querySelector('.index-table-error');
    expect(indexTableError).toBeTruthy();
  });

  it('should not display error if index table error is not presented', () => {
    component.isSummary = false;
    component.indexTable = 'data';
    component.isTableInfoLoading = false;
    component.indexTableError = '';
    fixture.detectChanges();
    const indexTableError = fixture.nativeElement.querySelector('.index-table-error');
    expect(indexTableError).toBeFalsy();
  });

  it('should display no data message', () => {
    component.indexTable = 'data';
    component.isTableInfoLoading = false;
    component.indexTableError = '';
    component.tableInfo.Index.length = 0;
    fixture.detectChanges();
    const noData = fixture.nativeElement.querySelector('.no-data');
    expect(noData).toBeTruthy();
  });

  it('should not create table section if query details is undefined', () => {
    component.queryDetails = undefined;
    fixture.detectChanges();
    const tableCreate = fixture.nativeElement.querySelector('#table-create-header');
    const tableStatus = fixture.nativeElement.querySelector('#table-status-header');
    const tableIndexes = fixture.nativeElement.querySelector('#table-indexes-header');
    [tableCreate, tableStatus, tableIndexes].map(item => expect(item).toBeFalsy());
  });

  it('should not create table section if query details is null', () => {
    component.queryDetails = null;
    fixture.detectChanges();
    const tableCreate = fixture.nativeElement.querySelector('#table-create-header');
    const tableStatus = fixture.nativeElement.querySelector('#table-status-header');
    const tableIndexes = fixture.nativeElement.querySelector('#table-indexes-header');
    [tableCreate, tableStatus, tableIndexes].map(item => expect(item).toBeFalsy());
  });

  it('should not create table tools if if query details is undefined', () => {
    component.queryDetails = undefined;
    fixture.detectChanges();
    const tableTools = fixture.nativeElement.querySelector('.table-tools');
    expect(tableTools).toBeFalsy();
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

  it('getExplain() should return false if dbServer is null', () => {
    component.dbServer = null;
    fixture.detectChanges();
    component.getExplain().then((data) => {
      expect(data).toBeFalsy();
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

});
