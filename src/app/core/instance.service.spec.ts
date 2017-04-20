import { TestBed, inject } from '@angular/core/testing';

import { InstanceService } from './instance.service';

describe('InstanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstanceService]
    });
  });

  it('should ...', inject([InstanceService], (service: InstanceService) => {
    expect(service).toBeTruthy();
  }));
});
