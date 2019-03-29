export class MysqlExporterModel {
  agent_id: string;
  custom_labels: Array<string>;
  disabled: boolean | string;
  listen_port: 0;
  password: string;
  pmm_agent_id: string;
  service_id: string;
  status: string;
  username: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agent_id = params.agent_id || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ? Object.values(params.custom_labels) : [];
    this.disabled = params.disabled || '';
    this.listen_port = params.listen_port || '';
    this.password = params.password || '';
    this.pmm_agent_id = params.runs_on_node_id || '';
    this.service_id = params.service_id || '';
    this.status = params.status || '';
    this.username = params.username || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}

