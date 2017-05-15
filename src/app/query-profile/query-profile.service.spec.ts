/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueryProfileService } from './query-profile.service';

describe('QueryProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryProfileService]
    });
  });

  it('should ...', inject([QueryProfileService], (service: QueryProfileService) => {
    expect(service).toBeTruthy();
  }));
});
