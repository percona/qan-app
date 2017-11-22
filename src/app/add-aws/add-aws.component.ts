import { Component, OnInit } from '@angular/core';
import { RDSCredentials, MySQLCredentials, RDSInstance, RDSNode, AddAwsService } from './add-aws.service'

@Component({
  selector: 'app-add-aws',
  templateUrl: './add-aws.component.html',
  styleUrls: ['./add-aws.component.scss']
})
export class AddAwsComponent implements OnInit {

  rdsCredentials = new RDSCredentials();
  mysqlCredentials = new MySQLCredentials();
  rdsNode = {} as RDSNode;
  allRDSInstances: RDSInstance[];
  registeredRDSInstances: RDSInstance[];
  registeredNames: string[];
  isLoading: boolean;
  errorMessage: string;


  constructor(public addAwsService: AddAwsService) { }

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    try {
      this.allRDSInstances = await this.addAwsService.discover(this.rdsCredentials);
      this.errorMessage = '';
    } catch (err) {
      this.allRDSInstances = [];
      let msg = err.json().error;
      if (msg.startsWith('NoCredentialProviders')) {
        msg = 'Cannot automatically discover instances - please provide AWS access credentials';
      }
      this.errorMessage = msg;
    } finally {
      this.isLoading = false;
    }
  }

  enableInstanceMonitoring(node: RDSNode) {
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
    try {
      const res = await this.addAwsService.enable(this.rdsCredentials, this.rdsNode, this.mysqlCredentials);
    } catch (err) {
      this.errorMessage = err.json().error;
      return;
    }
    this.mysqlCredentials = new MySQLCredentials();
    this.rdsNode = {} as RDSNode;
    this.cancel();
    await this.getRegistered();
  }

  async disableInstanceMonitoring(node: RDSNode) {
    this.errorMessage = '';
    const text = `Are you sure want to disable monitoring of '${node.name}:${node.region}' node?`;
    if (confirm(text)) {
      try {
        const res = await this.addAwsService.disable(node);
        await this.getRegistered();
      } catch (err) {
        this.errorMessage = err.json().error;
      }
    }
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

  async ngOnInit() {
    this.errorMessage = '';
    try {
      await this.getRegistered();
      this.allRDSInstances = await this.addAwsService.discover(this.rdsCredentials);
      this.errorMessage = '';
    } catch (err) {
      let msg = err.json().error;
      if (msg.startsWith('NoCredentialProviders')) {
        msg = 'Cannot automatically discover instances - please provide AWS access credentials';
      }
      this.errorMessage = msg;
    }
  }
}
