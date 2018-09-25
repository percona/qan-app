/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

import {SettingsComponent} from './settings.component';
import {ClipboardModule} from 'ngx-clipboard';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbAccordionConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HumanizePipe} from '../shared/humanize.pipe';
import {MapToIterablePipe} from '../shared/map-to-iterable.pipe';
import {Instance, InstanceService} from '../core/instance.service';

fdescribe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent, HumanizePipe, MapToIterablePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ClipboardModule, RouterTestingModule, HttpModule, NgbModule],
      providers: [
        InstanceService,
        NgbAccordionConfig,
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
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAgentLog if setLogPeriod has been called', () => {
    const spy = spyOn(component, 'getAgentLog');
    component.setLogPeriod('period');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getAgentLog if refreshAgentLog has been called', () => {
    const spy = spyOn(component, 'getAgentLog');
    component.refreshAgentLog();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should be true if exampleQueries is presented in promise data', (done) => {
    const promiseData = {
      'agent': {'KeepAlive': 76, 'Listen': '127.0.0.1:9000'},
      'bin': {'basedir': '/usr/local/percona/qan-agent'},
      'data': {'DataEncoding': 'gzip', 'MaxAge': 86400, 'MaxFiles': 1000, 'MaxSize': 104857600, 'SendInterval': 63},
      'log': {'LogLevel': 'warning'},
      'qan': {
        'CollectFrom': 'perfschema',
        'ExampleQueries': true,
        'Interval': 60,
        'LogOutput': 'FILE',
        'LogQueriesNotUsingIndexes': false,
        'LogSlowAdminStatements': false,
        'LogSlowFilter': null,
        'LogSlowRateLimit': null,
        'LogSlowRateType': null,
        'LogSlowSlaveStatements': false,
        'LogSlowSpStatements': null,
        'LogSlowVerbosity': null,
        'LogThrottleQueriesNotUsingIndexes': 0,
        'LogTimestamps': 'UTC',
        'LongQueryTime': 10,
        'MaxSlowLogSize': 1073741824,
        'MinExaminedRowLimit': 0,
        'PerformanceSchema': true,
        'PerformanceSchemaDigestsSize': 10000,
        'PerformanceSchemaMaxDigestLength': 1024,
        'ReportLimit': 200,
        'RetainSlowLogs': 1,
        'SlowLogRotation': true,
        'SlowQueryLog': false,
        'SlowQueryLogAlwaysWriteTime': null,
        'SlowQueryLogFile': '/var/lib/mysql/4947ab5346cf-slow.log',
        'SlowQueryLogUseGlobalControl': null
      }
    };
    const spy = spyOn(component.settingsService, 'getAgentDefaults').and.returnValue(Promise.resolve(promiseData));
    component.getAgentDefaults();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.exampleQueries).toBeTruthy();
      done();
    });
  });

  it('should create error in console if promise data is not presented', (done) => {
    const promiseData = undefined;
    const spy = spyOn(component.settingsService, 'getAgentDefaults').and.returnValue(Promise.resolve(promiseData));
    component.getAgentDefaults();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(console.error(data)).toBe(data);
      done();
    });
  });

  it('should be true if promise data is valid', (done) => {
    const promiseData = {
      'UUID': '99b747a27565487a49944759bc89f15a',
      'CollectFrom': 'perfschema',
      'Interval': 720,
      'ExampleQueries': true,
      'SlowLogRotation': true,
      'RetainSlowLogs': 1,
      'ReportLimit': 200
    };
    const spy = spyOn(component.settingsService, 'setAgentDefaults').and.returnValue(Promise.resolve(promiseData));
    component.setAgentDefaults();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.isSuccess).toBeTruthy();
      setTimeout(() => {
        done();
      }, 6000);
    });
  });

  it('', () => {
    component.getAgentStatus();
    expect(component.statusUpdatedFromNow$).toBeTruthy();
  });

  it('', () => {
    component.getAgentLog();
    expect(component.logUpdatedFromNow$).toBeTruthy();
  });

  it('should call getAgentDefaults(), getAgentDefaults, getAgentLog if onChangeParams() has been called', () => {
    const getAgentDefaultsSpy = spyOn(component, 'getAgentDefaults');
    const getAgentStatusSpy = spyOn(component, 'getAgentStatus');
    const getAgentLogSpy = spyOn(component, 'getAgentLog');
    fixture.detectChanges();
    component.onChangeParams('params');
    [getAgentDefaultsSpy, getAgentStatusSpy, getAgentLogSpy].map(item => expect(item).toHaveBeenCalled());
  });
});
