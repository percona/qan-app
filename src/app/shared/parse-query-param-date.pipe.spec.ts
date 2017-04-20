import { ParseQueryParamDatePipe } from './parse-query-param-date.pipe';

describe('ParseQueryParamDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ParseQueryParamDatePipe();
    expect(pipe).toBeTruthy();
  });
});
