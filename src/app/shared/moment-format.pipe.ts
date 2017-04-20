import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class MomentFormatPipe implements PipeTransform {

  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }
  transform(value: any | moment.Moment, format = 'YYYY-MM-DD HH:mm:ss'): string {

    const timezone = this.getCookie('timezone') || 'local';
    if (timezone === 'local') {
      return value.local().format(format);
    } else {
      return value.format(format);
    }
  }
}
