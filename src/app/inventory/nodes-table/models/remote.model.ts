export class RemoteModel {
  custom_labels: Array<string>;
  node_id: string;
  node_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.custom_labels = params.custom_labels && params.custom_labels.length ? Object.values(params.custom_labels) : [];
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
  }
}
