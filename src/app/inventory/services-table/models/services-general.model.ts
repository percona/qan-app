export class ServicesGeneralModel {
  address: string;
  custom_labels: Array<string>;
  node_id: string;
  port: number;
  service_id: string;
  service_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.address = params.address || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ? Object.values(params.custom_labels) : [];
    this.node_id = params.node_id || '';
    this.port = params.port || '';
    this.service_id = params.service_id || '';
    this.service_name = params.service_name || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}