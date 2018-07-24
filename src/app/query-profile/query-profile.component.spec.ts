/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryProfileComponent } from './query-profile.component';
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

fdescribe('QueryProfileComponent', () => {
  let component: QueryProfileComponent;
  let fixture: ComponentFixture<QueryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueryProfileComponent,
        LoadSparklinesDirective,
        LatencyChartDirective,
        HumanizePipe
      ],
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
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it()
});
