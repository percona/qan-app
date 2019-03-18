export class QanMysqlPerfschemaAgentModel {
  agent_id: string;
  custom_labels: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  password: string;
  pmm_agent_id: string;
  service_id: string;
  status: string;
  username: string;
  agentType: string;
  isDeleted: boolean;
  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.agent_id = params.agent_id || '';
    if (params.custom_labels) {
      this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    }
    this.password = params.password || '';
    this.pmm_agent_id = params.pmm_agent_id || '';
    this.service_id = params.service_id || '';
    this.username = params.username || '';
  }
}

