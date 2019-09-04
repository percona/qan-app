import { Component, NgModule, OnInit } from '@angular/core';
import {
  AddMySQLCredentials,
  AddPostgreSQLCredentials,
  AddNodeParams,
  AddRemoteInstanceService,
  BaseCredentials,
  NodeRemote,
  AddMongoDBCredentials,
  AddProxySQLCredentials
} from './add-remote-instance.service'
import { environment } from '../environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

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
  errorMessage: string;
  isDemo = false;
  isLoading = false;
  isSubmitted = false;
  instanceType: string;
  currentUrl: string;
  customLabels: string;
  defaultPort = 3306;

  constructor(public addRemoteInstanceService: AddRemoteInstanceService,
    private router: Router
  ) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
    this.currentUrl = this.router.url;
  }

  async ngOnInit() {
    this.errorMessage = '';
    this.isLoading = false;
    switch (this.addRemoteInstanceService.checkInstanceType(this.currentUrl)) {
      case 'postgresql':
        this.instanceType = 'PostgreSQL';
        this.remoteInstanceCredentials = {} as AddPostgreSQLCredentials;
        this.defaultPort = 5432;
        break;
      case 'mysql':
        this.instanceType = 'MySQL';
        this.remoteInstanceCredentials = {} as AddMySQLCredentials;
        this.defaultPort = 3306;
        break;
      case 'mongodb':
        this.instanceType = 'MongoDB';
        this.remoteInstanceCredentials = {} as AddMongoDBCredentials;
        this.defaultPort = 27017;
        break;
      case 'proxysql':
        this.instanceType = 'ProxySQL';
        this.remoteInstanceCredentials = {} as AddProxySQLCredentials;
        this.defaultPort = 6032;
        break;
    }
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

    if (this.remoteInstanceCredentials.add_node === undefined) {
      this.remoteInstanceCredentials.add_node = {
        node_name: this.remoteInstanceCredentials.service_name,
        node_type: 'REMOTE_NODE'
      } as AddNodeParams;
    }

    if (this.remoteInstanceCredentials.port === undefined || this.remoteInstanceCredentials.port === 0) {
      this.remoteInstanceCredentials.port = this.defaultPort; // set default value for port
    }
    if (this.remoteInstanceCredentials.pmm_agent_id === undefined || this.remoteInstanceCredentials.pmm_agent_id === '') {
      this.remoteInstanceCredentials.pmm_agent_id = 'pmm-server'; // set default value for pmm agent id
    }

    if (this.customLabels !== undefined) {
      this.remoteInstanceCredentials.custom_labels = this.extractCustomLabels(this.customLabels);
    }

    const addObservable: Observable<Object> = this.addRemoteInstanceService.addService(this.remoteInstanceCredentials, this.currentUrl);
    addObservable.subscribe(value => {
      this.isLoading = false;
      window.parent.location.assign(newURL);
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
}
