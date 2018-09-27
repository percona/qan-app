import { TestBed, inject } from '@angular/core/testing';

import { InstanceService } from './instance.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('InstanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstanceService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should ...', inject([InstanceService], (service: InstanceService) => {
    expect(service).toBeTruthy();
  }));
});
