import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.css']
})
export class QanTableHeaderCellComponent implements OnInit {

  @Input() currentColumnName: any;

  public columns: any;
  public listColumns: any;
  public queryColumns = {
    data: {
      bytes_sent: 'Bytes Sent',
      count: 'Count',
      docs_returned: 'Docs Returned',
      docs_scanned: 'Docs Scanned',
      filesort: 'Filesort',
      filesort_on_disk: 'Filesort on Disk',
      full_join: 'Full Join',
      full_scan: 'Full Scan',
      innodb_io_r_bytes: 'Innodb IO R Bytes',
      innodb_io_r_ops: 'Innodb IO R Ops',
      innodb_io_r_wait: 'Innodb IO R Wait',
      innodb_pages_distinct: 'Innodb Pages Distinct',
      innodb_queue_wait: 'Innodb Queue Wait',
      innodb_rec_lock_wait: 'Innodb Rec Lock Wait',
      latancy: 'Latancy',
      load: 'Load',
      lock_time: 'Lock Time',
      merge_passes: 'Merge Passes',
      no_good_index_used: 'No Good Index Used',
      no_index_used: 'No Index Used',
      qc_hit: 'Query Cache Hit',
      query_length: 'Query Length',
      query_time: 'Query Time',
      response_length: 'Response Length',
      rows_affected: 'Rows Affected',
      rows_examined: 'Rows Examined',
      rows_read: 'Rows Read',
      rows_sent: 'Rows Sent',
      select_full_range_join: 'Select Full Range Join',
      select_range: 'Select Range',
      select_range_check: 'Select Range Check',
      sort_range: 'Sort Range',
      sort_rows: 'Sort Rows',
      sort_scan: 'Sort Scan',
      tmp_disk_tables: 'Tmp Disk Tables',
      tmp_table: 'Tmp Table',
      tmp_table_on_disk: 'Tmp Table on Disk',
      tmp_table_sizes: 'Tmp Table Sizes',
      tmp_tables: 'Tmp Tables'
    }
  };
  public selectedQueryColumn: string;

  constructor() {
    this.listColumns = this.queryColumns.data;
    this.columns = Object.values(this.listColumns);
    // this.selectedQueryColumn = this.columns[0];
  }

  ngOnInit() {
    if (this.currentColumnName === Object.keys(this.listColumns)) {
      console.log('currentColumn, - ', this.listColumns[this.currentColumnName]);
    }
  }

}
