/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { QueryProfileService } from './profile.service';

describe('QueryProfileService', () => {
  let service: QueryProfileService;
  let backend: MockBackend;
  const mysqlServiceJson = require('../../mock-data/mysqlService-mock.json');
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
        QueryProfileService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(QueryProfileService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if getQueryProfile response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.getQueryProfile('dbServerUUID', '123456', '654321', 0, '', false);
      tick();
      expect(result).toBeTruthy();
    })
  );

  it('should be true if getQueryProfile response data is valid',
    fakeAsync(() => {
      const response = Object.assign({}, mysqlServiceResponse, { json: () => response._body });
      response._body = Object.assign({}, response._body);
      backend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });

      const result = service.getQueryProfile('dbServerUUID', '123456', '654321', 5, 'SELECT', false);
      tick();
      expect(result).toBeTruthy();
    })
  );
});
