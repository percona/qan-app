/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions} from '@angular/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {AddAwsService, RDSNode} from './add-aws.service';

describe('AddAwsService', () => {
  let service: AddAwsService;
  let backend: MockBackend;
  const rdsCredentials = {
    aws_access_key_id: 'asdasdas',
    aws_secret_access_key: 'asdasad123sdas'
  };
  const rdsNode = {
    name: 'string',
    region: 'string'
  };
  const instanceJson = require('../mock-data/instance-mock.json');
  const dataResponse = Object.assign(instanceJson, {json: () => instanceJson._body});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        AddAwsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    backend = TestBed.get(MockBackend);
    service = TestBed.get(AddAwsService);
  });

  it('should be empty array if response data is undefined', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if discover response data is valid', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(dataResponse);
    });

    const result = service.discover(rdsCredentials);
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if enable response data is valid', fakeAsync(() => {
    const mysqlCredentials = {
      username: 'username',
      password: 'password'
    };

    backend.connections.subscribe(connection => {
      connection.mockRespond(dataResponse);
    });

    const result = service.enable(rdsCredentials, rdsNode, mysqlCredentials);
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if disable response data is valid', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(dataResponse);
    });

    const result = service.disable(rdsNode);
    tick();
    expect(result).toBeTruthy();
  }));

  it('should be true if getRegistered response data is valid', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(dataResponse);
    });

    const result = service.getRegistered();
    tick();
    expect(result).toBeTruthy();
  }));
});

