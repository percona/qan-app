/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions} from '@angular/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {MySQLQueryDetailsService} from './mysql-query-details.service';

describe('MySQLQueryDetailsService', () => {
  let service: MySQLQueryDetailsService;
  let backend: MockBackend;
  const mysqlServiceJson = require('../mock-data/mysqlService-mock.json');
  const mysqlServiceResponse = Object.assign({}, mysqlServiceJson);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendData, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        MySQLQueryDetailsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(MySQLQueryDetailsService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if getQueryDetails response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.getQueryDetails('dbServerUUID', 'queryUUID', '123456', '654321');
      tick();
      expect(result).toBeTruthy();
    })
  );

  it('should be true if getSummary response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.getSummary('dbServerUUID', '123456', '654321');
      tick();
      expect(result).toBeTruthy();
    })
  );

  it('should be true if getTableInfo response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.getTableInfo('agentUUID', 'dbServerUUID', 'dbName', 'tblName');
      tick();
      expect(result).toBeTruthy();
    })
  );

  it('should be true if getExplain response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.getExplain('agentUUID', 'dbServerUUID', 'dbName', 'tblName');
      tick();
      expect(result).toBeTruthy();
    })
  );

  it('should be true if updateTables response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.updateTables('queryID', []);
      tick();
      expect(result).toBeTruthy();
    })
  );
});
