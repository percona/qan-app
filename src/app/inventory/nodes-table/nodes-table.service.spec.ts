import { TestBed } from '@angular/core/testing';

import { NodesTableService } from './nodes-table.service';

describe('NodesTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodesTableService = TestBed.get(NodesTableService);
    expect(service).toBeTruthy();
  });
});
