/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import {NavComponent} from './nav.component';
import {TruncateRootPipe} from '../../shared/truncate-root.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbDropdownConfig, NgbDropdownModule,} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {InstanceService} from '../instance.service';
import {MomentFormatPipe} from '../../shared/moment-format.pipe';
import * as moment from 'moment';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent, TruncateRootPipe, MomentFormatPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, HttpModule, NgbDropdownModule, ReactiveFormsModule],
      providers: [
        InstanceService,
        NgbDropdownConfig,
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
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
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
      from: '1527630870872',
      queryID: 'E477191F9BF35C18',
      theme: 'dark',
      to: '1527674070873',
      tz: 'browser',
      'var-host': 'MongoDB',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be true if url not starts with /profile', () => {
    component.onChangeParams('params');
    fixture.detectChanges();
    expect(component.isExtHidden).toBeTruthy();
  });

  it('should be true if url event has -', () => {
    component.changeDateInput('now-12h', 'from');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be true if url event has +', () => {
    component.changeDateInput('now+12h', 'from');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be true if url event has /', () => {
    component.changeDateInput('now/12h', 'from');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be true if url has YYYY-MM-DD HH:mm format and dir is from', () => {
    component.changeDateInput('2017-11-11 11:11', 'from');
    fixture.detectChanges();
    expect(component.isValidFromInput).toBeTruthy();
  });

  it('should be true if url has YYYY-MM-DD HH:mm format and dir is to', () => {
    component.changeDateInput('2017-11-11 11:11', 'to');
    fixture.detectChanges();
    expect(component.isValidToInput).toBeTruthy();
  });

  it('should be false if url has not YYYY-MM-DD HH:mm format and from dir', () => {
    component.changeDateInput('1543622400000', 'from');
    fixture.detectChanges();
    expect(component.isValidFromInput).toBeFalsy();
  });

  it('should be false if url has not YYYY-MM-DD HH:mm format and from dir', () => {
    component.changeDateInput('1543622400000', 'to');
    fixture.detectChanges();
    expect(component.isValidToInput).toBeFalsy();
  });

  it('should be true if url has less length than 3', () => {
    component.changeDateInput('1', 'to');
    fixture.detectChanges();
    expect(component.isValidToInput).toBeTruthy();
  });

  it('should create fromTimeRaw if dir is from', () => {
    component.changeDateCal({year: 2018, month: 11, day: 11}, 'from');
    fixture.detectChanges();
    expect(component.fromTimeRaw).toBeTruthy();
  });

  it('should create toTimeRaw if dir is to', () => {
    component.changeDateCal({year: 2018, month: 11, day: 11}, 'to');
    fixture.detectChanges();
    expect(component.toTimeRaw).toBeTruthy();
  });

  it('should be utc if parameter is utc', () => {
    component.path = 'summery';
    component.setTimeZone('utc');
    fixture.detectChanges();
    expect(component.timezone).toBe('utc');
  });

  it('should be browser if parameter is browser', () => {
    component.path = 'summery';
    component.setTimeZone('browser');
    fixture.detectChanges();
    expect(component.timezone).toBe('browser');
  });

  it('should be utc if parameter has not been added added', () => {
    component.path = 'summery';
    component.setTimeZone();
    fixture.detectChanges();
    expect(component.timezone).toBe('utc');
  });

  it('should be true if parameter has been added', () => {
    component.path = 'summery';
    component.setQuickRange('1234', 's');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be true if num parameter has been added, and unit parameter is not', () => {
    component.path = 'summery';
    component.setQuickRange('1234');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should be true if all parameters has been added', () => {
    component.path = 'summery';
    component.setTimeRange('1234', '12345');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should crete assets for percona server if distro is percona server', () => {
    component.path = 'summery';
    component.getDBLogo('Percona Server');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should crete assets for percona server if distro is percona server', () => {
    component.getDBLogo('default');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should crete assets for percona XtraDB if distro is percona XtraDB', () => {
    component.getDBLogo('Percona XtraDB');
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

});
