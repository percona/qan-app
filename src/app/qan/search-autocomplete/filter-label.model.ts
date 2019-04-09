export class FilterLabelModel {
  key: string;
  value: string[];

  constructor(key, values) {
    this.key = key;
    this.value = values.map(value => value.state ? value.value : '').filter(item => item);
  }
}
