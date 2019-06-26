import { TestBed } from '@angular/core/testing';

import { DetailsTableService } from './details-table.service';

describe('DetailsTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsTableService = TestBed.get(DetailsTableService);
    expect(service).toBeTruthy();
  });
});
