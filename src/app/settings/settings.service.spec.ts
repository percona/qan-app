/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions} from '@angular/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {SettingsService} from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
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
        SettingsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(SettingsService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if getAgentStatus response data is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    const result = service.getAgentStatus('agentUUID');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if getAgentLog response data is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    const result = service.getAgentLog('agentUUID', '12345', '54321');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if getAgentDefaults response data is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    const result = service.getAgentDefaults('agentUUID', 'dbServerUUID');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should create error during call getAgentDefaults if it presented in response', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    response._body['Error'] = 'Error';

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getAgentDefaults('agentUUID', 'dbServerUUID')
      .catch((err) => {
        expect(err.message).toEqual('Error');
        tick();
      });
  }));

  it('should be true if setAgentDefaults response data is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    const result = service.setAgentDefaults('agentUUID', 'dbServerUUID', 2, true, 'perfschema');
    tick();
    expect(result).toBeTruthy();
  }));

  it('should create error during call setAgentDefaults if it presented in response', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);
    response._body['Error'] = 'Error';

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.setAgentDefaults('agentUUID', 'dbServerUUID', 2, true, 'perfschema')
      .catch((err) => {
        expect(err.message).toEqual('Error');
        tick();
      });
  }));
});
