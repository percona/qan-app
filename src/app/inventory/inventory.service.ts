import {Injectable} from '@angular/core';

export class AmazonRDSMySQL {
  constructor(public address = '',
              public node_id = '',
              public port = 0,
              public service_name = ''
  ) {
  }
}

export class MySQLService {
  constructor(public address = '',
              public node_id = '',
              public port = 0,
              public service_name = ''
  ) {
  }
}

export class MongoDBService {
  constructor(public node_id = '',
              public service_name = ''
  ) {
  }
}

export class ExternalExporter {
  constructor(public metrics_url = '') {
  }
}

export class MongoExporter {
  constructor(public service_id = '', public runs_on_node_id = '', public connection_string = '') {
  }
}

export class MySQLExporter {
  constructor(public password = '', public runs_on_node_id = '', public service_id = '', public username = '') {
  }
}

export class NodeExporter {
  constructor(public node_id = '') {
  }
}

export class PmmAgent {
  constructor(public node_id = '') {
  }
}

export class AddRDSExporter {
  constructor(public runs_on_node_id = '') {
  }
}

export class Container {
  constructor(public docker_container_id = '',
              public docker_container_name = '',
              public machine_id = '',
              public node_name = '') {
  }
}

export class Generic {
  constructor(public address = '',
              public distro = '',
              public distro_version = '',
              public node_name = '',
              public machine_id = '') {
  }
}

export class Remote {
  constructor(public node_name = '') {
  }
}

export class RemoteAmazonRDS {
  constructor(public instance = '',
              public node_name = '',
              public region = '') {
  }
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() {

  }
}
