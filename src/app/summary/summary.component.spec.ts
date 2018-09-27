/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import * as JSZip from 'jszip';
import {SummaryComponent} from './summary.component';
import {NgbAccordionConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SummaryService} from './summary.service';
import {InstanceService} from '../core/instance.service';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, HttpModule, NgbModule],
      providers: [SummaryService, InstanceService, NgbAccordionConfig, JSZip,
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
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if dbServer is null during call getServerSummary()', () => {
    component.dbServer = null;
    const result = component.getServerSummary('asdasde123');
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.ParentUUID is null during call getServerSummary()', () => {
    component.dbServer.ParentUUID = null;
    const result = component.getServerSummary('asdasde123');
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer is null during call getMySQLSummary()', () => {
    component.dbServer = null;
    const result = component.getMySQLSummary('asdasde123');
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.UUID is null during call getMySQLSummary()', () => {
    component.dbServer.UUID = null;
    const result = component.getMySQLSummary('asdasde123');
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer is null during call getMongoSummary()', () => {
    component.dbServer = null;
    const result = component.getMongoSummary('asdasde123');
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.UUID is null during call getMongoSummary()', () => {
    component.dbServer.UUID = null;
    const result = component.getMongoSummary('asdasde123');
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer is null during call downloadSummary()', () => {
    component.dbServer = null;
    const result = component.downloadSummary();
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.Subsystem is null during call downloadSummary()', () => {
    component.dbServer.Subsystem = null;
    const result = component.downloadSummary();
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.Subsystem is empty string during call downloadSummary()', () => {
    component.dbServer.Subsystem = 'gbv';
    const result = component.downloadSummary();
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.Name is null during call downloadSummary()', () => {
    component.dbServer.Name = null;
    const result = component.downloadSummary();
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer.Name is null during call downloadSummary()', () => {
    component.dbServer.Subsystem = 'mysql';
    component.downloadSummary();
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should return false if dbServer.Name is null during call downloadSummary()', () => {
    component.dbServer.Subsystem = 'mongo';
    component.downloadSummary();
    fixture.detectChanges();
    expect(component.testingVariable).toBeTruthy();
  });

  it('should return false if dbServer is null during calling onChangeParams()', () => {
    component.dbServer = null;
    const result = component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should return false if dbServer is null during calling onChangeParams()', () => {
    component.dbServer.Subsystem = null;
    const result = component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(result).toBeFalsy();
  });

  it('should call getMySQLSummary() if subsystem is mysql', () => {
    const spy = spyOn(component, 'getMySQLSummary');
    component.dbServer.Subsystem = 'mysql';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getMongoSummary() if subsystem is mongo', () => {
    const spy = spyOn(component, 'getMongoSummary');
    component.dbServer.Subsystem = 'mongo';
    component.onChangeParams(component.queryParams);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call getServerSummary() if agent is null', () => {
    const spy = spyOn(component, 'getServerSummary');
    component.agent = null;
    component.onChangeParams(component.queryParams);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call getServerSummary() if agent.UUID is null', () => {
    const spy = spyOn(component, 'getServerSummary');
    component.agent.UUID = null;
    component.onChangeParams(component.queryParams);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should create serverSummury report if needed data presented in response', (done) => {
    component.agent = {
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
    const val = '# Percona Toolkit System Summary Report ######################';
    const spy = spyOn(component.summaryService, 'getServer').and.returnValue(Promise.resolve(val));
    component.getServerSummary(component.agent.UUID);
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.serverSummary).toBeTruthy();
      done();
    });
  });

  it('should create mysqlSummary report if needed data presented in response', (done) => {
    component.agent = {
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
    const val = '# Percona Toolkit System Mysql Summary Report ######################';
    const spy = spyOn(component.summaryService, 'getMySQL').and.returnValue(Promise.resolve(val));
    component.getMySQLSummary(component.agent.UUID);
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.mysqlSummary).toBeTruthy();
      done();
    });
  });

  it('should create error report if needed data is not presented in getMySQL response', (done) => {
    component.agent = {
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
    const spy = spyOn(component.summaryService, 'getMySQL').and.returnValue(Promise.reject({message: 'Error message'}));
    component.getMySQLSummary(component.agent.UUID);
    spy.calls.mostRecent().returnValue.then().catch((err) => {
      fixture.detectChanges();
      expect(component.mysqlSummaryError).toBeTruthy();
      done();
    });
  });

  it('should create mongoSummary report if needed data presented in response', (done) => {
    component.agent = {
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
    const val = '# Percona Toolkit System Mongo Summary Report ######################';
    const spy = spyOn(component.summaryService, 'getMongo').and.returnValue(Promise.resolve(val));
    component.getMongoSummary(component.agent.UUID);
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.mongoSummary).toBeTruthy();
      done();
    });
  });

  it('should create error report if needed data is not presented in getMongo response', (done) => {
    component.agent = {
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
    const spy = spyOn(component.summaryService, 'getMongo').and.returnValue(Promise.reject({message: 'Error message'}));
    component.getMongoSummary(component.agent.UUID);
    spy.calls.mostRecent().returnValue.then().catch((err) => {
      fixture.detectChanges();
      expect(component.mongoSummaryError).toBeTruthy();
      done();
    });
  });
});
