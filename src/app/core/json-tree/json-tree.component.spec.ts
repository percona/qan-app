/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InstanceService} from '../instance.service';
import {JSONTreeComponent} from './json-tree.component';
import {ClipboardModule} from 'ngx-clipboard';

describe('JSONTreeComponent', () => {
  let component: JSONTreeComponent;
  let fixture: ComponentFixture<JSONTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JSONTreeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, HttpModule, ClipboardModule],
      providers: [
        InstanceService,
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
    fixture = TestBed.createComponent(JSONTreeComponent);
    component = fixture.componentInstance;
    component.json = {json: 'json'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be true if ngOnChanges has been called', () => {
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });

  it('should be false if isCollapsed true by default', () => {
    component.toggleAll();
    fixture.detectChanges();
    expect(component.isCollapsed).toBeFalsy();
  });

  it('should be true if isCollapsed is false', () => {
    component.isCollapsed = false;
    component.toggleAll();
    fixture.detectChanges();
    expect(component.isCollapsed).toBeTruthy();
  });
});
