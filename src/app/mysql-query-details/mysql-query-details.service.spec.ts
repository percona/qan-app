/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MySQLQueryDetailsService } from './mysql-query-details.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('QueryDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySQLQueryDetailsService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should ...', inject([MySQLQueryDetailsService], (service: MySQLQueryDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
