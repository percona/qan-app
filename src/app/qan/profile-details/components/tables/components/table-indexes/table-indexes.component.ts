import { Component, Input, OnInit } from '@angular/core';
import { ActionsService } from '../../../../../../pmm-api-services/services';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { interval, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-table-indexes',
  templateUrl: './table-indexes.component.html',
  styleUrls: ['./table-indexes.component.css']
})
export class TableIndexesComponent implements OnInit {
  @Input() tableName: string;
  @Input() globalConfig: any;

  private table$: Subscription;

  public tableDataOutput: any;
  public error = '';
  public isError = false;
  public unsubscribe = false;

  constructor(private actionsService: ActionsService) { }

  ngOnInit() {
    this.startMySQLShowIndexAction(this.globalConfig, this.tableName);
  }

  private startMySQLShowIndexAction(value, tableName) {
    this.table$ = this.actionsService.StartMySQLShowIndexAction({
      service_id: value.service_id,
      database: value.schema,
      table_name: tableName
    }
    ).pipe(
      catchError(error => {
        error.error.done = true;
        return of(error.error)
      }),
      switchMap((item) => !item.error ? this.getActionResult(item) : of(item))
    ).subscribe(res => {
      if (res.done) {
        if (!res.error) {
          this.error = '';
          this.isError = false;
          this.tableDataOutput = JSON.parse(res.output);
        } else {
          this.error = res.error;
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
