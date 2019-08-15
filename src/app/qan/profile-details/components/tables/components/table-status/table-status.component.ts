import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../../../../../profile/qan-profile.service';
import { interval } from 'rxjs/internal/observable/interval';
import { ActionsService } from '../../../../../../pmm-api-services/services/actions.service';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.css']
})
export class TableStatusComponent implements OnInit, OnDestroy {
  @Input() tableName: string;
  @Input() globalConfig: any;


  private status$: Subscription;
  public showTableStatusOutput: string;
  public statusTableError = '';
  public isError = false;

  constructor(
    private actionsService: ActionsService,
    protected qanProfileService: QanProfileService,
  ) {
  }

  ngOnInit() {
    switch (this.globalConfig.service_type) {
      case 'mysql':
        this.startMySQLShowTableStatus(this.globalConfig, this.tableName);
        break;
      default:
        this.statusTableError = 'Not implemented yet.';
        this.isError = true;
        return
    }
  }

  ngOnDestroy() {
    if (this.status$) {
      this.status$.unsubscribe()
    }
  }

  private startMySQLShowTableStatus(value, tableName) {
    this.status$ = this.actionsService.StartMySQLShowTableStatusAction({
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
          this.statusTableError = '';
          this.isError = false;
          this.showTableStatusOutput = JSON.parse(res.output);
        } else {
          this.statusTableError = res.error;
          this.isError = true;
        }

        this.status$.unsubscribe();
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
