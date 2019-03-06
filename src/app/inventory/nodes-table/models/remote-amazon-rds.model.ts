export class RemoteAmazonRdsModel {
  custom_labels?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  instance: string;
  node_id: string;
  node_name: string;
  region: string;
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
    this.instance = params.instance || '';
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
    this.region = params.region || '';
  }
}
