export class FilterModel {
  value: string;
  count: string;
  state: boolean;

  constructor(item) {
    const { value, count } = item;
    this.value = value || 'unknown';
    this.count = count || '';
    this.state = false;
  }
}
