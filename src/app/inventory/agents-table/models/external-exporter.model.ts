export class ExternalExporterModel {
  agent_id: string;
  custom_labels: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  metrics_url: string;
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
    this.metrics_url = params.metrics_url || '';
  }
}
