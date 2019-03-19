export class ContainerModel {
  custom_labels: Array<string>;
  docker_container_id: string;
  docker_container_name: string;
  machine_id: string;
  node_id: string;
  node_name: string;
  agentType: string;
  isDeleted: boolean;

  constructor(params, type) {
    this.agentType = type;
    this.isDeleted = false;
    this.custom_labels = params.custom_labels && params.custom_labels.length ? Object.values(params.custom_labels) : [];
    this.docker_container_id = params.docker_container_id || '';
    this.docker_container_name = params.docker_container_name || '';
    this.machine_id = params.machine_id || '';
    this.node_id = params.node_id || '';
    this.node_name = params.node_name || '';
  }
}
