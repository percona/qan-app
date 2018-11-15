import { Component, OnInit } from '@angular/core';
import { RDSCredentials, MySQLCredentials, RDSInstance, RDSNode, AddAmazonRDSService } from './add-amazon-rds.service'
import { environment } from '../environment';

@Component({
  selector: 'app-add-aws',
  templateUrl: './add-amazon-rds.component.html',
  styleUrls: ['./add-amazon-rds.component.scss']
})
export class AddAmazonRDSComponent implements OnInit {

  rdsCredentials = new RDSCredentials();
  mysqlCredentials = new MySQLCredentials();
  rdsNode = {} as RDSNode;
  allRDSInstances: RDSInstance[] = [];
  registeredRDSInstances: RDSInstance[] = [];
  registeredNames: string[] = [];
  isLoading: boolean;
  errorMessage: string;
  isDemo = false;
  submitted = false;

  constructor(public AddAmazonRDSService: AddAmazonRDSService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    this.submitted = true;
    try {
      this.allRDSInstances = await this.AddAmazonRDSService.discover(this.rdsCredentials);
      await this.getRegistered();
      this.errorMessage = '';
    } catch (err) {
      this.allRDSInstances = [];
      let msg = err.json().error;
      if (msg.startsWith('NoCredentialProviders')) {
        msg = 'Cannot discover instances - please provide Amazon RDS access credentials';
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
    try {
      const res = await this.AddAmazonRDSService.enable(this.rdsCredentials, this.rdsNode, this.mysqlCredentials);
    } catch (err) {
      this.errorMessage = err.json().error;
      return;
    }
    this.rdsNode = {} as RDSNode;
    this.cancel();
    await this.getRegistered();
  }

  async disableInstanceMonitoring(node: RDSNode) {
    if (this.isDemo) {
      return false;
    }
    this.errorMessage = '';
    const text = `Are you sure want to disable monitoring of '${node.name}:${node.region}' node?`;
    if (confirm(text)) {
      try {
        const res = await this.AddAmazonRDSService.disable(node);
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
      this.registeredRDSInstances = await this.AddAmazonRDSService.getRegistered();
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
      const allRDSInstances = await this.AddAmazonRDSService.discover(this.rdsCredentials);
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
        msg = 'Cannot automatically discover instances - please provide Amazon RDS access credentials';
      }
      this.errorMessage = msg;
    }
  }
}
