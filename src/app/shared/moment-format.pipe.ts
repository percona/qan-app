import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class MomentFormatPipe implements PipeTransform {

  timezone = 'browser';
  constructor () {
    this.timezone = this.getCookie('timezone') || 'browser';
  }

  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      /* istanbul ignore next */
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  transform(value: any, format = 'YYYY-MM-DD HH:mm:ss'): string {
    if (value === null) {
      return null;
    }

    if (this.timezone === 'browser') {
      return moment(value).local().format(format);
    } else {
      return moment(value).format(format);
    }
  }
}
