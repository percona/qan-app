/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MySQLQueryDetailsComponent } from './mysql-query-details.component';
import { HumanizePipe } from '../shared/humanize.pipe';
import { LoadSparklinesDirective } from '../shared/load-sparklines.directive';
import { LatencyChartDirective } from '../shared/latency-chart.directive';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { MapToIterablePipe } from '../shared/map-to-iterable.pipe';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {Instance, InstanceService} from '../core/instance.service';
import { HttpModule } from '@angular/http';
import { MySQLQueryDetailsService } from './mysql-query-details.service';
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
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, ClipboardModule, RouterTestingModule, HttpModule, NgbModule ],
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
    fixture.detectChanges();
  });

  it('should create Visual Explain section if data is correct', () => {
    component.queryExample = 'testQueryExample';
    component.isExplainLoading = false;
    component.visualExplainError = '';
    component.visualExplain = 'data';
    fixture.detectChanges();
    const visualExplain = fixture.nativeElement.querySelector('#visual-explain-header');
    expect(visualExplain).toBeTruthy();
  });
  it('should not create Visual Explain section if data is undefined', () => {
    component.visualExplain = undefined;
    fixture.detectChanges();
    const visualExplain = fixture.nativeElement.querySelector('#visual-explain-header');
    expect(visualExplain).toBeFalsy();
  });
  it('should not create Visual Explain section if error is presented', () => {
    component.visualExplainError = 'error';
    fixture.detectChanges();
    const visualExplain = fixture.nativeElement.querySelector('#visual-explain-header');
    expect(visualExplain).toBeFalsy();
  })
});
