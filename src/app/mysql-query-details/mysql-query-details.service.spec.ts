/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MySQLQueryDetailsService } from './mysql-query-details.service';

describe('QueryDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySQLQueryDetailsService]
    });
  });

  it('should ...', inject([MySQLQueryDetailsService], (service: MySQLQueryDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
