import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {InstanceService} from './instance.service';
import 'rxjs/add/operator/toPromise';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BaseRequestOptions, Http, HttpModule, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('InstanceService', () => {
  let service: InstanceService;
  let backend: MockBackend;
  const dbServersJson = require('../mock-data/dbServers-mock.json');
  const dbServerResponse = Object.assign({}, dbServersJson);

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
        InstanceService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(InstanceService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(undefined);
    });

    service.getDBServers();
    tick();
    expect(service.dbServers).toEqual([]);
  }));

  it('should create dbServer if response data is valid', fakeAsync(() => {
    const response = Object.assign({}, dbServerResponse, {json: () => response._body});
    response._body = Object.assign({}, response._body);

    backend.connections.subscribe(connection => {
      connection.mockRespond(response);
    });

    service.getDBServers();
    tick();
    expect(service.dbServers).toBeTruthy();
  }));
});
