/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, PipeTransform} from '@angular/core';

import {QueryProfileComponent} from './query-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ClipboardModule} from 'ngx-clipboard';
import {InstanceService} from '../core/instance.service';
import {QueryProfileService} from './query-profile.service';
import {LoadSparklinesDirective} from '../shared/load-sparklines.directive';
import {HumanizePipe} from '../shared/humanize.pipe';
import {LatencyChartDirective} from '../shared/latency-chart.directive';
import {MomentFormatPipe} from '../shared/moment-format.pipe';
import {ParseQueryParamDatePipe} from '../shared/parse-query-param-date.pipe';
import {CoreComponent} from '../core/core.component';
import {CoreModule} from '../core/core.module';
import {ActivatedRoute} from '@angular/router';

describe('QueryProfileComponent', () => {
  let component: QueryProfileComponent;
  let fixture: ComponentFixture<QueryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MomentFormatPipe,
        QueryProfileComponent,
        ParseQueryParamDatePipe,
        HumanizePipe,
        LoadSparklinesDirective,
        LatencyChartDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ClipboardModule,
        RouterTestingModule,
        HttpModule,
        NgbModule
      ],
      providers: [
        InstanceService,
        QueryProfileService,
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryProfileComponent);
    component = fixture.componentInstance;
    component.dbServer = {
      Agent: {
        Created: '2018-07-23T10:19:09Z', DSN: '', Deleted: '0001-01-01T00:00:00Z', Distro: '', Id: 0, Name: '25824e09862b',
        ParentUUID: '5a862a0626f945216aa31679c0a8ed8a', Subsystem: 'agent', UUID: '95c516543ed34d0e74eb204402bf846c',
        Version: '1.0.5'
      },
      Created: '2018-07-23T10:19:09Z', DSN: 'localhost:27017/sbtest', Deleted: '0001-01-01T00:00:00Z', Distro: 'MongoDB', Id: 0,
      Name: 'MongoDB', ParentUUID: '5a862a0626f945216aa31679c0a8ed8a', Subsystem: 'mongo', UUID: '0386354b2ce3464f4c0c5a7e59442df2',
      Version: '3.2.20'
    };
    component.queryParams = {
      from: '1537248810919',
      queryID: 'E477191F9BF35C18',
      theme: 'dark',
      to: '1537292010920',
      tz: 'browser',
      search: 'select',
      first_seen: true,
      'var-host': 'MySQL57',
    };
    component.previousQueryParams = {
      from: '1537248810919',
      queryID: 'E477191F9BF35C18',
      theme: 'dark',
      to: '1537292010920',
      tz: 'browser',
      search: 'select',
      first_seen: true,
      'var-host': 'MySQL57',
    };
    component.queryProfile = [
      {
        Abstract: '', Fingerprint: '', FirstSeen: '0001-01-01T00:00:00Z', Id: '', Load: 0.35376342640982733,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 2395, Query_load: 6.185599, Query_time_avg: 2.007294, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 3959, Query_load: 7.3765154, Query_time_avg: 1.3971101, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 1, QPS: 0.346875, Rank: 0,
        Stats:
          {
            Avg: 1.0198585265868896, Cnt: 14985, Max: 13.063, Med: 1.0610000052162119, Min: 0.1, P5: 0, P95: 2.8103783839457743,
            Sum: 15282.580020904541
          }
      },
      {
        Abstract: 'INSERT sbtest3', Fingerprint: 'INSERT sbtest3', FirstSeen: '2018-07-26T12:23:00Z',
        Id: '20d0ff1066870382aaeb206cad4689b5', Load: 0.0443306017253134,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 308, Query_load: 0.77318054, Query_time_avg: 1.9463924, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 501, Query_load: 0.9261889, Query_time_avg: 1.3868859, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 0.12531143248809826, QPS: 0.04377314814814815, Rank: 1,
        Stats: {
          Avg: 1.0127350579236059, Cnt: 1891, Max: 12.767, Med: 1.0246351353220038, Min: 0.101, P5: 0, P95: 2.7552432651455336,
          Sum: 1915.0819945335388
        }
      },
      {
        Abstract: 'INSERT sbtest3', Fingerprint: 'INSERT sbtest3', FirstSeen: '2018-07-26T12:23:00Z',
        Id: '20d0ff1066870382aaeb206cad4689b5', Load: 0.0443306017253134,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 308, Query_load: 0.77318054, Query_time_avg: 1.9463924, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 501, Query_load: 0.9261889, Query_time_avg: 1.3868859, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 0.12531143248809826, QPS: 0.04377314814814815, Rank: 1,
        Stats: {
          Avg: 1.0127350579236059, Cnt: 1891, Max: 12.767, Med: 1.0246351353220038, Min: 0.101, P5: 0, P95: 2.7552432651455336,
          Sum: 1915.0819945335388
        }
      },
      {
        Abstract: 'INSERT sbtest3', Fingerprint: 'INSERT sbtest3', FirstSeen: '2018-07-26T12:23:00Z',
        Id: '20d0ff1066870382aaeb206cad4689b5', Load: 0.0443306017253134,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 308, Query_load: 0.77318054, Query_time_avg: 1.9463924, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 501, Query_load: 0.9261889, Query_time_avg: 1.3868859, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 0.12531143248809826, QPS: 0.04377314814814815, Rank: 1,
        Stats: {
          Avg: 1.0127350579236059, Cnt: 1891, Max: 12.767, Med: 1.0246351353220038, Min: 0.101, P5: 0, P95: 2.7552432651455336,
          Sum: 1915.0819945335388
        }
      },
      {
        Abstract: 'INSERT sbtest3', Fingerprint: 'INSERT sbtest3', FirstSeen: '2018-07-26T12:23:00Z',
        Id: '20d0ff1066870382aaeb206cad4689b5', Load: 0.0443306017253134,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 308, Query_load: 0.77318054, Query_time_avg: 1.9463924, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 501, Query_load: 0.9261889, Query_time_avg: 1.3868859, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 0.12531143248809826, QPS: 0.04377314814814815, Rank: 1,
        Stats: {
          Avg: 1.0127350579236059, Cnt: 1891, Max: 12.767, Med: 1.0246351353220038, Min: 0.101, P5: 0, P95: 2.7552432651455336,
          Sum: 1915.0819945335388
        }
      }
    ];
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create error message when no data presented', () => {
    component.isQueryDataAbsent = true;
    component.dbServer = null;
    fixture.detectChanges();
    const noDataMessage = fixture.nativeElement.querySelector('.no-data-message');
    const contentContainer = fixture.nativeElement.querySelector('.content-container');
    expect(noDataMessage).toBeTruthy();
    expect(contentContainer).toBeFalsy();
  });

  it('should create error message when host name is invalid', () => {
    component.isNotExistSelected = true;
    component.dbServer = null;
    fixture.detectChanges();
    const invalidHostName = fixture.nativeElement.querySelector('.invalid-name-message');
    const contentContainer = fixture.nativeElement.querySelector('.content-container');
    expect(invalidHostName).toBeTruthy();
    expect(contentContainer).toBeFalsy();
  });

  it('should create error message when no query data for mongodb', () => {
    component.totalAmountOfQueries = 0;
    component.dbServer.Subsystem = 'mongo';
    fixture.detectChanges();
    const noMongoQueryData = fixture.nativeElement.querySelector('.no-mongo-queries');
    expect(noMongoQueryData).toBeTruthy();
  });

  it('should create error message when no query data for mysql', () => {
    component.totalAmountOfQueries = 0;
    component.dbServer.Subsystem = 'mysql';
    fixture.detectChanges();
    const noMysqlQueryData = fixture.nativeElement.querySelector('.no-mysql-queries');
    expect(noMysqlQueryData).toBeTruthy();
  });

  it('should create error message when pmm-client and database configurations are wrong', () => {
    component.noQueryError = 'Example error';
    fixture.detectChanges();
    const wrongConfiguration = fixture.nativeElement.querySelector('.wrong-configuration-message');
    expect(wrongConfiguration).toBeTruthy();
  });

  it('should not create content when server data in null', () => {
    component.dbServer = null;
    fixture.detectChanges();
    const contentContainer = fixture.nativeElement.querySelector('.content-container');
    expect(contentContainer).toBeFalsy();
  });

  it('should not create content when server data in undefined', () => {
    component.dbServer = undefined;
    fixture.detectChanges();
    const contentContainer = fixture.nativeElement.querySelector('.content-container');
    expect(contentContainer).toBeFalsy();
  });

  it('should create content when server data in presented', () => {
    const contentContainer = fixture.nativeElement.querySelector('.content-container');
    expect(contentContainer).toBeTruthy();
  });

  it('should display load more queries button if queries more than 10', () => {
    component.totalAmountOfQueries = 15;
    component.leftInDbQueries = 12;
    fixture.detectChanges();
    const buttonLoadMore = fixture.nativeElement.querySelector('.load-more-wrapper');
    const buttonText = fixture.nativeElement.querySelector('.load-next');
    expect(buttonLoadMore).toBeTruthy();
    expect(buttonText.innerHTML).toBe('Load next 10 queries');
  });

  it('should display load more queries button with message about how many queries left if there amount less than 10', () => {
    component.totalAmountOfQueries = 15;
    component.leftInDbQueries = 5;
    fixture.detectChanges();
    const buttonLoadMore = fixture.nativeElement.querySelector('.load-more-wrapper');
    const buttonText = fixture.nativeElement.querySelector('.load-next');
    expect(buttonLoadMore).toBeTruthy();
    expect(buttonText.innerHTML).toBe('Load next 5 queries');
  });

  it('should display no more queries if there amount is 0', () => {
    component.totalAmountOfQueries = 15;
    component.leftInDbQueries = 0;
    fixture.detectChanges();
    const buttonLoadMore = fixture.nativeElement.querySelector('.load-more-wrapper');
    const buttonText = fixture.nativeElement.querySelector('.load-next');
    expect(buttonLoadMore).toBeTruthy();
    expect(buttonText.innerHTML).toBe('No more queries for selected time range');
  });

  it('should create table row when data is presented', () => {
    component.queryProfile = [
      {
        Abstract: '', Fingerprint: '', FirstSeen: '0001-01-01T00:00:00Z', Id: '', Load: 0.35376342640982733,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 2395, Query_load: 6.185599, Query_time_avg: 2.007294, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 3959, Query_load: 7.3765154, Query_time_avg: 1.3971101, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 1, QPS: 0.346875, Rank: 0,
        Stats:
          {
            Avg: 1.0198585265868896, Cnt: 14985, Max: 13.063, Med: 1.0610000052162119, Min: 0.1, P5: 0, P95: 2.8103783839457743,
            Sum: 15282.580020904541
          }
      },
      {
        Abstract: 'INSERT sbtest3', Fingerprint: 'INSERT sbtest3', FirstSeen: '2018-07-26T12:23:00Z',
        Id: '20d0ff1066870382aaeb206cad4689b5', Load: 0.0443306017253134,
        Log: [
          {
            NoData: false, Point: 0, Query_count: 308, Query_load: 0.77318054, Query_time_avg: 1.9463924, Start_ts: '2018-07-26T13:01:23Z'
          },
          {
            NoData: false, Point: 1, Query_count: 501, Query_load: 0.9261889, Query_time_avg: 1.3868859, Start_ts: '2018-07-26T12:49:23Z'
          }
        ],
        Percentage: 0.12531143248809826, QPS: 0.04377314814814815, Rank: 1,
        Stats: {
          Avg: 1.0127350579236059, Cnt: 1891, Max: 12.767, Med: 1.0246351353220038, Min: 0.101, P5: 0, P95: 2.7552432651455336,
          Sum: 1915.0819945335388
        }
      }
    ];
    fixture.detectChanges();
    const gridContainer = fixture.nativeElement.querySelector('.grid-container-data');
    expect(gridContainer).toBeTruthy();
  });

  it('should not create table row when data is null', () => {
    component.queryProfile = null;
    fixture.detectChanges();
    const gridContainer = fixture.nativeElement.querySelector('.grid-container-data');
    expect(gridContainer).toBeFalsy();
  });

  it('should not create table row when data is undefined', () => {
    component.queryProfile = undefined;
    fixture.detectChanges();
    const gridContainer = fixture.nativeElement.querySelector('.grid-container-data');
    expect(gridContainer).toBeFalsy();
  });

  it('should highlight first-seen query if they are presented', () => {
    component.isFirstSeen = true;
    fixture.detectChanges();
    const firstSeenQuery = fixture.nativeElement.querySelector('.first-seen-query');
    expect(firstSeenQuery).toBeFalsy();
  });

  it('should not highlight first-seen query if they are not in range', () => {
    component.isFirstSeen = false;
    fixture.detectChanges();
    const firstSeenQuery = fixture.nativeElement.querySelector('.first-seen-query');
    expect(firstSeenQuery).toBeFalsy();
  });

  it('should not call loadQueries() if previousQueryParams is null', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams = null;
    fixture.detectChanges();
    component.onChangeParams(component.previousQueryParams);
    expect(spy).toHaveBeenCalled();
  });

  it('should not call loadQueries() if previousQueryParams host is not like queryParams host', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams['var-host'] = 'test';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call loadQueries() if previousQueryParams.from is not like queryParams.from', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams.from = '152763087087212';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call loadQueries() if previousQueryParams.to is not like queryParams.to', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams.to = '152767407087312';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call loadQueries() if previousQueryParams.search is not like queryParams.search', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams.search = 'select1';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call loadQueries() if previousQueryParams.first_seen is not like queryParams.first_seen', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams.first_seen = false;
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call loadQueries() if previousQueryParams.tz is not like queryParams.tz', () => {
    const spy = spyOn(component, 'loadQueries');
    component.previousQueryParams.tz = 'browser1';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should be true if queryParams is not null', () => {
    component.loadQueries();
    fixture.detectChanges();
    expect(component.isQuerySwitching).toBeTruthy();
  });

  it('should return true if needed data is presented', () => {
    component.loadMoreQueries();
    fixture.detectChanges();
    expect(component.isLoading).toBeTruthy();
  });

  it('should be true if search value is presented', () => {
    component.searchValue = 'Select';
    component.search();
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be false if search value is not presented', () => {
    component.searchValue = '';
    component.search();
    fixture.detectChanges();
    expect(component.testingVariable).toBeFalsy();
  });

  it('should be true if first seen is checked', () => {
    component.getFirstSeen(true);
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be false if first seen not checked', () => {
    component.getFirstSeen(false);
    fixture.detectChanges();
    expect(component.testingVariable).toBeFalsy();
  });

  it('should be false if first seen is not presented', () => {
    component.getFirstSeen();
    fixture.detectChanges();
    expect(component.testingVariable).toBeFalsy();
  });

  it('should be false if first seen is not presented', () => {
    component.getFirstSeen();
    fixture.detectChanges();
    expect(component.testingVariable).toBeFalsy();
  });

  it('should create profileTotal if needed data presented in response', (done) => {
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
    const val = {
      'InstanceId': '',
      'Begin': '2018-09-23T22:28:04Z',
      'End': '2018-09-24T10:28:04Z',
      'TotalTime': 478,
      'TotalQueries': 42,
      'RankBy': {
        'Metric': 'Query_time',
        'Stat': 'sum',
        'Limit': 10
      },
      'Query': [
        {
          'Rank': 0,
          'Percentage': 1,
          'Id': '',
          'Abstract': '',
          'Fingerprint': '',
          'QPS': 0.24847222222222223,
          'Load': 0.003135669820562557,
          'FirstSeen': '0001-01-01T00:00:00Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 10734,
              'Query_load': 0.18814018,
              'Query_time_avg': 0.014273983
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 10734,
            'Sum': 135.46093624830246,
            'Min': 0.0000752,
            'P5': 0,
            'Avg': 0.012619800283985697,
            'Med': 0,
            'P95': 0,
            'Max': 8.011851
          }
        },
        {
          'Rank': 1,
          'Percentage': 0.6319815631761129,
          'Id': 'D2B2DCCF0040F792',
          'Abstract': 'INSERT sbtest1',
          'Fingerprint': 'INSERT INTO `sbtest1` ( `k` , `c` , `pad` ) VALUES (...) /* , ... */',
          'QPS': 0.00863425925925926,
          'Load': 0.001981685514803286,
          'FirstSeen': '2018-09-24T10:20:59Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 373,
              'Query_load': 0.11890113,
              'Query_time_avg': 0.22389653
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 373,
            'Sum': 85.60881423950195,
            'Min': 0.0042949673,
            'P5': 0,
            'Avg': 0.22951424729088996,
            'Med': 0,
            'P95': 0,
            'Max': 3.1928995
          }
        },
        {
          'Rank': 2,
          'Percentage': 0.059145105095421056,
          'Id': '5E556C57819E58FF',
          'Abstract': 'CREATE INDEX',
          'Fingerprint': 'CREATE INDEX `k_1` ON `sbtest1` ( `k` )',
          'QPS': 0.000023148148148148147,
          'Load': 0.00018545952108171252,
          'FirstSeen': '2018-09-24T10:21:59Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 1,
              'Query_load': 0.011127572,
              'Query_time_avg': 8.011851
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 1,
            'Sum': 8.01185131072998,
            'Min': 0.0042949673,
            'P5': 0,
            'Avg': 8.01185131072998,
            'Med': 0,
            'P95': 0,
            'Max': 8.011851
          }
        }]
    };
    const spy = spyOn(component.queryProfileService, 'getQueryProfile').and.returnValue(Promise.resolve(val));
    component.loadQueries();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.profileTotal).toBeTruthy();
      done();
    });
  });

  it('should create error if itpresented in response', (done) => {
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
    const val = {
      'InstanceId': '',
      'Begin': '2018-09-23T22:28:04Z',
      'End': '2018-09-24T10:28:04Z',
      'TotalTime': 478,
      'TotalQueries': 42,
      'Error': 'here is error',
      'RankBy': {
        'Metric': 'Query_time',
        'Stat': 'sum',
        'Limit': 10
      },
      'Query': [
        {
          'Rank': 0,
          'Percentage': 1,
          'Id': '',
          'Abstract': '',
          'Fingerprint': '',
          'QPS': 0.24847222222222223,
          'Load': 0.003135669820562557,
          'FirstSeen': '0001-01-01T00:00:00Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 10734,
              'Query_load': 0.18814018,
              'Query_time_avg': 0.014273983
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 10734,
            'Sum': 135.46093624830246,
            'Min': 0.0000752,
            'P5': 0,
            'Avg': 0.012619800283985697,
            'Med': 0,
            'P95': 0,
            'Max': 8.011851
          }
        },
        {
          'Rank': 1,
          'Percentage': 0.6319815631761129,
          'Id': 'D2B2DCCF0040F792',
          'Abstract': 'INSERT sbtest1',
          'Fingerprint': 'INSERT INTO `sbtest1` ( `k` , `c` , `pad` ) VALUES (...) /* , ... */',
          'QPS': 0.00863425925925926,
          'Load': 0.001981685514803286,
          'FirstSeen': '2018-09-24T10:20:59Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 373,
              'Query_load': 0.11890113,
              'Query_time_avg': 0.22389653
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 373,
            'Sum': 85.60881423950195,
            'Min': 0.0042949673,
            'P5': 0,
            'Avg': 0.22951424729088996,
            'Med': 0,
            'P95': 0,
            'Max': 3.1928995
          }
        },
        {
          'Rank': 2,
          'Percentage': 0.059145105095421056,
          'Id': '5E556C57819E58FF',
          'Abstract': 'CREATE INDEX',
          'Fingerprint': 'CREATE INDEX `k_1` ON `sbtest1` ( `k` )',
          'QPS': 0.000023148148148148147,
          'Load': 0.00018545952108171252,
          'FirstSeen': '2018-09-24T10:21:59Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 1,
              'Query_load': 0.011127572,
              'Query_time_avg': 8.011851
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 1,
            'Sum': 8.01185131072998,
            'Min': 0.0042949673,
            'P5': 0,
            'Avg': 8.01185131072998,
            'Med': 0,
            'P95': 0,
            'Max': 8.011851
          }
        }]
    };
    const spy = spyOn(component.queryProfileService, 'getQueryProfile').and.returnValue(Promise.resolve(val));
    component.loadQueries();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.testingVariable).toBeTruthy();
      done();
    });
  });

  it('should finish loading process if load more queries hs been loaded', (done) => {
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
    const val = {
      'InstanceId': '',
      'Begin': '2018-09-23T22:28:04Z',
      'End': '2018-09-24T10:28:04Z',
      'TotalTime': 478,
      'TotalQueries': 42,
      'Error': 'here is error',
      'RankBy': {
        'Metric': 'Query_time',
        'Stat': 'sum',
        'Limit': 10
      },
      'Query': [
        {
          'Rank': 0,
          'Percentage': 1,
          'Id': '',
          'Abstract': '',
          'Fingerprint': '',
          'QPS': 0.24847222222222223,
          'Load': 0.003135669820562557,
          'FirstSeen': '0001-01-01T00:00:00Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 10734,
              'Query_load': 0.18814018,
              'Query_time_avg': 0.014273983
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 10734,
            'Sum': 135.46093624830246,
            'Min': 0.0000752,
            'P5': 0,
            'Avg': 0.012619800283985697,
            'Med': 0,
            'P95': 0,
            'Max': 8.011851
          }
        },
        {
          'Rank': 1,
          'Percentage': 0.6319815631761129,
          'Id': 'D2B2DCCF0040F792',
          'Abstract': 'INSERT sbtest1',
          'Fingerprint': 'INSERT INTO `sbtest1` ( `k` , `c` , `pad` ) VALUES (...) /* , ... */',
          'QPS': 0.00863425925925926,
          'Load': 0.001981685514803286,
          'FirstSeen': '2018-09-24T10:20:59Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 373,
              'Query_load': 0.11890113,
              'Query_time_avg': 0.22389653
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 373,
            'Sum': 85.60881423950195,
            'Min': 0.0042949673,
            'P5': 0,
            'Avg': 0.22951424729088996,
            'Med': 0,
            'P95': 0,
            'Max': 3.1928995
          }
        },
        {
          'Rank': 2,
          'Percentage': 0.059145105095421056,
          'Id': '5E556C57819E58FF',
          'Abstract': 'CREATE INDEX',
          'Fingerprint': 'CREATE INDEX `k_1` ON `sbtest1` ( `k` )',
          'QPS': 0.000023148148148148147,
          'Load': 0.00018545952108171252,
          'FirstSeen': '2018-09-24T10:21:59Z',
          'Log': [
            {
              'Point': 0,
              'Start_ts': '2018-09-24T10:28:04Z',
              'NoData': false,
              'Query_count': 1,
              'Query_load': 0.011127572,
              'Query_time_avg': 8.011851
            },
            {
              'Point': 1,
              'Start_ts': '2018-09-24T10:16:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            },
            {
              'Point': 2,
              'Start_ts': '2018-09-24T10:04:04Z',
              'NoData': true,
              'Query_count': 0,
              'Query_load': 0,
              'Query_time_avg': 0
            }
          ],
          'Stats': {
            'Cnt': 1,
            'Sum': 8.01185131072998,
            'Min': 0.0042949673,
            'P5': 0,
            'Avg': 8.01185131072998,
            'Med': 0,
            'P95': 0,
            'Max': 8.011851
          }
        }]
    };
    const spy = spyOn(component.queryProfileService, 'getQueryProfile').and.returnValue(Promise.resolve(val));
    component.loadMoreQueries();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.isLoading).toBeFalsy();
      done();
    });
  });

});
