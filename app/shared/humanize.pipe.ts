import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as numeral from 'numeral';


/**
   * @desc humanize time duration
   * @example <div>{{ duration | humanize }}</div>
   */
@Pipe({ name: 'humanize' })
export class HumanizePipe implements PipeTransform {

    parceTime(input) {
        var dur: string = '';
        var dur_sec = moment.duration(input, 's');
        switch (true) {
            case input === 0:
                dur = '0';
                break;
            case dur_sec.as('s') > 1:
                dur = dur_sec.as('s').toFixed(2) + ' sec';
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

    transform(input: number, name: string, duration: string): string {

        var res: string = '0';
        var n = 0;
        switch (true) {
            // top 10 queries no name parameters
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
                res = (input !== 0 && input < 0.01) ? '<' : '';
                res += numeral(input).format('0.00 b');
                res = res.replace(/([\d]) B/, '$1 Bytes');
                break;
            // ops
            case name.indexOf('number') > -1:
                res = (input !== 0 && input < 0.01) ? '<' : '';
                res += numeral(input).format('0.00 a');
                break;
            case name.indexOf('percent') > -1:
                res = (input !== 0 && input < 0.0001) ? '<' : '';
                res += numeral(input).format('0.00%');
                break;
            // ops
            default:
                res = (input !== 0 && input < 0.01) ? '<' : '';
                res += numeral(input).format('0.00 a');
                break;
        }
        return String(res).replace('<0.00', '<0.01');
    }
}