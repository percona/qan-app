/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TruncateRootPipe } from './truncate-root.pipe';

describe('TruncateRootPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateRootPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if input is null', () => {
    const pipe = new TruncateRootPipe();
    const result = pipe.transform(null, 12);
    expect(result).toBeNull();
  });

  it('should return 1234 if input is len is 1', () => {
    const pipe = new TruncateRootPipe();
    const result = pipe.transform('1234', 1);
    expect(result).toBe('1234');
  });

  it('should return 12...7 if len is 6', () => {
    const pipe = new TruncateRootPipe();
    const result = pipe.transform('1234567', 6);
    expect(result).toBe('12...7');
  });

  it('should return 1...7 if len is 6', () => {
    const pipe = new TruncateRootPipe();
    const result = pipe.transform('1234567', 5);
    expect(result).toBe('1...7');
  });
});
