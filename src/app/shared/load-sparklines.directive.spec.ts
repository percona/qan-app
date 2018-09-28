/* tslint:disable:no-unused-variable */

import {ElementRef} from '@angular/core';
import {LoadSparklinesDirective} from './load-sparklines.directive';

describe('LoadSparklinesDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    expect(directive).toBeTruthy();
  });

  it('should be equal like with xkey', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    directive.xkey = 'xkey';
    expect(directive._xkey).toBe('xkey');
  });

  it('should be equal like with ykey', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    directive.ykey = 'ykey';
    expect(directive._ykey).toBe('ykey');
  });

  it('should be equal like with measurement', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    directive.measurement = 'measurement';
    expect(directive._measurement).toBe('measurement');
  });

  it('should not call draw Chart if data is null', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    const spy = spyOn(directive, 'drawChart');
    directive.appLoadSparklines = null;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call draw Chart if data is not null', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    const spy = spyOn(directive, 'drawChart');
    directive.appLoadSparklines = [{}];
    expect(spy).toHaveBeenCalled();
  });

  it('should call draw Chart if data is not null and present all inputs', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    directive.xkey = 'Start_ts';
    directive.ykey = 'Start_ts';
    directive.measurement = 'time';
    const spy = spyOn(directive, 'drawChart');
    directive.appLoadSparklines = [
      {
        'Point': 1,
        'Start_ts': '2018-09-20T12:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 2,
        'Start_ts': '2018-09-20T12:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 3,
        'Start_ts': '2018-09-20T12:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 4,
        'Start_ts': '2018-09-20T11:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 5,
        'Start_ts': '2018-09-20T11:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 6,
        'Start_ts': '2018-09-20T10:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 7,
        'Start_ts': '2018-09-20T10:27:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 8,
        'Start_ts': '2018-09-20T10:03:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 9,
        'Start_ts': '2018-09-20T09:39:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 10,
        'Start_ts': '2018-09-20T09:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 11,
        'Start_ts': '2018-09-20T08:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      }, {
        'Point': 12,
        'Start_ts': '2018-09-20T08:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 13,
        'Start_ts': '2018-09-20T08:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 14,
        'Start_ts': '2018-09-20T07:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 15,
        'Start_ts': '2018-09-20T07:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 16,
        'Start_ts': '2018-09-20T06:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 17,
        'Start_ts': '2018-09-20T06:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 18,
        'Start_ts': '2018-09-20T06:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 19,
        'Start_ts': '2018-09-20T05:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 20,
        'Start_ts': '2018-09-20T05:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 21,
        'Start_ts': '2018-09-20T04:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 22,
        'Start_ts': '2018-09-20T04:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 23,
        'Start_ts': '2018-09-20T04:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 24,
        'Start_ts': '2018-09-20T03:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 25,
        'Start_ts': '2018-09-20T03:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 26,
        'Start_ts': '2018-09-20T02:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 27,
        'Start_ts': '2018-09-20T02:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 28,
        'Start_ts': '2018-09-20T02:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 29,
        'Start_ts': '2018-09-20T01:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      }, {
        'Point': 30,
        'Start_ts': '2018-09-20T01:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 31,
        'Start_ts': '2018-09-20T00:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 32,
        'Start_ts': '2018-09-20T00:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 33,
        'Start_ts': '2018-09-20T00:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 34,
        'Start_ts': '2018-09-19T23:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 35,
        'Start_ts': '2018-09-19T23:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 36,
        'Start_ts': '2018-09-19T22:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 37,
        'Start_ts': '2018-09-19T22:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 38,
        'Start_ts': '2018-09-19T22:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 39,
        'Start_ts': '2018-09-19T21:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 40,
        'Start_ts': '2018-09-19T21:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 41,
        'Start_ts': '2018-09-19T20:51:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 42,
        'Start_ts': '2018-09-19T20:27:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 43,
        'Start_ts': '2018-09-19T20:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 44,
        'Start_ts': '2018-09-19T19:39:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 45,
        'Start_ts': '2018-09-19T19:15:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 46,
        'Start_ts': '2018-09-19T18:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 47,
        'Start_ts': '2018-09-19T18:27:49Z',
        'NoData': false,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 48,
        'Start_ts': '2018-09-19T18:03:49Z',
        'NoData': false,
        'Query_count': 19014,
        'Query_load': 0.08687029,
        'Query_time_avg': 0.009268305
      },
      {
        'Point': 49,
        'Start_ts': '2018-09-19T17:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 50,
        'Start_ts': '2018-09-19T17:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 51,
        'Start_ts': '2018-09-19T16:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 52,
        'Start_ts': '2018-09-19T16:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 53,
        'Start_ts': '2018-09-19T16:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 54,
        'Start_ts': '2018-09-19T15:39:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 55,
        'Start_ts': '2018-09-19T15:15:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 56,
        'Start_ts': '2018-09-19T14:51:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 57,
        'Start_ts': '2018-09-19T14:27:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 58,
        'Start_ts': '2018-09-19T14:03:49Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      }
    ];
    expect(spy).toHaveBeenCalled();
  });
});
