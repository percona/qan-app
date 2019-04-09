/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, PipeTransform } from '@angular/core';

import { QanProfileComponent } from './qan-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ClipboardModule } from 'ngx-clipboard';
import { InstanceService } from '../../core/services/instance.service';
import { QueryProfileService } from './qan-profile.service';
import { LoadSparklinesDirective } from '../../shared/load-sparklines.directive';
import { HumanizePipe } from '../../shared/humanize.pipe';
import { LatencyChartDirective } from '../../shared/latency-chart.directive';
import { MomentFormatPipe } from '../../shared/moment-format.pipe';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

fdescribe('QanProfileComponent', () => {
  let component: QanProfileComponent;
  let fixture: ComponentFixture<QanProfileComponent>;
  const queryProfileJson = require('../../mock-data/queryProfile-mock.json');
  const queryProfileResponse = Object.assign({}, queryProfileJson);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MomentFormatPipe,
        QanProfileComponent,
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
        HttpClientModule,
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
    fixture = TestBed.createComponent(QanProfileComponent);
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
    component.toggleFirstSeen(true);
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be false if first seen not checked', () => {
    component.toggleFirstSeen(false);
    fixture.detectChanges();
    expect(component.testingVariable).toBeFalsy();
  });

  it('should be false if first seen is not presented', () => {
    component.toggleFirstSeen();
    fixture.detectChanges();
    expect(component.testingVariable).toBeFalsy();
  });

  it('should be false if first seen is not presented', () => {
    component.toggleFirstSeen();
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
    const response = Object.assign({}, queryProfileResponse);
    response['Error'] = '';
    const spy = spyOn(component.queryProfileService, 'getQueryProfile').and.returnValue(Promise.resolve(response));
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
    const response = Object.assign({}, queryProfileResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    const spy = spyOn(component.queryProfileService, 'getQueryProfile').and.returnValue(Promise.resolve(response));
    component.loadQueries();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.testingVariable).toBeTruthy();
      done();
    });
  });

  it('should finish loading process if load more queries has been loaded', (done) => {
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
    const response = Object.assign({}, queryProfileResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    const spy = spyOn(component.queryProfileService, 'getQueryProfile').and.returnValue(Promise.resolve(response));
    component.loadMoreQueries();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.isLoading).toBeFalsy();
      done();
    });
  });

});
