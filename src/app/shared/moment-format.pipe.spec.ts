/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MomentFormatPipe } from './moment-format.pipe';

describe('MomentFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new MomentFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if value is null', () => {
    const pipe = new MomentFormatPipe();
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('should return local date if input is presented', () => {
    const pipe = new MomentFormatPipe();
    const result = pipe.transform('20180919T134529Z', 'YYYY-MM-DD HH:mm:ss');
    expect(result).toBe('2018-09-19 16:45:29');
  });

  it('should return date if inout is presented', () => {
    const pipe = new MomentFormatPipe();
    pipe.timezone = 'asd';
    const result = pipe.transform('20180919T134529Z', 'YYYY-MM-DD HH:mm:ss');
    expect(result).toBe('2018-09-19 16:45:29');
  });
});
