export class MysqlExporterModel {
  agent_id: string;
  custom_labels: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  listen_port: 0;
  password: string;
  runs_on_node_id: string;
  service_id: string;
  status: string;
  username: string;
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
    this.service_id = params.service_id || '';
    this.status = params.status || '';
  }
}

