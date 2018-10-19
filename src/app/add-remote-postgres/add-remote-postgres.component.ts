import { Component, OnInit } from '@angular/core';
import {
  AddRemotePostgresService,
  PostgreSQLCredentials,
  PostgreSQLInstance,
} from './add-remote-postgres.service'
import { environment } from '../environment';

@Component({
  selector: 'app-add-remote-postgres',
  templateUrl: './add-remote-postgres.component.html',
  styleUrls: ['./add-remote-postgres.component.scss']
})
export class AddRemotePostgresComponent implements OnInit {

  postgresCredentials = {} as PostgreSQLCredentials;
  postgreSQLInstance = {} as PostgreSQLInstance;
  isLoading: boolean;
  errorMessage: string;
  isDemo = false;
  submitted = false;

  constructor(public addRemotePostgresService: AddRemotePostgresService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    this.submitted = true;

    try {
      const res = await this.addRemotePostgresService.enable(this.postgresCredentials);
      // TODO: do something
    } catch (err) {
      this.errorMessage = err.json().error;
      return;
    } finally {
      this.postgreSQLInstance = {} as PostgreSQLInstance;
      this.isLoading = false;
    }
  }

  async ngOnInit() {
    this.errorMessage = '';
  }
}
