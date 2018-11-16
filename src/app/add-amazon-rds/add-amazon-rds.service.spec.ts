import { TestBed, inject } from '@angular/core/testing';

import { AddAmazonRDSService } from './add-amazon-rds.service';

describe('AddAmazonRDSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAmazonRDSService]
    });
  });

  it('should be created', inject([AddAmazonRDSService], (service: AddAmazonRDSService) => {
    expect(service).toBeTruthy();
  }));
});
