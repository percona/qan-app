/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class ObjectDetailsService extends __BaseService {
  static readonly GetLabelsPath = '/v0/qan/ObjectDetails/GetLabels';
  static readonly GetMetricsPath = '/v0/qan/ObjectDetails/GetMetrics';
  static readonly GetQueryExamplePath = '/v0/qan/ObjectDetails/GetQueryExample';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetLabelsResponse(body: {filter_by?: string, group_by?: string, period_start_from?: string, period_start_to?: string}): __Observable<__StrictHttpResponse<{labels?: {[key: string]: {values?: Array<string>}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/qan/ObjectDetails/GetLabels`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{labels?: {[key: string]: {values?: Array<string>}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetLabels(body: {filter_by?: string, group_by?: string, period_start_from?: string, period_start_to?: string}): __Observable<{labels?: {[key: string]: {values?: Array<string>}}}> {
    return this.GetLabelsResponse(body).pipe(
      __map(_r => _r.body as {labels?: {[key: string]: {values?: Array<string>}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetMetricsResponse(body: {filter_by?: string, group_by?: string, include_only_fields?: Array<string>, labels?: Array<{key?: string, value?: Array<string>}>, period_start_from?: string, period_start_to?: string}): __Observable<__StrictHttpResponse<{metrics?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}, sparkline?: Array<{load?: number, m_blk_read_time_sum_per_sec?: number, m_blk_write_time_sum_per_sec?: number, m_bytes_sent_sum_per_sec?: number, m_docs_returned_sum_per_sec?: number, m_docs_scanned_sum_per_sec?: number, m_filesort_on_disk_sum_per_sec?: number, m_filesort_sum_per_sec?: number, m_full_join_sum_per_sec?: number, m_full_scan_sum_per_sec?: number, m_innodb_io_r_bytes_sum_per_sec?: number, m_innodb_io_r_ops_sum_per_sec?: number, m_innodb_io_r_wait_sum_per_sec?: number, m_innodb_pages_distinct_sum_per_sec?: number, m_innodb_queue_wait_sum_per_sec?: number, m_innodb_rec_lock_wait_sum_per_sec?: number, m_local_blks_dirtied_sum_per_sec?: number, m_local_blks_hit_sum_per_sec?: number, m_local_blks_read_sum_per_sec?: number, m_local_blks_written_sum_per_sec?: number, m_lock_time_sum_per_sec?: number, m_merge_passes_sum_per_sec?: number, m_no_good_index_used_sum_per_sec?: number, m_no_index_used_sum_per_sec?: number, m_qc_hit_sum_per_sec?: number, m_query_length_sum_per_sec?: number, m_query_time_sum_per_sec?: number, m_response_length_sum_per_sec?: number, m_rows_affected_sum_per_sec?: number, m_rows_examined_sum_per_sec?: number, m_rows_read_sum_per_sec?: number, m_rows_sent_sum_per_sec?: number, m_select_full_range_join_sum_per_sec?: number, m_select_range_check_sum_per_sec?: number, m_select_range_sum_per_sec?: number, m_shared_blks_dirtied_sum_per_sec?: number, m_shared_blks_hit_sum_per_sec?: number, m_shared_blks_read_sum_per_sec?: number, m_shared_blks_written_sum_per_sec?: number, m_sort_range_sum_per_sec?: number, m_sort_rows_sum_per_sec?: number, m_sort_scan_sum_per_sec?: number, m_temp_blks_read_sum_per_sec?: number, m_temp_blks_written_sum_per_sec?: number, m_tmp_disk_tables_sum_per_sec?: number, m_tmp_table_on_disk_sum_per_sec?: number, m_tmp_table_sizes_sum_per_sec?: number, m_tmp_table_sum_per_sec?: number, m_tmp_tables_sum_per_sec?: number, num_queries_per_sec?: number, num_queries_with_errors_per_sec?: number, num_queries_with_warnings_per_sec?: number, point?: number, time_frame?: number, timestamp?: string}>, totals?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/qan/ObjectDetails/GetMetrics`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{metrics?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}, sparkline?: Array<{load?: number, m_blk_read_time_sum_per_sec?: number, m_blk_write_time_sum_per_sec?: number, m_bytes_sent_sum_per_sec?: number, m_docs_returned_sum_per_sec?: number, m_docs_scanned_sum_per_sec?: number, m_filesort_on_disk_sum_per_sec?: number, m_filesort_sum_per_sec?: number, m_full_join_sum_per_sec?: number, m_full_scan_sum_per_sec?: number, m_innodb_io_r_bytes_sum_per_sec?: number, m_innodb_io_r_ops_sum_per_sec?: number, m_innodb_io_r_wait_sum_per_sec?: number, m_innodb_pages_distinct_sum_per_sec?: number, m_innodb_queue_wait_sum_per_sec?: number, m_innodb_rec_lock_wait_sum_per_sec?: number, m_local_blks_dirtied_sum_per_sec?: number, m_local_blks_hit_sum_per_sec?: number, m_local_blks_read_sum_per_sec?: number, m_local_blks_written_sum_per_sec?: number, m_lock_time_sum_per_sec?: number, m_merge_passes_sum_per_sec?: number, m_no_good_index_used_sum_per_sec?: number, m_no_index_used_sum_per_sec?: number, m_qc_hit_sum_per_sec?: number, m_query_length_sum_per_sec?: number, m_query_time_sum_per_sec?: number, m_response_length_sum_per_sec?: number, m_rows_affected_sum_per_sec?: number, m_rows_examined_sum_per_sec?: number, m_rows_read_sum_per_sec?: number, m_rows_sent_sum_per_sec?: number, m_select_full_range_join_sum_per_sec?: number, m_select_range_check_sum_per_sec?: number, m_select_range_sum_per_sec?: number, m_shared_blks_dirtied_sum_per_sec?: number, m_shared_blks_hit_sum_per_sec?: number, m_shared_blks_read_sum_per_sec?: number, m_shared_blks_written_sum_per_sec?: number, m_sort_range_sum_per_sec?: number, m_sort_rows_sum_per_sec?: number, m_sort_scan_sum_per_sec?: number, m_temp_blks_read_sum_per_sec?: number, m_temp_blks_written_sum_per_sec?: number, m_tmp_disk_tables_sum_per_sec?: number, m_tmp_table_on_disk_sum_per_sec?: number, m_tmp_table_sizes_sum_per_sec?: number, m_tmp_table_sum_per_sec?: number, m_tmp_tables_sum_per_sec?: number, num_queries_per_sec?: number, num_queries_with_errors_per_sec?: number, num_queries_with_warnings_per_sec?: number, point?: number, time_frame?: number, timestamp?: string}>, totals?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetMetrics(body: {filter_by?: string, group_by?: string, include_only_fields?: Array<string>, labels?: Array<{key?: string, value?: Array<string>}>, period_start_from?: string, period_start_to?: string}): __Observable<{metrics?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}, sparkline?: Array<{load?: number, m_blk_read_time_sum_per_sec?: number, m_blk_write_time_sum_per_sec?: number, m_bytes_sent_sum_per_sec?: number, m_docs_returned_sum_per_sec?: number, m_docs_scanned_sum_per_sec?: number, m_filesort_on_disk_sum_per_sec?: number, m_filesort_sum_per_sec?: number, m_full_join_sum_per_sec?: number, m_full_scan_sum_per_sec?: number, m_innodb_io_r_bytes_sum_per_sec?: number, m_innodb_io_r_ops_sum_per_sec?: number, m_innodb_io_r_wait_sum_per_sec?: number, m_innodb_pages_distinct_sum_per_sec?: number, m_innodb_queue_wait_sum_per_sec?: number, m_innodb_rec_lock_wait_sum_per_sec?: number, m_local_blks_dirtied_sum_per_sec?: number, m_local_blks_hit_sum_per_sec?: number, m_local_blks_read_sum_per_sec?: number, m_local_blks_written_sum_per_sec?: number, m_lock_time_sum_per_sec?: number, m_merge_passes_sum_per_sec?: number, m_no_good_index_used_sum_per_sec?: number, m_no_index_used_sum_per_sec?: number, m_qc_hit_sum_per_sec?: number, m_query_length_sum_per_sec?: number, m_query_time_sum_per_sec?: number, m_response_length_sum_per_sec?: number, m_rows_affected_sum_per_sec?: number, m_rows_examined_sum_per_sec?: number, m_rows_read_sum_per_sec?: number, m_rows_sent_sum_per_sec?: number, m_select_full_range_join_sum_per_sec?: number, m_select_range_check_sum_per_sec?: number, m_select_range_sum_per_sec?: number, m_shared_blks_dirtied_sum_per_sec?: number, m_shared_blks_hit_sum_per_sec?: number, m_shared_blks_read_sum_per_sec?: number, m_shared_blks_written_sum_per_sec?: number, m_sort_range_sum_per_sec?: number, m_sort_rows_sum_per_sec?: number, m_sort_scan_sum_per_sec?: number, m_temp_blks_read_sum_per_sec?: number, m_temp_blks_written_sum_per_sec?: number, m_tmp_disk_tables_sum_per_sec?: number, m_tmp_table_on_disk_sum_per_sec?: number, m_tmp_table_sizes_sum_per_sec?: number, m_tmp_table_sum_per_sec?: number, m_tmp_tables_sum_per_sec?: number, num_queries_per_sec?: number, num_queries_with_errors_per_sec?: number, num_queries_with_warnings_per_sec?: number, point?: number, time_frame?: number, timestamp?: string}>, totals?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}}> {
    return this.GetMetricsResponse(body).pipe(
      __map(_r => _r.body as {metrics?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}, sparkline?: Array<{load?: number, m_blk_read_time_sum_per_sec?: number, m_blk_write_time_sum_per_sec?: number, m_bytes_sent_sum_per_sec?: number, m_docs_returned_sum_per_sec?: number, m_docs_scanned_sum_per_sec?: number, m_filesort_on_disk_sum_per_sec?: number, m_filesort_sum_per_sec?: number, m_full_join_sum_per_sec?: number, m_full_scan_sum_per_sec?: number, m_innodb_io_r_bytes_sum_per_sec?: number, m_innodb_io_r_ops_sum_per_sec?: number, m_innodb_io_r_wait_sum_per_sec?: number, m_innodb_pages_distinct_sum_per_sec?: number, m_innodb_queue_wait_sum_per_sec?: number, m_innodb_rec_lock_wait_sum_per_sec?: number, m_local_blks_dirtied_sum_per_sec?: number, m_local_blks_hit_sum_per_sec?: number, m_local_blks_read_sum_per_sec?: number, m_local_blks_written_sum_per_sec?: number, m_lock_time_sum_per_sec?: number, m_merge_passes_sum_per_sec?: number, m_no_good_index_used_sum_per_sec?: number, m_no_index_used_sum_per_sec?: number, m_qc_hit_sum_per_sec?: number, m_query_length_sum_per_sec?: number, m_query_time_sum_per_sec?: number, m_response_length_sum_per_sec?: number, m_rows_affected_sum_per_sec?: number, m_rows_examined_sum_per_sec?: number, m_rows_read_sum_per_sec?: number, m_rows_sent_sum_per_sec?: number, m_select_full_range_join_sum_per_sec?: number, m_select_range_check_sum_per_sec?: number, m_select_range_sum_per_sec?: number, m_shared_blks_dirtied_sum_per_sec?: number, m_shared_blks_hit_sum_per_sec?: number, m_shared_blks_read_sum_per_sec?: number, m_shared_blks_written_sum_per_sec?: number, m_sort_range_sum_per_sec?: number, m_sort_rows_sum_per_sec?: number, m_sort_scan_sum_per_sec?: number, m_temp_blks_read_sum_per_sec?: number, m_temp_blks_written_sum_per_sec?: number, m_tmp_disk_tables_sum_per_sec?: number, m_tmp_table_on_disk_sum_per_sec?: number, m_tmp_table_sizes_sum_per_sec?: number, m_tmp_table_sum_per_sec?: number, m_tmp_tables_sum_per_sec?: number, num_queries_per_sec?: number, num_queries_with_errors_per_sec?: number, num_queries_with_warnings_per_sec?: number, point?: number, time_frame?: number, timestamp?: string}>, totals?: {[key: string]: {avg?: number, cnt?: number, max?: number, min?: number, p99?: number, percent_of_total?: number, rate?: number, sum?: number}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetQueryExampleResponse(body: {filter_by?: string, group_by?: string, labels?: Array<{key?: string, value?: Array<string>}>, limit?: number, period_start_from?: string, period_start_to?: string}): __Observable<__StrictHttpResponse<{query_examples?: Array<{example?: string, example_format?: 'EXAMPLE_FORMAT_INVALID' | 'EXAMPLE' | 'FINGERPRINT', example_metrics?: string, example_type?: 'EXAMPLE_TYPE_INVALID' | 'RANDOM' | 'SLOWEST' | 'FASTEST' | 'WITH_ERROR', is_truncated?: number, schema?: string, service_id?: string, service_type?: string, tables?: Array<string>}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/qan/ObjectDetails/GetQueryExample`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{query_examples?: Array<{example?: string, example_format?: 'EXAMPLE_FORMAT_INVALID' | 'EXAMPLE' | 'FINGERPRINT', example_metrics?: string, example_type?: 'EXAMPLE_TYPE_INVALID' | 'RANDOM' | 'SLOWEST' | 'FASTEST' | 'WITH_ERROR', is_truncated?: number, schema?: string, service_id?: string, service_type?: string, tables?: Array<string>}>}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetQueryExample(body: {filter_by?: string, group_by?: string, labels?: Array<{key?: string, value?: Array<string>}>, limit?: number, period_start_from?: string, period_start_to?: string}): __Observable<{query_examples?: Array<{example?: string, example_format?: 'EXAMPLE_FORMAT_INVALID' | 'EXAMPLE' | 'FINGERPRINT', example_metrics?: string, example_type?: 'EXAMPLE_TYPE_INVALID' | 'RANDOM' | 'SLOWEST' | 'FASTEST' | 'WITH_ERROR', is_truncated?: number, schema?: string, service_id?: string, service_type?: string, tables?: Array<string>}>}> {
    return this.GetQueryExampleResponse(body).pipe(
      __map(_r => _r.body as {query_examples?: Array<{example?: string, example_format?: 'EXAMPLE_FORMAT_INVALID' | 'EXAMPLE' | 'FINGERPRINT', example_metrics?: string, example_type?: 'EXAMPLE_TYPE_INVALID' | 'RANDOM' | 'SLOWEST' | 'FASTEST' | 'WITH_ERROR', is_truncated?: number, schema?: string, service_id?: string, service_type?: string, tables?: Array<string>}>})
    );
  }
}

module ObjectDetailsService {
}

export { ObjectDetailsService }
