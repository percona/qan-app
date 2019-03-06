export class NodeExporterModel {
  agent_id: string;
  custom_labels: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  listen_port?: number;
  node_id: string;
  status: string;
  agentType: string;
  isDeleted: boolean;

  // "status": "AGENT_STATUS_INVALID"
  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.agent_id = params.agent_id || '';
    this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
    this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    this.listen_port = params.listen_port || '';
    this.node_id = params.node_id || '';
    this.status = params.status || '';
  }
}

