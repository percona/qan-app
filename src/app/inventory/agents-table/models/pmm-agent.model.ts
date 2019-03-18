export class PmmAgentModel {
  agent_id: string;
  connected: boolean;
  custom_labels: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  runs_on_node_id: string;
  agentType: string;
  isDeleted: boolean;
  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.agent_id = params.agent_id || '';
    this.connected = params.connected || '';
    if (params.custom_labels) {
      this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    }
    this.runs_on_node_id = params.runs_on_node_id || '';
  }
}

