export class MongoMysqlExporterModel {
  agent_id: string;
  custom_labels: Array<string>;
  disabled: boolean | string;
  listen_port: number;
  username: string;
  password: string;
  pmm_agent_id: string;
  service_id: string;
  status: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agent_id = params.agent_id || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ? Object.values(params.custom_labels) : [];
    this.disabled = params.disabled || '';
    this.listen_port = params.listen_port || '';
    this.username = params.username || '';
    this.password = params.password || '';
    this.pmm_agent_id = params.pmm_agent_id || '';
    this.service_id = params.service_id || '';
    this.status = params.status || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}

