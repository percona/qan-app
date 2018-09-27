import { TestBed, inject } from '@angular/core/testing';

import { AddAwsService } from './add-aws.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('AddAwsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAwsService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should be created', inject([AddAwsService], (service: AddAwsService) => {
    expect(service).toBeTruthy();
  }));
});
