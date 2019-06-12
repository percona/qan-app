import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../../../../../profile/qan-profile.service';
import { interval } from 'rxjs/internal/observable/interval';
import { ActionsService } from '../../../../../../pmm-api-services/services/actions.service';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.css']
})
export class TableCreateComponent implements OnInit, OnDestroy {
  @Input('tableName') table: string;
  @Input('globalConfig') config: any;

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
    this.startShowCreateTable(this.config, this.table);
  }

  ngOnDestroy() {
    if (this.table$) {
      this.table$.unsubscribe();
    }
  }

  private startShowCreateTable(value, tableName) {
    this.table$ = this.actionsService.StartMySQLShowCreateTableAction({
      service_id: value.service_id,
      database: value.schema,
      table_name: tableName
    }
    ).pipe(
      switchMap((item) => this.getActionResult(item)),
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
