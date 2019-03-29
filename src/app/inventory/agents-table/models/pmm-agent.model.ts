export class PmmAgentModel {
  agent_id: string;
  connected: boolean;
  custom_labels: Array<string>;
  runs_on_node_id: string;
  agentType: string;
  isDeleted: boolean;
  constructor(params, type) {
    this.agent_id = params.agent_id || '';
    this.connected = params.connected || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ? Object.values(params.custom_labels) : [];
    this.runs_on_node_id = params.runs_on_node_id || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}

