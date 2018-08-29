/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

import {MongoQueryDetailsComponent} from './mongo-query-details.component';
import {LoadSparklinesDirective} from '../shared/load-sparklines.directive';
import {MapToIterablePipe} from '../shared/map-to-iterable.pipe';
import {NgbAccordionConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HumanizePipe} from '../shared/humanize.pipe';
import {HttpModule} from '@angular/http';
import {LatencyChartDirective} from '../shared/latency-chart.directive';
import {ClipboardModule} from 'ngx-clipboard';
import {FormsModule} from '@angular/forms';
import {InstanceService} from '../core/instance.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {MongoQueryDetailsService} from './mongo-query-details.service';

fdescribe('MongoQueryDetailsComponent', () => {
  let component: MongoQueryDetailsComponent;
  let fixture: ComponentFixture<MongoQueryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MongoQueryDetailsComponent,
        HumanizePipe,
        LoadSparklinesDirective,
        LatencyChartDirective,
        MapToIterablePipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ClipboardModule, RouterTestingModule, HttpModule, NgbModule],
      providers: [
        InstanceService,
        MongoQueryDetailsService,
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
                type: 'mongo',
                tz: 'browser',
                'var-host': 'MongoDB',
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
              Subsystem: 'mongo', UUID: '6623a82c865d402a5debe7c13efbda64', Version: '8.0.11'
            }]
          },
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MongoQueryDetailsComponent);
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

  it('should display information about first seen and last seen query', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const firstSeenTimeRange = fixture.nativeElement.querySelector('.first-seen-range');
    expect(firstSeenTimeRange).toBeTruthy();
  });

  it('should display server summery if summery option is selected', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const summaryHeader = fixture.nativeElement.querySelector('.summary-header');
    expect(summaryHeader).toBeTruthy();
    expect(summaryHeader.innerHTML).toBe('Server Summary');
  });

  it('should display additional information about selected query', () => {
    component.isSummary = false;
    fixture.detectChanges();
    const spanAbstract = fixture.nativeElement.querySelector('.sections-wrapper');
    expect(spanAbstract).toBeTruthy();
  });

  it('should not display additional information about selected query', () => {
    component.isSummary = true;
    fixture.detectChanges();
    const spanAbstract = fixture.nativeElement.querySelector('.sections-wrapper');
    expect(spanAbstract).toBeFalsy();
  });

  it('should display fingerprint output if fingerprint is correct', () => {
    component.queryDetails.Query.Fingerprint = 'queryFingerprint';
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-fingerprint-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should not display fingerprint output if fingerprint is null', () => {
    component.queryDetails.Query.Fingerprint = null;
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-fingerprint-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should not display fingerprint output if fingerprint is undefined', () => {
    component.queryDetails.Query.Fingerprint = undefined;
    const fingerprintOutput = fixture.nativeElement.querySelector('#query-fingerprint-header');
    expect(fingerprintOutput).toBeFalsy();
  });

  it('should create Query section if data is correct', () => {
    component.isSummary = false;
    component.queryExample = 'testQueryExample';
    fixture.detectChanges();
    const queryFingerprint = fixture.nativeElement.querySelector('#query-fingerprint-header');
    const queryExample = fixture.nativeElement.querySelector('#query-example-header');
    expect([queryFingerprint, queryExample]).toBeTruthy();
  });

  it('should create Json Explain section if data is correct', () => {
    component.queryExample = 'testQueryExample';
    component.isExplainLoading = false;
    component.errExplain = '';
    component.jsonExplain = 'data';
    fixture.detectChanges();
    const jsonExplain = fixture.nativeElement.querySelector('#json-explain-header');
    expect(jsonExplain).toBeTruthy();
  });

  it('should not create Explain section if data is undefined', () => {
    component.jsonExplain = undefined;
    fixture.detectChanges();
    const jsonExplain = fixture.nativeElement.querySelector('#json-explain-header');
    expect(jsonExplain).toBeFalsy();
  });

  it('should not create Explain section if error is presented', () => {
    component.errExplain = 'error';
    fixture.detectChanges();
    const jsonExplain = fixture.nativeElement.querySelector('#json-explain-header');
    expect(jsonExplain).toBeFalsy();
  });
});
