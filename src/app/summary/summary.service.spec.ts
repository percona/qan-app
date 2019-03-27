/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { SummaryService } from './summary.service';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockBackend } from '@angular/http/testing';

describe('SummaryService', () => {
  let service: SummaryService;
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
        SummaryService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(SummaryService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if response data in getServer is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getServer('agentUUID', 'serverUUID');
    tick();
    expect(service).toBeTruthy();
  }));

  it('should create error during call getServer if it presented in response', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    response._body['Error'] = 'Error';

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getServer('agentUUID', 'serverUUID')
      .catch((err) => {
        expect(err.message).toEqual('Error');
        tick();
      });
  }));

  it('should create special error - Please install `pt-summary`. (Output: Executable file not found in $PATH)',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
      response._body = Object.assign({}, response._body);
      response._body['Error'] = 'Executable file not found in $PATH';

      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      service.getServer('agentUUID', 'serverUUID')
        .catch((err) => {
          tick();
          expect(err.message).toEqual(' - Please install `pt-summary`. (Output: Executable file not found in $PATH)');
        });
    }));

  it('should be true if getMySQL response data is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getMySQL('agentUUID', 'serverUUID');
    expect(service).toBeTruthy();
    tick();
  }));

  it('should create error during call getMysql if it presented in response', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    response._body['Error'] = 'Error';

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getMySQL('agentUUID', 'serverUUID')
      .catch((err) => {
        expect(err.message).toEqual('Error');
        tick();
      });
  }));

  it('should create special error - Please install `pt-mysql-summary`. (Output: Executable file not found in $PATH)',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
      response._body = Object.assign({}, response._body);
      response._body['Error'] = 'Executable file not found in $PATH';

      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      service.getMySQL('agentUUID', 'serverUUID')
        .catch((err) => {
          expect(err.message).toEqual(' - Please install `pt-mysql-summary`. (Output: Executable file not found in $PATH)');
          tick();
        });
    }));

  it('should be true if getMongo response data is valid', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getMongo('agentUUID', 'serverUUID');
    tick();
    expect(service).toBeTruthy();
  }));

  it('should create error during call getMongo if it presented in response', fakeAsync(() => {
    const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
    response._body = Object.assign({}, response._body);
    response._body['Error'] = 'Error';

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getMongo('agentUUID', 'serverUUID')
      .catch((err) => {
        expect(err.message).toEqual('Error');
        tick();
      });
  }));

  it('should create special error - Please install `pt-mongodb-summary`. (Output: Executable file not found in $PATH)',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
      response._body = Object.assign({}, response._body);
      response._body['Error'] = 'Executable file not found in $PATH';

      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      service.getMongo('agentUUID', 'serverUUID')
        .catch((err) => {
          expect(err.message).toEqual(' - Please install `pt-mongodb-summary`. (Output: Executable file not found in $PATH)');
          tick();
        });
    }));

  it('should create special error  - Please update your `pmm-client`. (Output: Unknown command: GetMongoSummary)',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
      response._body = Object.assign({}, response._body);
      response._body['Error'] = 'Unknown command: GetMongoSummary';

      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      service.getMongo('agentUUID', 'serverUUID')
        .catch((err) => {
          expect(err.message).toEqual(' - Please update your `pmm-client`. (Output: Unknown command: GetMongoSummary)');
          tick();
        });
    }));
});
