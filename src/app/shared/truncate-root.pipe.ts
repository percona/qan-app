import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncateRoot' })
export class TruncateRootPipe implements PipeTransform {
  transform(input: string, len: number): string {
    if (input === null) {
      return null;
    }
    if (input.length > len && len > 4) {
      let res = '';
      if (len % 2 === 0) {
        const half = len / 2;
        res = input.substring(0, half - 1);
        res += '...';
        res += input.substring(input.length - half + 2, input.length);
      } else {
        const half = Math.floor(len / 2);
        res = input.substring(0, half - 1);
        res += '...';
        res += input.substring(input.length - half + 1, input.length);
      }
      return res;
    } else {
      return input;
    }
  }
}
