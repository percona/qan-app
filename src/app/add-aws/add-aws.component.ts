import {Component, OnInit} from '@angular/core';
import {AddAwsService, MySQLCredentials, RDSCredentials, RDSInstance, RDSNode} from './add-aws.service'
import {environment} from '../environment';

@Component({
  selector: 'app-add-aws',
  templateUrl: './add-aws.component.html',
  styleUrls: ['./add-aws.component.scss']
})
export class AddAwsComponent implements OnInit {

  rdsCredentials = new RDSCredentials();
  mysqlCredentials = new MySQLCredentials();
  rdsNode = {} as RDSNode;
  allRDSInstances: RDSInstance[] = [];
  registeredRDSInstances: RDSInstance[] = [];
  registeredNames: string[] = [];
  isLoading: boolean;
  isConnectLoading: boolean;
  isDisabling: boolean;
  currentInputId: string;
  errorMessage: string;
  isDemo = false;
  submitted = false;

  constructor(public addAwsService: AddAwsService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async ngOnInit() {
    this.errorMessage = '';
    try {
      const allRDSInstances = await this.addAwsService.discover(this.rdsCredentials);
      if (this.submitted) { // ignore results if user submitted form with creds.
        return;
      }
      await this.getRegistered();
      this.allRDSInstances = allRDSInstances;
      this.errorMessage = '';

    } catch (err) {
      if (this.submitted) { // ignore results if user submitted form with creds.
        return;
      }
      let msg = err.json().error;
      if (msg.startsWith('NoCredentialProviders')) {
        msg = 'Cannot automatically discover instances - please provide AWS access credentials';
      }
      this.errorMessage = msg;
    }
  }

  onCheckboxChange(node, instance, input) {
    const isEnable = this.isEnabled(instance);
    this.currentInputId = input.id;
    return isEnable ? this.disableInstanceMonitoring(node) : this.enableInstanceMonitoring(node);
  }

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    this.submitted = true;
    try {
      this.allRDSInstances = await this.addAwsService.discover(this.rdsCredentials);
      await this.getRegistered();
      this.errorMessage = '';
    } catch (err) {
      this.allRDSInstances = [];
      let msg = err.json().error;
      if (msg.startsWith('NoCredentialProviders')) {
        msg = 'Cannot discover instances - please provide AWS access credentials';
      }
      this.errorMessage = msg;
    } finally {
      this.isLoading = false;
    }
  }

  enableInstanceMonitoring(node: RDSNode) {
    this.mysqlCredentials = new MySQLCredentials();
    this.rdsNode = { name: node.name, region: node.region } as RDSNode;
  }

  showConnect(node: RDSNode): boolean {
    return this.rdsNode.name === node.name && this.rdsNode.region === node.region;
  }

  cancel() {
    this.rdsNode.name = '';
    this.rdsNode.region = '';
  }

  async onConnect() {
    this.errorMessage = '';
    this.isConnectLoading = true;
    try {
      const res = await this.addAwsService.enable(this.rdsCredentials, this.rdsNode, this.mysqlCredentials);
    } catch (err) {
      this.isConnectLoading = false;
      this.errorMessage = err.json().error;
      return;
    }
    this.rdsNode = {} as RDSNode;
    this.cancel();
    this.isConnectLoading = false;
    await this.getRegistered();
  }

  async disableInstanceMonitoring(node: RDSNode) {
    if (this.isDemo) {
      return false;
    }
    this.errorMessage = '';
    this.isDisabling = true;
    const text = `Are you sure want to disable monitoring of '${node.name}:${node.region}' node?`;
    if (confirm(text)) {
      try {
        const res = await this.addAwsService.disable(node);
        await this.getRegistered();
      } catch (err) {
        this.errorMessage = err.json().error;
      }
    }
    this.isDisabling = false;
  }

  isEnabled(rdsInstance: RDSInstance): boolean {
    return this.registeredNames.indexOf(rdsInstance.node.name + ':' + rdsInstance.node.region) > -1;
  }

  async getRegistered() {
    this.errorMessage = '';
    try {
      this.registeredRDSInstances = await this.addAwsService.getRegistered();
    } catch (err) {
      this.errorMessage = err.json().error;
    }
    this.registeredNames = [];
    if (this.registeredRDSInstances !== undefined) {
      this.registeredRDSInstances.forEach(element => {
        this.registeredNames.push(element.node.name + ':' + element.node.region);
      });
    }
  }
}
