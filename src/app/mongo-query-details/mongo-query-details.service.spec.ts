/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MongoQueryDetailsService } from './mongo-query-details.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('QueryDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MongoQueryDetailsService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should ...', inject([MongoQueryDetailsService], (service: MongoQueryDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
