import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../../../../../profile/qan-profile.service';
import { interval } from 'rxjs/internal/observable/interval';
import { ActionsService } from '../../../../../../pmm-api-services/services/actions.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable as __Observable } from 'rxjs';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.css']
})
export class TableCreateComponent implements OnInit, OnDestroy {
  @Input() tableName: string;
  @Input() globalConfig: any;

  private table$: Subscription;

  public createTableOutput: any;
  public createTableError = '';
  public isError = false;
  public unsubscribe = false;

  constructor(
    private actionsService: ActionsService,
    protected qanProfileService: QanProfileService,
  ) {
  }

  ngOnInit() {
    this.startShowCreateTable(this.globalConfig, this.tableName);
  }

  ngOnDestroy() {
    if (this.table$) {
      this.table$.unsubscribe();
    }
  }

  private startShowCreateTable(value, tableName) {
    let startAction: __Observable<{ action_id?: string, pmm_agent_id?: string }>;
    switch (value.service_type) {
      case 'mysql':
        startAction = this.actionsService.StartMySQLShowCreateTableAction({
          service_id: value.service_id,
          database: value.schema,
          table_name: tableName
        }
        );
        break;
      case 'postgresql':
        startAction = this.actionsService.StartPostgreSQLShowCreateTableAction({
          service_id: value.service_id,
          database: value.schema,
          table_name: tableName
        }
        );
        break;
      default:
        return
    }
    this.table$ = startAction.pipe(
      catchError(error => {
        error.error.done = true;
        return of(error.error)
      }),
      switchMap((item) => !item.error ? this.getActionResult(item) : of(item))
    ).subscribe(res => {
      if (res.done) {
        if (!res.error) {
          this.createTableError = '';
          this.isError = false;
          this.createTableOutput = res.output;
        } else {
          this.createTableError = res.error;
          this.isError = true;
        }
        this.table$.unsubscribe();
      }
    });
  }

  private getActionResult(item) {
    return interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.actionsService.GetAction({ action_id: item.action_id }))
      );
  }

}
