export class AmazonRdsMysqlModel {
  address: string;
  custom_labels?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  node_id: string;
  port: number;
  service_id: string;
  service_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.address = params.address || '';
    if (params.custom_labels) {
      this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    }
    this.node_id = params.node_id || '';
    this.port = params.port || '';
    this.service_id = params.service_id || '';
    this.service_name = params.service_name || '';
  }
}
