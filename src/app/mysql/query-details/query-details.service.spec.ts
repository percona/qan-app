/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueryDetailsService } from './query-details.service';

describe('QueryDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryDetailsService]
    });
  });

  it('should ...', inject([QueryDetailsService], (service: QueryDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
