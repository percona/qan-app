import { ParseQueryParamDatePipe } from './parse-query-param-date.pipe';
import {MomentFormatPipe} from './moment-format.pipe';
import moment = require('moment');

describe('ParseQueryParamDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ParseQueryParamDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should be true if data is undefined and edge is from', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform(undefined, 'from');
    expect(result).toBeTruthy();
  });

  it('should be true if data is undefined and edge is from', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform(undefined, 'to');
    expect(result).toBeTruthy();
  });

  it('should be true if data is now and edge is to', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('now', 'to');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('from=now-5d&to=now-6M', 'to');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('now-5d&to=now', 'to');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('now/5d&to=now', 'to');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct and has subdata with edge to', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('now/5d/65d&to=now', 'from');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct and has subdata with edge from', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('now-7d/d/5d&to=23eMwdhms/71698744', 'from');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct and has subdata with edge to', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('now-7d/d/5d&to=23eMwdhms/71698744', 'to');
    expect(result).toBeTruthy();
  });

  it('should be true if data is correct and has subdata with edge from', () => {
    const pipe = new ParseQueryParamDatePipe();
    const result = pipe.transform('1234567', 'from');
    expect(result).toBeTruthy();
  });
});
