/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions} from '@angular/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {MongoQueryDetailsService} from './mongo-query-details.service';

describe('MongoQueryDetailsService', () => {
  let service: MongoQueryDetailsService;
  let backend: MockBackend;
  const mockExplainDecodeData = require('../mock-data/explain-decode-mock.json');
  const mockQueryDetailsData = require('../mock-data/query-details-mock.json');
  const responseExplain = Object.assign(mockExplainDecodeData);
  const responseQueryDetails = Object.assign({}, mockQueryDetailsData);

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
        MongoQueryDetailsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(MongoQueryDetailsService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if getQueryDetails response data is valid', fakeAsync(() => {
    const responseData = Object.assign({}, responseQueryDetails);

    backend.connections.subscribe(connection => {
      connection.mockRespond(responseData);
    });

    const result = service.getQueryDetails('agentUUID', 'serverUUID', '123456789', '987654321');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if getSummary response data is valid', fakeAsync(() => {
    const responseData = Object.assign({}, responseQueryDetails);

    backend.connections.subscribe(connection => {
      connection.mockRespond(responseData);
    });

    const result = service.getSummary('serverUUID', '123456789', '987654321');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if getTableInfo response data is valid', fakeAsync(() => {
    const responseData = Object.assign({}, responseQueryDetails);

    backend.connections.subscribe(connection => {
      connection.mockRespond(responseData);
    });

    const result = service.getTableInfo('agentUUID', 'serverUUID', '123456789', '987654321');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if getExplain response data is valid', fakeAsync(() => {
    const responseData = Object.assign({}, responseExplain, {json: () => responseData._body});
    backend.connections.subscribe(connection => {
      connection.mockRespond(responseData);
    });

    const result = service.getExplain('agentUUID', 'serverUUID', '123456789', '987654321');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if updateTables response data is valid', fakeAsync(() => {
    const responseData = Object.assign({}, responseQueryDetails);

    backend.connections.subscribe(connection => {
      connection.mockRespond(responseData);
    });

    const result = service.updateTables('agentUUID', []);
    tick();
    expect(result).toBeTruthy();
  }));

});
