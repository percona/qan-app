export class GenericModel {
  custom_labels?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string
  };
  distro: string;
  distro_version: string;
  machine_id: string;
  node_id: string;
  node_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    if (params.custom_labels) {
      this.custom_labels.additionalProp1 = params.custom_labels.additionalProp1 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
      this.custom_labels.additionalProp2 = params.custom_labels.additionalProp3 || '';
    }
    this.distro = params.distro || '';
    this.distro_version = params.distro_version || '';
    this.machine_id = params.machine_id || '';
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
  }
}
