import { TestBed } from '@angular/core/testing';

import { FilterViewerService } from './filter-viewer.service';

describe('FilterViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterViewerService = TestBed.get(FilterViewerService);
    expect(service).toBeTruthy();
  });
});
