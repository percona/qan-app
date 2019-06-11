export interface DetailsMetricNames {
  tableMetricName: string,
  tooltipText: string
}

export class MetricModel {
  metricName: string;
  humanizeMetricName: string;
  tooltipText: string;
  stats: any;
  sparkline: any;

  constructor(metric: Array<any> = ['', {}], sparkline = []) {
    let tableMetricName, tooltipText;
    const [metricName, stats] = metric;

    ({ tableMetricName, tooltipText } = this.checkMetricName(metricName));

    this.metricName = metricName;
    this.humanizeMetricName = tableMetricName;
    this.tooltipText = tooltipText;
    this.stats = stats.stats || stats;
    this.sparkline = sparkline.some(sparklinePoint => sparklinePoint.pointValue) ? sparkline : [];
  }

  checkMetricName(name): DetailsMetricNames {
    switch (name) {
      case 'bytes_sent':
        return {
          tableMetricName: 'Bytes Sent',
          tooltipText: 'The number of bytes sent to all clients.'
        };
      case 'count':
        return {
          tableMetricName: 'Count',
          tooltipText: 'Count'
        };
      case 'docs_returned':
        return {
          tableMetricName: 'Docs returned',
          tooltipText: 'The number of returned documents.'
        };
      case 'docs_scanned':
        return {
          tableMetricName: 'Docs scanned',
          tooltipText: 'The number of scanned documents.'
        };
      case 'filesort':
        return {
          tableMetricName: 'Filesort',
          tooltipText: 'The query used a filesort.'
        };
      case 'filesort_on_disk':
        return {
          tableMetricName: 'Filesort on Disk',
          tooltipText: 'The filesort was performed on disk.'
        };
      case 'full_join':
        return {
          tableMetricName: 'Full Join',
          tooltipText: 'The query performed a full join (a join without indexes).'
        };
      case 'full_scan':
        return {
          tableMetricName: 'Full Scan',
          tooltipText: 'The query performed a full table scan.'
        };
      case 'innodb_io_r_bytes':
        return {
          tableMetricName: 'Innodb Read Bytes',
          tooltipText: 'Similar to innodb_IO_r_ops, but the unit is bytes.'
        };
      case 'innodb_io_r_ops':
        return {
          tableMetricName: 'Innodb IO Read Ops',
          tooltipText: 'Counts the number of page read operations scheduled.'
        };
      case 'innodb_io_r_wait':
        return {
          tableMetricName: 'Innodb IO Read Wait',
          tooltipText: 'Shows how long (in seconds) it took InnoDB to actually read the data from storage.'
        };
      case 'innodb_pages_distinct':
        return {
          tableMetricName: 'Innodb Pages Distinct',
          tooltipText: 'Counts approximately the number of unique pages the query accessed.'
        };
      case 'innodb_queue_wait':
        return {
          tableMetricName: 'Innodb Queue Wait',
          tooltipText:
            'Shows how long (in seconds) the query spent either waiting to enter the InnoDB queue or inside that queue waiting for ' +
            'execution.'
        };
      case 'innodb_rec_lock_wait':
        return {
          tableMetricName: 'Innodb Rec Lock Wait',
          tooltipText: 'Shows how long (in seconds) the query waited for row locks.'
        };
      case 'load':
        return {
          tableMetricName: 'Load',
          tooltipText: 'Load'
        };
      case 'lock_time':
        return {
          tableMetricName: 'Lock Time',
          tooltipText: 'The time to acquire locks in seconds.'
        };
      case 'merge_passes':
        return {
          tableMetricName: 'Merge Passes',
          tooltipText: 'The number of merge passes that the sort algorithm has had to do.'
        };
      case 'no_good_index_used':
        return {
          tableMetricName: 'No Good Index Used',
          tooltipText: 'The number of queries without good index.'
        };
      case 'no_index_used':
        return {
          tableMetricName: 'No index used',
          tooltipText: 'The number of queries without index.'
        };
      case 'qc_hit':
        return {
          tableMetricName: 'Query Cache Hit',
          tooltipText: 'Query Cache hits.'
        };
      case 'query_length':
        return {
          tableMetricName: 'Query Length',
          tooltipText: 'Shows how long the query is.'
        };
      case 'query_time':
        return {
          tableMetricName: 'Query Time',
          tooltipText: 'The statement execution time in seconds.'
        };
      case 'response_length':
        return {
          tableMetricName: 'Response Length',
          tooltipText: 'The response length of the query result in bytes.'
        };
      case 'rows_affected':
        return {
          tableMetricName: 'Rows Affected',
          tooltipText: 'Number of rows changed - UPDATE, DELETE, INSERT.'
        };
      case 'rows_examined':
        return {
          tableMetricName: 'Rows Examined',
          tooltipText: 'Number of rows scanned - SELECT.'
        };
      case 'rows_read':
        return {
          tableMetricName: 'Bytes Read',
          tooltipText: 'The number of rows read from tables.'
        };
      case 'rows_sent':
        return {
          tableMetricName: 'Rows Sent',
          tooltipText: 'The number of rows sent to the client.'
        };
      case 'select_full_range_join':
        return {
          tableMetricName: 'Select Full Range Join',
          tooltipText: 'The number of joins that used a range search on a reference table.'
        };
      case 'sort_range':
        return {
          tableMetricName: 'Sort Range',
          tooltipText: 'The number of sorts that were done using ranges.'
        };
      case 'select_range_check':
        return {
          tableMetricName: 'Select Range Check',
          tooltipText: 'The number of joins without keys that check for key usage after each row.'
        };
      case 'sort_rows':
        return {
          tableMetricName: 'Sort Rows',
          tooltipText: 'The number of sorted rows.'
        };
      case 'sort_scan':
        return {
          tableMetricName: 'Sort Scan',
          tooltipText: 'The number of sorts that were done by scanning the table.'
        };
      case 'tmp_disk_tables':
        return {
          tableMetricName: 'Tmp Disk Tables',
          tooltipText: 'Number of temporary tables created on disk for the query.'
        };
      case 'tmp_table':
        return {
          tableMetricName: 'Tmp Table',
          tooltipText: 'The query created an implicit internal temporary table.'
        };
      case 'tmp_table_on_disk':
        return {
          tableMetricName: 'Tmp Table on Disk',
          tooltipText: 'The querys temporary table was stored on disk.'
        };
      case 'tmp_table_sizes':
        return {
          tableMetricName: 'Tmp Table Sizes',
          tooltipText: 'Total Size in bytes for all temporary tables used in the query.'
        };
      case 'tmp_tables':
        return {
          tableMetricName: 'Tmp Tables',
          tooltipText: 'Number of temporary tables created on memory for the query.'
        };
      default:
        return {
          tableMetricName: name,
          tooltipText: ''
        };
    }
  }
}
