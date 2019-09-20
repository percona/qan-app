import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { InstanceService } from '../instance.service';
import 'rxjs/add/operator/toPromise';

describe('InstanceService', () => {
  let service: InstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InstanceService
      ]
    });
    service = TestBed.get(InstanceService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});
