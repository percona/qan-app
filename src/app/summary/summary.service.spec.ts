/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SummaryService } from './summary.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('SummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should ...', inject([SummaryService], (service: SummaryService) => {
    expect(service).toBeTruthy();
  }));
});
