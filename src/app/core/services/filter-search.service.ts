import {Injectable} from '@angular/core';

@Injectable()
export class FilterSearchService {

  constructor() {
  }

  /**
   * Search substring in string
   * @param where - string where need to search
   * @param what - search value
   * @return matches string
   */
  findBySearch(where: string, what: string) {
    return this.transformForSearch(where).includes(this.transformForSearch(what));
  }

  /**
   * Change current search value for relevant search
   * @param value
   */
  transformForSearch(value: string) {
    return value.toLowerCase().replace(/\s+/g, '');
  }
}
