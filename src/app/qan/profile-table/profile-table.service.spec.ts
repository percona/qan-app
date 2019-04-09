import { TestBed } from '@angular/core/testing';

import { ProfileTableService } from './profile-table.service';

describe('ProfileTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileTableService = TestBed.get(ProfileTableService);
    expect(service).toBeTruthy();
  });
});
