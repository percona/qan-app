export class RemoteAmazonRdsModel {
  custom_labels: Array<string>;
  instance: string;
  node_id: string;
  node_name: string;
  region: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ? Object.values(params.custom_labels) : [];
    this.instance = params.instance || '';
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
    this.region = params.region || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}
