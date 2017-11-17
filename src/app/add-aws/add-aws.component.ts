import { Component, OnInit } from '@angular/core';
import { RDSCredentials, MySQLCredentials, RDSInstance, RDSNode, AddAwsService} from './add-aws.service'

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


  constructor(public addAwsService: AddAwsService) { }

  async onSubmit() {
    this.isLoading = true;
    try {
      this.allRDSInstances = await this.addAwsService.discover(this.rdsCredentials);
    } catch (err) {
      console.log('error', err);
    } finally {
      this.isLoading = false;
    }
  }

  enableInstanceMonitoring (node: RDSNode) {
    this.rdsNode = {name: node.name, region: node.region} as RDSNode;
  }

  showConnect (node: RDSNode): boolean {
    return this.rdsNode.name === node.name && this.rdsNode.region === node.region;
  }

  cancel() {
    this.rdsNode.name = '';
    this.rdsNode.region = '';
  }

  async onConnect() {
    try {
      const res = await this.addAwsService.enable(this.rdsCredentials, this.rdsNode, this.mysqlCredentials);
    } catch (err) {
      console.log('cannot connect')
    }
    this.cancel();
    await this.getRegistered();
}

  async disableInstanceMonitoring (node: RDSNode) {
    const text = `Are you sure want to disable monitoring of '${node.name}:${node.region}' node?`;
    if (confirm(text)) {
      const res = await this.addAwsService.disable(node);
      await this.getRegistered();
    }
  }

  isEnabled(rdsInstance: RDSInstance): boolean {
    return this.registeredNames.indexOf(rdsInstance.node.name + ':' + rdsInstance.node.region) > -1;
  }

  async getRegistered() {
    this.registeredRDSInstances = await this.addAwsService.getRegistered();
    this.registeredNames = [];
    try {
      this.registeredRDSInstances.forEach(element => {
        this.registeredNames.push(element.node.name + ':' + element.node.region);
      });
    } catch (err) {
      console.log('No registered instances');
    }
  }

  async ngOnInit() {
    await this.getRegistered();
    this.allRDSInstances = await this.addAwsService.discover(this.rdsCredentials);
  }

}
