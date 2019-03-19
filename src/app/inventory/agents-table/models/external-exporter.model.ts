export class ExternalExporterModel {
  agent_id: string;
  custom_labels: Array<string>;
  metrics_url: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.agent_id = params.agent_id || '';
    this.custom_labels = params.custom_labels && params.custom_labels.length ? Object.values(params.custom_labels) : [];
    this.metrics_url = params.metrics_url || '';
  }
}
