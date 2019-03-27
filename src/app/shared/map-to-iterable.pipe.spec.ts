/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MapToIterablePipe } from './map-to-iterable.pipe';

describe('MapToIterablePipe', () => {
  it('create an instance', () => {
    const pipe = new MapToIterablePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if data is null', () => {
    const pipe = new MapToIterablePipe();
    const result = pipe.transform(null);
    expect(result).toBe(null);
  });

  it('should return true if data is presented', () => {
    const pipe = new MapToIterablePipe();
    const data = {
      UUID: 'UUID',
      Create: [{
        Db: 'dbName',
        Table: 'tblName'
      }],
      Index: [{
        Db: 'dbName',
        Table: 'tblName'
      }],
      Status: [{
        Db: 'dbName',
        Table: 'tblName'
      }]
    };

    const result = pipe.transform(data);
    expect(result).toBeTruthy();
  });
});
