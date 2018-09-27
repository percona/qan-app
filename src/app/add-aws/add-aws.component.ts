import {Component, OnInit} from '@angular/core';
import {RDSCredentials, MySQLCredentials, RDSInstance, RDSNode, AddAwsService} from './add-aws.service'
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

      this.checkErrorMessage(err);
    }
  }

  checkErrorMessage(err) {
    const msg = this.isJsonError(err) ? err.json().error : 'Bad response';
    this.errorMessage = msg.startsWith('NoCredentialProviders') ?
      'Cannot automatically discover instances - please provide AWS access credentials' : msg;
    return this.errorMessage;
  }

  isJsonError(err) {
    try {
      return err.json().error;
    } catch {
      return false;
    }
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
      this.checkErrorMessage(err);
    } finally {
      this.isLoading = false;
    }
  }

  enableInstanceMonitoring(node: RDSNode) {
    this.mysqlCredentials = new MySQLCredentials();
    this.rdsNode = {name: node.name, region: node.region} as RDSNode;
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
      this.errorMessage = this.isJsonError(err) ? err.json().error : 'Bad response';
      return;
    }
    this.rdsNode = {} as RDSNode;
    this.cancel();
    await this.getRegistered();
  }

  /* istanbul ignore next */
  async disableInstanceMonitoring(node: RDSNode) {
    if (this.isDemo) {
      return false;
    }
    this.errorMessage = '';
    const text = `Are you sure want to disable monitoring of '${node.name}:${node.region}' node?`;
    if (confirm(text)) {
      try {
        const res = await this.addAwsService.disable(node);
        await this.getRegistered();
      } catch (err) {
        this.errorMessage = this.isJsonError(err) ? err.json().error : 'Bad response';
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
      this.errorMessage = this.isJsonError(err) ? err.json().error : 'Bad response';
    }
    this.registeredNames = [];
    if (this.registeredRDSInstances !== undefined) {
      this.registeredRDSInstances.forEach(element => {
        this.registeredNames.push(`${element.node.name}:${element.node.region}`);
      });
    }
  }
}
