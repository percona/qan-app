import { TestBed } from '@angular/core/testing';

import { AgentsTableService } from './agents-table.service';

describe('AgentsTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentsTableService = TestBed.get(AgentsTableService);
    expect(service).toBeTruthy();
  });
});
