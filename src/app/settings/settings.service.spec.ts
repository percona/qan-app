/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingsService } from './settings.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService, Http, ConnectionBackend, RequestOptions]
    });
  });

  it('should ...', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));
});
