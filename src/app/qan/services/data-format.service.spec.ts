import { TestBed } from '@angular/core/testing';

import { DataFormatService } from './data-format.service';

describe('DataFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFormatService = TestBed.get(DataFormatService);
    expect(service).toBeTruthy();
  });
});
