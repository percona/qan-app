import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class MomentFormatPipe implements PipeTransform {

  timezone = 'browser';
  constructor () {
    this.timezone = this.getCookie('timezone') || 'browser';
  }

  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  transform(value: any, format = 'YYYY-MM-DD HH:mm:ss'): string {
    if (value === null) {
      return null;
    }

    if (this.timezone === 'browser') {
      return value.local().format(format);
    } else {
      return value.format(format);
    }
  }
}
