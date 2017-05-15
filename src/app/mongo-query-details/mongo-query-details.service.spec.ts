/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MongoQueryDetailsService } from './mongo-query-details.service';

describe('QueryDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MongoQueryDetailsService]
    });
  });

  it('should ...', inject([MongoQueryDetailsService], (service: MongoQueryDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
