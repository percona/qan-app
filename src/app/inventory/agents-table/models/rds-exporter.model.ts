import { CustomLabelsModel } from '../../custom-labels.model';

export class RdsExporterModel {
  agent_id: string;
  custom_labels: Array<CustomLabelsModel>;
  disabled: boolean | string;
  listen_port: number;
  pmm_agent_id: string;
  service_ids: Array<string>;
  status: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agent_id = params.agent_id || '';
    this.custom_labels = params.custom_labels && Object.keys(params.custom_labels).length ?
      Object.entries(params.custom_labels).map(item => new CustomLabelsModel(item)) : [];
    this.disabled = params.disabled || '';
    this.listen_port = params.listen_port || '';
    this.pmm_agent_id = params.pmm_agent_id || '';
    this.service_ids = params.service_ids && params.service_ids.length ? params.service_ids : [];
    this.status = params.status || '';
    this.agentType = type;
    this.isDeleted = false;
  }
}

