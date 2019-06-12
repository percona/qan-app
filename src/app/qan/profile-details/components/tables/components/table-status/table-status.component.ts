import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../../../../../profile/qan-profile.service';
import { interval } from 'rxjs/internal/observable/interval';
import { ActionsService } from '../../../../../../pmm-api-services/services/actions.service';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.css']
})
export class TableStatusComponent implements OnInit, OnDestroy {
  @Input('tableName') table: string;
  @Input('globalConfig') config: any;


  private status$: Subscription;
  public showTableStatusOutput: string;
  public statusTableError = '';
  public isError = false;
  public isExplainLoading: boolean;

  constructor(
    private actionsService: ActionsService,
    protected qanProfileService: QanProfileService,
  ) {
  }

  ngOnInit() {
    this.startMySQLShowTableStatus(this.config, this.table);
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
      switchMap((item) => this.getActionResult(item)),
    ).subscribe(res => {
      if (res.done) {
        if (!res.error) {
          this.statusTableError = '';
          this.isError = false;
          this.showTableStatusOutput = res.output;
        } else {
          this.statusTableError = res.error;
          this.isError = true;
        }

        this.status$.unsubscribe();
        this.isExplainLoading = false;
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
