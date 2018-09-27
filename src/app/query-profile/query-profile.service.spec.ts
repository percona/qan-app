/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueryProfileService } from './query-profile.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('QueryProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryProfileService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should ...', inject([QueryProfileService], (service: QueryProfileService) => {
    expect(service).toBeTruthy();
  }));
});
