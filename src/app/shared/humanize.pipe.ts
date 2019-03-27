import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as numeral from 'numeral';

/**
   * @desc humanize time duration
   * @example <div>{{ duration | humanize }}</div>
   */
@Pipe({ name: 'humanize' })
export class HumanizePipe implements PipeTransform {

  parceTime(input: number) {

    let dur = '';
    const dur_sec = moment.duration(input, 's');
    switch (true) {
      case input === 0:
        dur = '0';
        break;
      case dur_sec.as('s') > 1 && dur_sec.as('s') < 60:
        dur = dur_sec.as('s').toFixed(2) + ' sec';
        break;
      case dur_sec.as('s') >= 60:
        let secs = dur_sec.as('s');
        const secondsInDay = 24 * 60 * 60;
        if (secs >= secondsInDay) {
          const days = Math.floor(secs / secondsInDay);
          dur = `${days} days, `;
          secs = secs % secondsInDay;
        }
        dur += numeral(secs).format('00:00:00');
        break;
      case dur_sec.as('ms') < 1:
        dur = (dur_sec.as('ms') * 1000).toFixed(2) + ' \µs';
        break;
      default:
        dur = dur_sec.as('ms').toFixed(2) + ' ms';
        break;
    }
    return dur;
  }

  transform(input: number, name: string): string {

    if (input === null) {
      return '0';
    }

    let res = '0';
    switch (true) {
      // "top 10"/profile queries no name parameters
      case name === undefined:
        res = this.parceTime(input);
        break;
      // time
      case name.indexOf('time') > -1:
        res = (input !== 0 && input < 0.00001) ? '<' : '';
        res += this.parceTime(input);
        break;
      // size
      case name.indexOf('size') > -1:
        if (input !== 0 && input < 0.01) {
          res = '<0.01 B';
        } else {
          res = numeral(input).format('0.00 b');
        }
        res = res.replace(/([\d]) B/, '$1 Bytes');
        break;
      // ops
      case name.indexOf('number') > -1:
        if (input !== 0 && input < 0.01) {
          res = '<0.01';
        } else {
          res = numeral(input).format('0.00a');
        }
        break;
      case name.indexOf('percent') > -1:
        if (input !== 0 && input < 0.0001) {
          res = '<0.01';
        } else {
          res = numeral(input).format('0.00%');
        }
        break;
      // ops
      default:
        if (input !== 0 && input < 0.01) {
          res = '<0.01';
        } else {
          res = numeral(input).format('0.00 a');
        }
        break;
    }
    return String(res).replace('<0.00', '<0.01');

  }
}
