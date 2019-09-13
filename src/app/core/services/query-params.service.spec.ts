import { TestBed } from '@angular/core/testing';

import { QueryParamsService } from './query-params.service';

describe('QueryParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryParamsService = TestBed.get(QueryParamsService);
    expect(service).toBeTruthy();
  });
});
