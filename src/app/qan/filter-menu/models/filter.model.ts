export class FilterModel {
  value: string;
  count?: string;
  state: boolean;

  constructor(item) {
    if (typeof (item) === 'object') {
      const { value, count } = item;
      this.value = value || 'unknown';
      this.count = count || '';
    } else {
      this.value = item
    }
    this.state = false;
  }
}
