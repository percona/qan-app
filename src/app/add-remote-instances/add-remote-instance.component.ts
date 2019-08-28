import { Component, NgModule, OnInit } from '@angular/core';
import {
  AddMySQLCredentials,
  AddNode,
  AddRemoteInstanceService,
  BaseCredentials,
  NodeRemote,
  NodeType
} from './add-remote-instance.service'
import { environment } from '../environment';
import { Router } from '@angular/router';
import { MySQLService } from '../pmm-api-services/services/my-sql.service';
import { Observable } from 'rxjs';
import { NodesService } from '../pmm-api-services/services/nodes.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { split } from 'ts-node';

@NgModule({
  imports: [NgSelectModule]
})

@Component({
  selector: 'app-add-remote-instance',
  templateUrl: './add-remote-instance.component.html',
  styleUrls: ['./add-remote-instance.component.scss']
})
export class AddRemoteInstanceComponent implements OnInit {

  remoteInstanceCredentials = {} as BaseCredentials;
  nodes = Array<NodeRemote>();
  nodeTypes = Array<NodeType>();
  errorMessage: string;
  isDemo = false;
  isLoading = false;
  isSubmitted = false;
  instanceType: string;
  currentUrl: string;
  showAddNodePanel = false;
  customLabels: string;
  nodeCustomLabels: string;

  constructor(public addRemoteInstanceService: AddRemoteInstanceService,
              private router: Router,
              private mySQLService: MySQLService,
              private nodesService: NodesService
  ) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
    this.currentUrl = this.router.url;
    this.nodeTypes = Array<NodeType>(
      new NodeType('GENERIC_NODE', 'Generic Node'),
      new NodeType('CONTAINER_NODE', 'Container Node'),
      new NodeType('REMOTE_NODE', 'Remote Node'),
      new NodeType('REMOTE_AMAZON_RDS_NODE', 'Remote Amazon RDS Node'),
    )
  }

  async ngOnInit() {
    this.errorMessage = '';
    this.isLoading = false;
    switch (this.addRemoteInstanceService.checkInstanceType(this.currentUrl)) {
      case 'postgresql':
        this.instanceType = 'PostgreSQL';
        break;
      case 'mysql':
        this.instanceType = 'MySQL';
        this.remoteInstanceCredentials = {} as AddMySQLCredentials;
        break;
    }

    this.nodesService.ListNodes({}).subscribe(value => {
      this.nodes = Array<NodeRemote>();
      if (value.remote !== undefined) {
        value.remote.forEach(remoteNode => {
          this.nodes.push(remoteNode)
        })
      }
      if (value.generic !== undefined) {
        value.generic.forEach(remoteNode => {
          this.nodes.push(remoteNode)
        })
      }
      if (value.container !== undefined) {
        value.container.forEach(remoteNode => {
          this.nodes.push(remoteNode)
        })
      }
    })
  }

  async onSubmit(form) {
    const currentUrl = `${window.parent.location}`;
    const newURL = currentUrl.split('/graph/d/').shift() + '/graph/d/pmm-inventory/';

    this.errorMessage = '';
    this.isSubmitted = true;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    if (this.remoteInstanceCredentials.service_name === undefined || this.remoteInstanceCredentials.service_name === '') {
      this.remoteInstanceCredentials.service_name = this.remoteInstanceCredentials.address; // set default value for name (like address)
    }

    if (this.remoteInstanceCredentials.port === undefined || this.remoteInstanceCredentials.port === 0) {
      this.remoteInstanceCredentials.port = this.instanceType === 'PostgreSQL' ? 5432 : 3306; // set default value for port
    }
    if (this.remoteInstanceCredentials.pmm_agent_id === undefined || this.remoteInstanceCredentials.pmm_agent_id === '') {
      this.remoteInstanceCredentials.pmm_agent_id = 'pmm-server'; // set default value for pmm agent id
    }

    if (this.customLabels !== undefined) {
      this.remoteInstanceCredentials.custom_labels = this.extractCustomLabels(this.customLabels);
    }

    if (this.remoteInstanceCredentials.add_node !== undefined && this.nodeCustomLabels !== undefined) {
      this.remoteInstanceCredentials.add_node.custom_labels = this.extractCustomLabels(this.nodeCustomLabels);
    }

    let addObservable: Observable<Object>;
    switch (this.instanceType) {
      case 'MySQL':
        addObservable = this.mySQLService.AddMySQL(this.remoteInstanceCredentials);
    }
    addObservable.subscribe(value => {
      window.parent.location.assign(newURL);
      this.isLoading = false;
    }, err => {
      this.errorMessage = err.error.error;
      this.isLoading = false;
    })
  }

  private extractCustomLabels(rawCustomLabels) {
    const labels = {} as { [key: string]: string };
    const labelPairs = rawCustomLabels.split('\n');
    labelPairs.map(pair => {
      const [key, value] = pair.split(':');
      labels[key] = value
    });
    return labels;
  }

  async enableAddNodeForm() {
    this.showAddNodePanel = true;
    this.remoteInstanceCredentials.node_id = null;
    this.remoteInstanceCredentials.add_node = {} as AddNode
  }

  onChangeNode(node) {
    this.remoteInstanceCredentials.node_id = node.node_id;
  }

  onChangeNodeType(nodeType) {
    this.remoteInstanceCredentials.add_node.node_type = nodeType.value;
    console.log(nodeType)
  }
}
