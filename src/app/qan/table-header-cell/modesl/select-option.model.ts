export class SelectOptionModel {
  name: string;
  humanizeName: string;

  constructor(keyValue) {
    [this.name, this.humanizeName] = keyValue;
  }
}
