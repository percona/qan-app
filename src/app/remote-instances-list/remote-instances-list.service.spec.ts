import { TestBed, inject } from '@angular/core/testing';

import { RemoteInstancesListService } from './remote-instances-list.service';

describe('RemoteInstancesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteInstancesListService]
    });
  });

  it('should be created', inject([RemoteInstancesListService], (service: RemoteInstancesListService) => {
    expect(service).toBeTruthy();
  }));
});
