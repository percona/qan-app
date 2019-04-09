import { TestBed } from '@angular/core/testing';

import { QanTableService } from './qan-table.service';

describe('QanTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QanTableService = TestBed.get(QanTableService);
    expect(service).toBeTruthy();
  });
});
