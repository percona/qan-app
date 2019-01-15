import {Injectable} from '@angular/core';

@Injectable()
export class FilterSearchService {

  constructor() {
  }

  findBySearch(where: string, what: string) {
    return this.transformForSearch(where).includes(this.transformForSearch(what));
  }

  transformForSearch(value: string) {
    return value.toLowerCase().replace(' ', '').trim();
  }
}
