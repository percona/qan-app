export class FilterModel {
  value: string;
  main_metric_percent?: string;
  state: boolean;

  constructor(item) {
    if (typeof (item) === 'object') {
      const { value, main_metric_percent } = item;
      this.value = value || 'unknown';
      this.main_metric_percent = this.percentFromNumber(1, main_metric_percent) || '';
    } else {
      this.value = item
    }
    this.state = false;
  }

  percentFromNumber(total, current) {
    return current
    // return ((+current / +total) * 100).toFixed(2)
  }

}
