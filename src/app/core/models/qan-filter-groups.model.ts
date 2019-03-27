import { QanFilterModel } from './qan-fliter.model';

export class QanFilterGroupsModel {
  name: string;
  values: Array<{}>;

  constructor(params: any = {}, savedConfigs: any = { values: [] }) {
    const configs = savedConfigs ? JSON.parse(savedConfigs) : { values: [] };
    this.name = params['name'];
    this.values = params['parameters'].map(param => new QanFilterModel(configs.values, this.name, param));
  }
}
