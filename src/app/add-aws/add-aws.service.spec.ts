import { TestBed, inject } from '@angular/core/testing';

import { AddAwsService } from './add-aws.service';

describe('AddAwsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAwsService]
    });
  });

  it('should be created', inject([AddAwsService], (service: AddAwsService) => {
    expect(service).toBeTruthy();
  }));
});
