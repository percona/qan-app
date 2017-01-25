import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncateRoot' })
export class TruncateRootPipe implements PipeTransform {
    transform(input: string, len: number): string {
        if (input.length > len && len > 4) {
            let res = '';
            if (len % 2 === 0) {
                var half = len / 2;
                res = input.substring(0, half - 1);
                res += "...";
                res += input.substring(input.length - half + 2, input.length);
            } else {
                var half = Math.floor(len / 2);
                res = input.substring(0, half - 1);
                res += "...";
                res += input.substring(input.length - half + 1, input.length);
            }
            return res;
        } else {
            return input;
        }
    }
}
