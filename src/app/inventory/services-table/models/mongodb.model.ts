export class MongodbModel {
  address: string;
  custom_labels?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  node_id: string;
  service_id: string;
  service_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    if (params.custom_labels) {
      this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    }
    this.address = params.address || '';
    this.node_id = params.node_id || '';
    this.service_id = params.service_id || '';
    this.service_name = params.service_name || '';
  }
}
