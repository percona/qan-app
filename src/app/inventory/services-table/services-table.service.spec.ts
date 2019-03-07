import { TestBed } from '@angular/core/testing';

import { ServicesTableService } from './services-table.service';

describe('ServicesTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesTableService = TestBed.get(ServicesTableService);
    expect(service).toBeTruthy();
  });
});
