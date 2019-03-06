export class RdsExporterModel {
  agent_id: string;
  custom_labels: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  listen_port: number;
  runs_on_node_id: string;
  service_ids: Array<string>;
  status: string;
  agentType: string;
  isDeleted: boolean;

  // status: AGENT_STATUS_INVALID
  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.agent_id = params.agent_id || '';
    this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
    this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    this.listen_port = params.listen_port || '';
    this.runs_on_node_id = params.runs_on_node_id || '';
    this.service_ids = params.service_ids || [];
    this.status = params.status || '';
  }
}

