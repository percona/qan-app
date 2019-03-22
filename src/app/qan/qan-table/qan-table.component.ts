import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CoreComponent, QueryParams} from '../../core/core.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from '../../core/services/instance.service';
import * as moment from 'moment';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {TableDataModel} from './models/table-data.model';
import {MetricModel} from './models/metric.model';

@Component({
  selector: 'app-qan-table',
  templateUrl: './qan-table.component.html',
  styleUrls: ['./qan-table.component.scss']
})
export class QanTableComponent extends CoreComponent implements OnInit, OnChanges {
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: false
  };

  public queryColumns = {
    data: {
      count: 'Count',
      latancy: 'Latancy',
      load: 'Load',
    }
  };
  public selectOptions: any;
  public listColumns = this.queryColumns.data;


  public queryTypes = ['Query', 'Schema', 'Server', 'Database', 'User', 'Host'];
  public selectedQueryType: string;
  public yKey: string;
  public measurement: string;

  public queryProfile: Array<{}>;
  public isFirstSeen: boolean;
  public mockQueryProfile = {
    'rows': [
      {
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0.00605,
              'm_query_load': 0.0020333333,
              'm_query_time_avg': 1.0670399e-06,
              'm_query_time_sum': 0.122,
              'num_queries_sum': 114335,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00691,
              'm_query_load': 0.0024086668,
              'm_query_time_avg': 9.575173e-07,
              'm_query_time_sum': 0.14452,
              'num_queries_sum': 150932,
              'point': 2,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00945,
              'm_query_load': 0.0029298333,
              'm_query_time_avg': 1.3907546e-06,
              'm_query_time_sum': 0.17579,
              'num_queries_sum': 126399,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01075,
              'm_query_load': 0.003526,
              'm_query_time_avg': 1.2507612e-06,
              'm_query_time_sum': 0.21156,
              'num_queries_sum': 169145,
              'point': 4,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00531,
              'm_query_load': 0.0019253334,
              'm_query_time_avg': 7.514718e-07,
              'm_query_time_sum': 0.11552,
              'num_queries_sum': 153725,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00838,
              'm_query_load': 0.0030065,
              'm_query_time_avg': 1.7795908e-06,
              'm_query_time_sum': 0.18039,
              'num_queries_sum': 101366,
              'point': 6,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00892,
              'm_query_load': 0.0032423334,
              'm_query_time_avg': 1.0518462e-06,
              'm_query_time_sum': 0.19454,
              'num_queries_sum': 184951,
              'point': 7,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0086199995,
              'm_query_load': 0.0027971666,
              'm_query_time_avg': 1.0517773e-06,
              'm_query_time_sum': 0.16783,
              'num_queries_sum': 159568,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01947,
              'm_query_load': 0.006467167,
              'm_query_time_avg': 1.9506838e-06,
              'm_query_time_sum': 0.38803,
              'num_queries_sum': 198920,
              'point': 9,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01026,
              'm_query_load': 0.003331,
              'm_query_time_avg': 1.0303974e-06,
              'm_query_time_sum': 0.19986,
              'num_queries_sum': 193964,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.011080001,
              'm_query_load': 0.0034075,
              'm_query_time_avg': 1.4009662e-06,
              'm_query_time_sum': 0.20445,
              'num_queries_sum': 145935,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00297,
              'm_query_load': 0.0010026667,
              'm_query_time_avg': 5.7180876e-07,
              'm_query_time_sum': 0.06016,
              'num_queries_sum': 105210,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01219,
              'm_query_load': 0.004032667,
              'm_query_time_avg': 1.6723226e-06,
              'm_query_time_sum': 0.24196,
              'num_queries_sum': 144685,
              'point': 13,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00925,
              'm_query_load': 0.0028505,
              'm_query_time_avg': 1.2985149e-06,
              'm_query_time_sum': 0.17103,
              'num_queries_sum': 131712,
              'point': 14,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00874,
              'm_query_load': 0.0032646668,
              'm_query_time_avg': 1.176725e-06,
              'm_query_time_sum': 0.19588,
              'num_queries_sum': 166462,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01245,
              'm_query_load': 0.003689,
              'm_query_time_avg': 1.4194376e-06,
              'm_query_time_sum': 0.22134,
              'num_queries_sum': 155935,
              'point': 16,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01605,
              'm_query_load': 0.0048808334,
              'm_query_time_avg': 1.7474089e-06,
              'm_query_time_sum': 0.29285002,
              'num_queries_sum': 167591,
              'point': 17,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00997,
              'm_query_load': 0.0032083334,
              'm_query_time_avg': 1.2215397e-06,
              'm_query_time_sum': 0.1925,
              'num_queries_sum': 157588,
              'point': 18,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00817,
              'm_query_load': 0.0028296667,
              'm_query_time_avg': 1.5967722e-06,
              'm_query_time_sum': 0.16978,
              'num_queries_sum': 106327,
              'point': 19,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00598,
              'm_query_load': 0.002403,
              'm_query_time_avg': 1.0176598e-06,
              'm_query_time_sum': 0.14418,
              'num_queries_sum': 141678,
              'point': 20,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00219,
              'm_query_load': 0.0009671667,
              'm_query_time_avg': 6.452151e-07,
              'm_query_time_sum': 0.058029998,
              'num_queries_sum': 89939,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00742,
              'm_query_load': 0.0026393333,
              'm_query_time_avg': 9.1180755e-07,
              'm_query_time_sum': 0.15836,
              'num_queries_sum': 173677,
              'point': 22,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00865,
              'm_query_load': 0.0026594999,
              'm_query_time_avg': 9.2528484e-07,
              'm_query_time_sum': 0.15957,
              'num_queries_sum': 172455,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01015,
              'm_query_load': 0.0035361666,
              'm_query_time_avg': 1.0875326e-06,
              'm_query_time_sum': 0.21217,
              'num_queries_sum': 195093,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00877,
              'm_query_load': 0.0030858333,
              'm_query_time_avg': 9.62063e-07,
              'm_query_time_sum': 0.18515,
              'num_queries_sum': 192451,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.016139999,
              'm_query_load': 0.0047978335,
              'm_query_time_avg': 1.2555226e-06,
              'm_query_time_sum': 0.28787,
              'num_queries_sum': 229283,
              'point': 26,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00845,
              'm_query_load': 0.002957,
              'm_query_time_avg': 1.1669221e-06,
              'm_query_time_sum': 0.17742,
              'num_queries_sum': 152041,
              'point': 27,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00989,
              'm_query_load': 0.0033563334,
              'm_query_time_avg': 1.320897e-06,
              'm_query_time_sum': 0.20138,
              'num_queries_sum': 152457,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00385,
              'm_query_load': 0.0012071667,
              'm_query_time_avg': 6.024738e-07,
              'm_query_time_sum': 0.07243,
              'num_queries_sum': 120221,
              'point': 29,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01062,
              'm_query_load': 0.003277,
              'm_query_time_avg': 1.7773559e-06,
              'm_query_time_sum': 0.19662,
              'num_queries_sum': 110625,
              'point': 30,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00667,
              'm_query_load': 0.0022416667,
              'm_query_time_avg': 8.3040067e-07,
              'm_query_time_sum': 0.1345,
              'num_queries_sum': 161970,
              'point': 31,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00398,
              'm_query_load': 0.0015245,
              'm_query_time_avg': 5.060217e-07,
              'm_query_time_sum': 0.091469996,
              'num_queries_sum': 180763,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01229,
              'm_query_load': 0.0036575,
              'm_query_time_avg': 1.4346044e-06,
              'm_query_time_sum': 0.21945,
              'num_queries_sum': 152969,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0087,
              'm_query_load': 0.0031778333,
              'm_query_time_avg': 1.5629329e-06,
              'm_query_time_sum': 0.19067,
              'num_queries_sum': 121995,
              'point': 34,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01004,
              'm_query_load': 0.0036008335,
              'm_query_time_avg': 1.2054613e-06,
              'm_query_time_sum': 0.21605,
              'num_queries_sum': 179226,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00764,
              'm_query_load': 0.00274,
              'm_query_time_avg': 1.2234327e-06,
              'm_query_time_sum': 0.1644,
              'num_queries_sum': 134376,
              'point': 36,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00469,
              'm_query_load': 0.0014906666,
              'm_query_time_avg': 6.663885e-07,
              'm_query_time_sum': 0.089439996,
              'num_queries_sum': 134216,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01128,
              'm_query_load': 0.0035646667,
              'm_query_time_avg': 1.2883717e-06,
              'm_query_time_sum': 0.21388,
              'num_queries_sum': 166008,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00726,
              'm_query_load': 0.0025683334,
              'm_query_time_avg': 1.7396703e-06,
              'm_query_time_sum': 0.1541,
              'num_queries_sum': 88580,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0106,
              'm_query_load': 0.0035168333,
              'm_query_time_avg': 1.5041416e-06,
              'm_query_time_sum': 0.21101,
              'num_queries_sum': 140286,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01252,
              'm_query_load': 0.0037578333,
              'm_query_time_avg': 1.2400999e-06,
              'm_query_time_sum': 0.22546999,
              'num_queries_sum': 181816,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0126,
              'm_query_load': 0.0038855,
              'm_query_time_avg': 1.4268228e-06,
              'm_query_time_sum': 0.23313,
              'num_queries_sum': 163391,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01302,
              'm_query_load': 0.0036981667,
              'm_query_time_avg': 1.207026e-06,
              'm_query_time_sum': 0.22189,
              'num_queries_sum': 183832,
              'point': 43,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01288,
              'm_query_load': 0.0039945,
              'm_query_time_avg': 1.3716277e-06,
              'm_query_time_sum': 0.23967,
              'num_queries_sum': 174734,
              'point': 44,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01327,
              'm_query_load': 0.0038853334,
              'm_query_time_avg': 1.3936333e-06,
              'm_query_time_sum': 0.23312001,
              'num_queries_sum': 167275,
              'point': 45,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0084,
              'm_query_load': 0.002493,
              'm_query_time_avg': 1.2320136e-06,
              'm_query_time_sum': 0.14958,
              'num_queries_sum': 121411,
              'point': 46,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00704,
              'm_query_load': 0.0026933334,
              'm_query_time_avg': 1.0719948e-06,
              'm_query_time_sum': 0.1616,
              'num_queries_sum': 150747,
              'point': 47,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00759,
              'm_query_load': 0.0028081667,
              'm_query_time_avg': 1.0650173e-06,
              'm_query_time_sum': 0.16849,
              'num_queries_sum': 158204,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00988,
              'm_query_load': 0.0031961666,
              'm_query_time_avg': 9.907112e-07,
              'm_query_time_sum': 0.19177,
              'num_queries_sum': 193568,
              'point': 49,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0038899998,
              'm_query_load': 0.001609,
              'm_query_time_avg': 7.408999e-07,
              'm_query_time_sum': 0.096540004,
              'num_queries_sum': 130301,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00894,
              'm_query_load': 0.0031798333,
              'm_query_time_avg': 1.14559e-06,
              'm_query_time_sum': 0.19079,
              'num_queries_sum': 166543,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00838,
              'm_query_load': 0.0029415,
              'm_query_time_avg': 1.1192e-06,
              'm_query_time_sum': 0.17649,
              'num_queries_sum': 157693,
              'point': 52,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00996,
              'm_query_load': 0.0034118334,
              'm_query_time_avg': 1.2669187e-06,
              'm_query_time_sum': 0.20471,
              'num_queries_sum': 161581,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00829,
              'm_query_load': 0.0025791668,
              'm_query_time_avg': 1.5975019e-06,
              'm_query_time_sum': 0.15475,
              'num_queries_sum': 96870,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00711,
              'm_query_load': 0.0024118333,
              'm_query_time_avg': 8.6482834e-07,
              'm_query_time_sum': 0.14471,
              'num_queries_sum': 167328,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01428,
              'm_query_load': 0.004574,
              'm_query_time_avg': 1.556347e-06,
              'm_query_time_sum': 0.27444,
              'num_queries_sum': 176336,
              'point': 56,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0107700005,
              'm_query_load': 0.0035158333,
              'm_query_time_avg': 1.3320914e-06,
              'm_query_time_sum': 0.21095,
              'num_queries_sum': 158360,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00692,
              'm_query_load': 0.0027033333,
              'm_query_time_avg': 1.5285303e-06,
              'm_query_time_sum': 0.1622,
              'num_queries_sum': 106115,
              'point': 58,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0067000003,
              'm_query_load': 0.0023623332,
              'm_query_time_avg': 1.0108762e-06,
              'm_query_time_sum': 0.14174,
              'num_queries_sum': 140215,
              'point': 59,
              'time_frame': 60,
              'timestamp': 1546300800
            }
          }
        ]
      },
      {
        'dimension': '07E4DDF133CD2FAD',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 1,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.3333333e-07,
              'm_query_time_avg': 8.445946e-09,
              'm_query_time_sum': 5e-05,
              'num_queries_sum': 5920,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.3333333e-07,
              'm_query_time_avg': 1.0208248e-08,
              'm_query_time_sum': 5e-05,
              'num_queries_sum': 4898,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1e-06,
              'm_query_time_avg': 1.2033694e-08,
              'm_query_time_sum': 6e-05,
              'num_queries_sum': 4986,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.3333333e-06,
              'm_query_time_avg': 2.5698682e-08,
              'm_query_time_sum': 8e-05,
              'num_queries_sum': 3113,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.6666668e-06,
              'm_query_time_avg': 5.186089e-08,
              'm_query_time_sum': 0.00034,
              'num_queries_sum': 6556,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1e-06,
              'm_query_time_avg': 8.115785e-09,
              'm_query_time_sum': 6e-05,
              'num_queries_sum': 7393,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.1666667e-06,
              'm_query_time_avg': 1.4147131e-08,
              'm_query_time_sum': 7e-05,
              'num_queries_sum': 4948,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1e-06,
              'm_query_time_avg': 8.100446e-09,
              'm_query_time_sum': 6e-05,
              'num_queries_sum': 7407,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.833333e-06,
              'm_query_time_avg': 1.548741e-08,
              'm_query_time_sum': 0.00035,
              'num_queries_sum': 22599,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.3333333e-07,
              'm_query_time_avg': 5.100479e-09,
              'm_query_time_sum': 5e-05,
              'num_queries_sum': 9803,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.6666666e-07,
              'm_query_time_avg': 6.4913985e-09,
              'm_query_time_sum': 4e-05,
              'num_queries_sum': 6162,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.3333333e-06,
              'm_query_time_avg': 3.937008e-07,
              'm_query_time_sum': 0.0002,
              'num_queries_sum': 508,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1e-06,
              'm_query_time_avg': 2.7088035e-08,
              'm_query_time_sum': 6e-05,
              'num_queries_sum': 2215,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.3333333e-06,
              'm_query_time_avg': 1.2135922e-08,
              'm_query_time_sum': 8e-05,
              'num_queries_sum': 6592,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4999999e-06,
              'm_query_time_avg': 1.3406822e-08,
              'm_query_time_sum': 9e-05,
              'num_queries_sum': 6713,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          }
        ]
      },
      {
        'dimension': 'D2B2DCCF0040F792',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 2,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.833333e-06,
              'm_query_time_avg': 1.892915e-07,
              'm_query_time_sum': 0.00035,
              'num_queries_sum': 1849,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.0000003e-06,
              'm_query_time_avg': 6.626905e-08,
              'm_query_time_sum': 0.0003,
              'num_queries_sum': 4527,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.5e-06,
              'm_query_time_avg': 1.615219e-07,
              'm_query_time_sum': 0.00045,
              'num_queries_sum': 2786,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.5e-06,
              'm_query_time_avg': 4.6354828e-08,
              'm_query_time_sum': 0.00033,
              'num_queries_sum': 7119,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6e-06,
              'm_query_time_avg': 5.985037e-08,
              'm_query_time_sum': 0.00036,
              'num_queries_sum': 6015,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.0000003e-06,
              'm_query_time_avg': 5.6689345e-08,
              'm_query_time_sum': 0.0003,
              'num_queries_sum': 5292,
              'point': 31,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.3333337e-06,
              'm_query_time_avg': 5.7315236e-07,
              'm_query_time_sum': 0.00038,
              'num_queries_sum': 663,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.5e-06,
              'm_query_time_avg': 7.1754734e-08,
              'm_query_time_sum': 0.00033,
              'num_queries_sum': 4599,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.8333334e-06,
              'm_query_time_avg': 5.1320566e-08,
              'm_query_time_sum': 0.00041,
              'num_queries_sum': 7989,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.3333337e-06,
              'm_query_time_avg': 5.504056e-08,
              'm_query_time_sum': 0.00038,
              'num_queries_sum': 6904,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          }
        ]
      },
      {
        'dimension': '4739F00420391F08',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 3,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.166667e-06,
              'm_query_time_avg': 4.2668736e-07,
              'm_query_time_sum': 0.00055,
              'num_queries_sum': 1289,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.1e-05,
              'm_query_time_avg': 8.092202e-08,
              'm_query_time_sum': 0.00066,
              'num_queries_sum': 8156,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.833334e-06,
              'm_query_time_avg': 1.456044e-07,
              'm_query_time_sum': 0.00053,
              'num_queries_sum': 3640,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.35e-05,
              'm_query_time_avg': 1.8384021e-07,
              'm_query_time_sum': 0.00081,
              'num_queries_sum': 4406,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.1166666e-05,
              'm_query_time_avg': 6.8958414e-08,
              'm_query_time_sum': 0.00067,
              'num_queries_sum': 9716,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.999999e-06,
              'm_query_time_avg': 2.9173418e-07,
              'm_query_time_sum': 0.00054,
              'num_queries_sum': 1851,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.833334e-06,
              'm_query_time_avg': 1.2553191e-06,
              'm_query_time_sum': 0.00059,
              'num_queries_sum': 470,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          }
        ]
      },
      {
        'dimension': 'B32023956BDC8890',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 4,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.4333332e-05,
              'm_query_time_avg': 1.8662917e-07,
              'm_query_time_sum': 0.0014599999,
              'num_queries_sum': 7823,
              'point': 2,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.0500001e-05,
              'm_query_time_avg': 7.8086266e-08,
              'm_query_time_sum': 0.00063,
              'num_queries_sum': 8068,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.833334e-06,
              'm_query_time_avg': 1.0000001e-05,
              'm_query_time_sum': 0.00053,
              'num_queries_sum': 53,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.2833332e-05,
              'm_query_time_avg': 8.179104e-07,
              'm_query_time_sum': 0.00137,
              'num_queries_sum': 1675,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.2166667e-05,
              'm_query_time_avg': 1.3131859e-07,
              'm_query_time_sum': 0.00073,
              'num_queries_sum': 5559,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4666667e-05,
              'm_query_time_avg': 3.4906785e-07,
              'm_query_time_sum': 0.00088,
              'num_queries_sum': 2521,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.6333333e-05,
              'm_query_time_avg': 3.6897592e-07,
              'm_query_time_sum': 0.00098,
              'num_queries_sum': 2656,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.25e-05,
              'm_query_time_avg': 1.9973369e-07,
              'm_query_time_sum': 0.00075,
              'num_queries_sum': 3755,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.666667e-06,
              'm_query_time_avg': 8.56249e-08,
              'm_query_time_sum': 0.00052,
              'num_queries_sum': 6073,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.999999e-06,
              'm_query_time_avg': 1.0289634e-07,
              'm_query_time_sum': 0.00054,
              'num_queries_sum': 5248,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.833334e-06,
              'm_query_time_avg': 1.4775858e-07,
              'm_query_time_sum': 0.00059,
              'num_queries_sum': 3993,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          }
        ]
      },
      {
        'dimension': '50CDCBF0B17474BA',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 5,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.5e-06,
              'm_query_time_avg': 8.482133e-09,
              'm_query_time_sum': 0.00039,
              'num_queries_sum': 45979,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.6666663e-06,
              'm_query_time_avg': 7.3423023e-09,
              'm_query_time_sum': 0.00034,
              'num_queries_sum': 46307,
              'point': 2,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.3333334e-06,
              'm_query_time_avg': 6.929822e-09,
              'm_query_time_sum': 0.00026,
              'num_queries_sum': 37519,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.833333e-06,
              'm_query_time_avg': 8.045607e-09,
              'm_query_time_sum': 0.00035,
              'num_queries_sum': 43502,
              'point': 4,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.1666667e-06,
              'm_query_time_avg': 5.975429e-09,
              'm_query_time_sum': 0.00024999998,
              'num_queries_sum': 41838,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4999999e-06,
              'm_query_time_avg': 4.927187e-09,
              'm_query_time_sum': 9e-05,
              'num_queries_sum': 18266,
              'point': 6,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.1e-05,
              'm_query_time_avg': 9.816316e-09,
              'm_query_time_sum': 0.00065999996,
              'num_queries_sum': 67235,
              'point': 7,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.4999997e-06,
              'm_query_time_avg': 9.526498e-09,
              'm_query_time_sum': 0.00027,
              'num_queries_sum': 28342,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.1666664e-06,
              'm_query_time_avg': 8.930055e-09,
              'm_query_time_sum': 0.00043,
              'num_queries_sum': 48152,
              'point': 9,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.333333e-06,
              'm_query_time_avg': 6.8412995e-09,
              'm_query_time_sum': 0.00037999998,
              'num_queries_sum': 55545,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.4999998e-06,
              'm_query_time_avg': 8.637354e-09,
              'm_query_time_sum': 0.00021,
              'num_queries_sum': 24313,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.5e-06,
              'm_query_time_avg': 9.447231e-09,
              'm_query_time_sum': 0.00045,
              'num_queries_sum': 47633,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.4999998e-06,
              'm_query_time_avg': 6.127272e-09,
              'm_query_time_sum': 0.00021,
              'num_queries_sum': 34273,
              'point': 13,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.833333e-06,
              'm_query_time_avg': 7.71027e-09,
              'm_query_time_sum': 0.00035,
              'num_queries_sum': 45394,
              'point': 14,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.5e-06,
              'm_query_time_avg': 8.960779e-09,
              'm_query_time_sum': 0.00039,
              'num_queries_sum': 43523,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.8333333e-06,
              'm_query_time_avg': 6.2315424e-09,
              'm_query_time_sum': 0.00022999999,
              'num_queries_sum': 36909,
              'point': 16,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.3333333e-06,
              'm_query_time_avg': 8.9754515e-09,
              'm_query_time_sum': 0.0002,
              'num_queries_sum': 22283,
              'point': 17,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.1666664e-06,
              'm_query_time_avg': 8.755498e-09,
              'm_query_time_sum': 0.00043,
              'num_queries_sum': 49112,
              'point': 18,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.6666664e-06,
              'm_query_time_avg': 8.322187e-09,
              'm_query_time_sum': 0.00027999998,
              'num_queries_sum': 33645,
              'point': 19,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.9999999e-06,
              'm_query_time_avg': 5.2264806e-09,
              'm_query_time_sum': 0.00018,
              'num_queries_sum': 34440,
              'point': 20,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.1666665e-06,
              'm_query_time_avg': 9.309581e-09,
              'm_query_time_sum': 0.00037,
              'num_queries_sum': 39744,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.1666665e-06,
              'm_query_time_avg': 7.1713764e-09,
              'm_query_time_sum': 0.00037,
              'num_queries_sum': 51594,
              'point': 22,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.3333333e-06,
              'm_query_time_avg': 7.374971e-09,
              'm_query_time_sum': 0.00032,
              'num_queries_sum': 43390,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.9999998e-06,
              'm_query_time_avg': 7.992186e-09,
              'm_query_time_sum': 0.00036,
              'num_queries_sum': 45044,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.3333332e-06,
              'm_query_time_avg': 4.6766435e-09,
              'm_query_time_sum': 0.00013999999,
              'num_queries_sum': 29936,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.9999996e-06,
              'm_query_time_avg': 5.0239835e-09,
              'm_query_time_sum': 0.00042,
              'num_queries_sum': 83599,
              'point': 26,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5e-06,
              'm_query_time_avg': 6.910054e-09,
              'm_query_time_sum': 0.00029999999,
              'num_queries_sum': 43415,
              'point': 27,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.333333e-06,
              'm_query_time_avg': 1.1400429e-08,
              'm_query_time_sum': 0.0005,
              'num_queries_sum': 43858,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.1666665e-06,
              'm_query_time_avg': 5.8432432e-09,
              'm_query_time_sum': 0.00037,
              'num_queries_sum': 63321,
              'point': 29,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.3333333e-06,
              'm_query_time_avg': 6.8099015e-09,
              'm_query_time_sum': 0.0002,
              'num_queries_sum': 29369,
              'point': 30,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.6666666e-06,
              'm_query_time_avg': 7.508212e-09,
              'm_query_time_sum': 0.0004,
              'num_queries_sum': 53275,
              'point': 31,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.1666664e-06,
              'm_query_time_avg': 6.519794e-09,
              'm_query_time_sum': 0.00043,
              'num_queries_sum': 65953,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.1666667e-06,
              'm_query_time_avg': 7.439812e-09,
              'm_query_time_sum': 0.00024999998,
              'num_queries_sum': 33603,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.8333333e-06,
              'm_query_time_avg': 1.5997774e-08,
              'm_query_time_sum': 0.00022999999,
              'num_queries_sum': 14377,
              'point': 34,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.5e-06,
              'm_query_time_avg': 7.834671e-09,
              'm_query_time_sum': 0.00045,
              'num_queries_sum': 57437,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.6666663e-06,
              'm_query_time_avg': 6.536827e-09,
              'm_query_time_sum': 0.00034,
              'num_queries_sum': 52013,
              'point': 36,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.1666665e-06,
              'm_query_time_avg': 5.562153e-09,
              'm_query_time_sum': 0.00037,
              'num_queries_sum': 66521,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.9999999e-06,
              'm_query_time_avg': 5.995004e-09,
              'm_query_time_sum': 0.00018,
              'num_queries_sum': 30025,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.6666667e-06,
              'm_query_time_avg': 9.379213e-09,
              'm_query_time_sum': 0.00016,
              'num_queries_sum': 17059,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.8333333e-06,
              'm_query_time_avg': 7.245235e-09,
              'm_query_time_sum': 0.00022999999,
              'num_queries_sum': 31745,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.9999999e-06,
              'm_query_time_avg': 3.9821244e-09,
              'm_query_time_sum': 0.00018,
              'num_queries_sum': 45202,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.3333333e-06,
              'm_query_time_avg': 8.041009e-09,
              'm_query_time_sum': 0.00032,
              'num_queries_sum': 39796,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.9999996e-06,
              'm_query_time_avg': 8.179003e-09,
              'm_query_time_sum': 0.00042,
              'num_queries_sum': 51351,
              'point': 43,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9e-06,
              'm_query_time_avg': 7.93301e-09,
              'm_query_time_sum': 0.00054,
              'num_queries_sum': 68070,
              'point': 44,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.833333e-06,
              'm_query_time_avg': 6.9314976e-09,
              'm_query_time_sum': 0.00029,
              'num_queries_sum': 41838,
              'point': 45,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.1666666e-06,
              'm_query_time_avg': 7.405284e-09,
              'm_query_time_sum': 0.00031,
              'num_queries_sum': 41862,
              'point': 46,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.833333e-06,
              'm_query_time_avg': 7.81924e-09,
              'm_query_time_sum': 0.00029,
              'num_queries_sum': 37088,
              'point': 47,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.6666664e-06,
              'm_query_time_avg': 6.9570403e-09,
              'm_query_time_sum': 0.00027999998,
              'num_queries_sum': 40247,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.9999998e-06,
              'm_query_time_avg': 8.640345e-09,
              'm_query_time_sum': 0.00036,
              'num_queries_sum': 41665,
              'point': 49,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.333333e-06,
              'm_query_time_avg': 7.672737e-09,
              'm_query_time_sum': 0.00037999998,
              'num_queries_sum': 49526,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.6666666e-06,
              'm_query_time_avg': 6.2864416e-09,
              'm_query_time_sum': 0.0004,
              'num_queries_sum': 63629,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.999999e-06,
              'm_query_time_avg': 8.569116e-09,
              'm_query_time_sum': 0.00054,
              'num_queries_sum': 63017,
              'point': 52,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.1666665e-06,
              'm_query_time_avg': 5.6721494e-09,
              'm_query_time_sum': 0.00037,
              'num_queries_sum': 65231,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.6666665e-06,
              'm_query_time_avg': 9.810613e-09,
              'm_query_time_sum': 0.00046,
              'num_queries_sum': 46888,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.8333334e-06,
              'm_query_time_avg': 7.5675075e-09,
              'm_query_time_sum': 0.00040999998,
              'num_queries_sum': 54179,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.5e-06,
              'm_query_time_avg': 7.044543e-09,
              'm_query_time_sum': 0.00039,
              'num_queries_sum': 55362,
              'point': 56,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.5e-06,
              'm_query_time_avg': 6.2090764e-09,
              'm_query_time_sum': 0.00033,
              'num_queries_sum': 53148,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 5.3333333e-06,
              'm_query_time_avg': 7.2601867e-09,
              'm_query_time_sum': 0.00032,
              'num_queries_sum': 44076,
              'point': 58,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.333333e-06,
              'm_query_time_avg': 7.106815e-09,
              'm_query_time_sum': 0.00049999997,
              'num_queries_sum': 70355,
              'point': 59,
              'time_frame': 60,
              'timestamp': 1546300800
            }
          }
        ]
      },
      {
        'dimension': '6053B61FAD364155',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 6,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.15e-05,
              'm_query_time_avg': 8.941568e-08,
              'm_query_time_sum': 0.0012899999,
              'num_queries_sum': 14427,
              'point': 4,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.1666667e-05,
              'm_query_time_avg': 8.734211e-08,
              'm_query_time_sum': 0.0013,
              'num_queries_sum': 14884,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.833334e-06,
              'm_query_time_avg': 1.2470936e-07,
              'm_query_time_sum': 0.00059,
              'num_queries_sum': 4731,
              'point': 7,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.6666666e-06,
              'm_query_time_avg': 5.5248616e-08,
              'm_query_time_sum': 0.0004,
              'num_queries_sum': 7240,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.833333e-06,
              'm_query_time_avg': 3.0499675e-07,
              'm_query_time_sum': 0.00047,
              'num_queries_sum': 1541,
              'point': 9,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.9500001e-05,
              'm_query_time_avg': 9.342809e-08,
              'm_query_time_sum': 0.0011700001,
              'num_queries_sum': 12523,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.7166667e-05,
              'm_query_time_avg': 8.471788e-08,
              'm_query_time_sum': 0.0010299999,
              'num_queries_sum': 12158,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.1666664e-06,
              'm_query_time_avg': 7.059596e-08,
              'm_query_time_sum': 0.00043,
              'num_queries_sum': 6091,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.3999999e-05,
              'm_query_time_avg': 7.720765e-08,
              'm_query_time_sum': 0.00144,
              'num_queries_sum': 18651,
              'point': 13,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4666667e-05,
              'm_query_time_avg': 1.5918958e-07,
              'm_query_time_sum': 0.00088,
              'num_queries_sum': 5528,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.5e-05,
              'm_query_time_avg': 1.11111106e-07,
              'm_query_time_sum': 0.0009,
              'num_queries_sum': 8100,
              'point': 16,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.3166667e-05,
              'm_query_time_avg': 8.563191e-08,
              'm_query_time_sum': 0.00199,
              'num_queries_sum': 23239,
              'point': 17,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.3666667e-05,
              'm_query_time_avg': 1.4233372e-07,
              'm_query_time_sum': 0.00202,
              'num_queries_sum': 14192,
              'point': 18,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.5e-06,
              'm_query_time_avg': 1.5202703e-07,
              'm_query_time_sum': 0.00045,
              'num_queries_sum': 2960,
              'point': 19,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.3333335e-06,
              'm_query_time_avg': 1.023732e-07,
              'm_query_time_sum': 0.00044,
              'num_queries_sum': 4298,
              'point': 20,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.38333335e-05,
              'm_query_time_avg': 1.03491274e-07,
              'm_query_time_sum': 0.00083000003,
              'num_queries_sum': 8020,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4333334e-05,
              'm_query_time_avg': 4.673659e-08,
              'm_query_time_sum': 0.00086000003,
              'num_queries_sum': 18401,
              'point': 22,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.1666664e-06,
              'm_query_time_avg': 1.0074976e-07,
              'm_query_time_sum': 0.00043,
              'num_queries_sum': 4268,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.5e-06,
              'm_query_time_avg': 6.774048e-08,
              'm_query_time_sum': 0.00045,
              'num_queries_sum': 6643,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.7833335e-05,
              'm_query_time_avg': 7.682424e-08,
              'm_query_time_sum': 0.00287,
              'num_queries_sum': 37358,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.2166667e-05,
              'm_query_time_avg': 1.1696421e-07,
              'm_query_time_sum': 0.00133,
              'num_queries_sum': 11371,
              'point': 26,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.85e-05,
              'm_query_time_avg': 1.9398752e-07,
              'm_query_time_sum': 0.00171,
              'num_queries_sum': 8815,
              'point': 27,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.4166667e-05,
              'm_query_time_avg': 4.6296296e-07,
              'm_query_time_sum': 0.00205,
              'num_queries_sum': 4428,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.65e-05,
              'm_query_time_avg': 8.9447056e-08,
              'm_query_time_sum': 0.00099,
              'num_queries_sum': 11068,
              'point': 29,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.75e-05,
              'm_query_time_avg': 1.6571256e-07,
              'm_query_time_sum': 0.00165,
              'num_queries_sum': 9957,
              'point': 30,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.1833333e-05,
              'm_query_time_avg': 6.407121e-08,
              'm_query_time_sum': 0.00131,
              'num_queries_sum': 20446,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.1666667e-05,
              'm_query_time_avg': 8.641893e-08,
              'm_query_time_sum': 0.0013,
              'num_queries_sum': 15043,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.1666664e-06,
              'm_query_time_avg': 4.7424724e-08,
              'm_query_time_sum': 0.00043,
              'num_queries_sum': 9067,
              'point': 34,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.3333335e-06,
              'm_query_time_avg': 5.8721472e-08,
              'm_query_time_sum': 0.00044,
              'num_queries_sum': 7493,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.5166666e-05,
              'm_query_time_avg': 1.2327537e-07,
              'm_query_time_sum': 0.00151,
              'num_queries_sum': 12249,
              'point': 36,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.7166667e-05,
              'm_query_time_avg': 1.1960056e-07,
              'm_query_time_sum': 0.0010299999,
              'num_queries_sum': 8612,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 4.9833332e-05,
              'm_query_time_avg': 1.172917e-07,
              'm_query_time_sum': 0.00299,
              'num_queries_sum': 25492,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4e-05,
              'm_query_time_avg': 6.615215e-08,
              'm_query_time_sum': 0.00084,
              'num_queries_sum': 12698,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.9666666e-05,
              'm_query_time_avg': 7.2635274e-08,
              'm_query_time_sum': 0.00178,
              'num_queries_sum': 24506,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4e-05,
              'm_query_time_avg': 1.5306122e-07,
              'm_query_time_sum': 0.00084,
              'num_queries_sum': 5488,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.38333335e-05,
              'm_query_time_avg': 9.75094e-08,
              'm_query_time_sum': 0.00083000003,
              'num_queries_sum': 8512,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.1666667e-05,
              'm_query_time_avg': 1.2939186e-07,
              'm_query_time_sum': 0.0013,
              'num_queries_sum': 10047,
              'point': 43,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.833333e-06,
              'm_query_time_avg': 3.032258e-06,
              'm_query_time_sum': 0.00047,
              'num_queries_sum': 155,
              'point': 44,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.6333333e-05,
              'm_query_time_avg': 6.8762276e-08,
              'm_query_time_sum': 0.00098,
              'num_queries_sum': 14252,
              'point': 45,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.5333333e-05,
              'm_query_time_avg': 5.9243995e-08,
              'm_query_time_sum': 0.00092,
              'num_queries_sum': 15529,
              'point': 47,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.15e-05,
              'm_query_time_avg': 6.001395e-08,
              'm_query_time_sum': 0.00129,
              'num_queries_sum': 21495,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.45e-05,
              'm_query_time_avg': 5.7654077e-08,
              'm_query_time_sum': 0.00087,
              'num_queries_sum': 15090,
              'point': 49,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.4166666e-05,
              'm_query_time_avg': 7.8314876e-08,
              'm_query_time_sum': 0.00145,
              'num_queries_sum': 18515,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4833333e-05,
              'm_query_time_avg': 1.3202789e-07,
              'm_query_time_sum': 0.00089,
              'num_queries_sum': 6741,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.3333335e-06,
              'm_query_time_avg': 1.0651174e-07,
              'm_query_time_sum': 0.00044,
              'num_queries_sum': 4131,
              'point': 52,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.8333334e-06,
              'm_query_time_avg': 6.1784206e-08,
              'm_query_time_sum': 0.00041,
              'num_queries_sum': 6636,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4666666e-05,
              'm_query_time_avg': 7.949413e-08,
              'm_query_time_sum': 0.00087999995,
              'num_queries_sum': 11070,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 2.3833332e-05,
              'm_query_time_avg': 1.10433234e-07,
              'm_query_time_sum': 0.00143,
              'num_queries_sum': 12949,
              'point': 56,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 3.05e-05,
              'm_query_time_avg': 9.413096e-08,
              'm_query_time_sum': 0.00183,
              'num_queries_sum': 19441,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.4166666e-05,
              'm_query_time_avg': 1.2859304e-07,
              'm_query_time_sum': 0.00084999995,
              'num_queries_sum': 6610,
              'point': 58,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.6833334e-05,
              'm_query_time_avg': 2.1804836e-07,
              'm_query_time_sum': 0.00101,
              'num_queries_sum': 4632,
              'point': 59,
              'time_frame': 60,
              'timestamp': 1546300800
            }
          }
        ]
      },
      {
        'dimension': '5E556C57819E58FF',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 7,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.3666666e-05,
              'm_query_time_avg': 2.3634651e-07,
              'm_query_time_sum': 0.00502,
              'num_queries_sum': 21240,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000196,
              'm_query_time_avg': 1.7912903e-07,
              'm_query_time_sum': 0.01176,
              'num_queries_sum': 65651,
              'point': 2,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000161,
              'm_query_time_avg': 4.2218434e-07,
              'm_query_time_sum': 0.00966,
              'num_queries_sum': 22881,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00014516666,
              'm_query_time_avg': 1.8396096e-07,
              'm_query_time_sum': 0.00871,
              'num_queries_sum': 47347,
              'point': 4,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00021116667,
              'm_query_time_avg': 2.375818e-07,
              'm_query_time_sum': 0.01267,
              'num_queries_sum': 53329,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000161,
              'm_query_time_avg': 2.4068768e-07,
              'm_query_time_sum': 0.00966,
              'num_queries_sum': 40135,
              'point': 6,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00016483333,
              'm_query_time_avg': 1.7963201e-07,
              'm_query_time_sum': 0.00989,
              'num_queries_sum': 55057,
              'point': 7,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00018716666,
              'm_query_time_avg': 1.6741454e-07,
              'm_query_time_sum': 0.01123,
              'num_queries_sum': 67079,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0001515,
              'm_query_time_avg': 2.1995305e-07,
              'm_query_time_sum': 0.00909,
              'num_queries_sum': 41327,
              'point': 9,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00015616667,
              'm_query_time_avg': 1.7799476e-07,
              'm_query_time_sum': 0.00937,
              'num_queries_sum': 52642,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00014366666,
              'm_query_time_avg': 1.6696043e-07,
              'm_query_time_sum': 0.0086199995,
              'num_queries_sum': 51629,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00016433334,
              'm_query_time_avg': 3.0484787e-07,
              'm_query_time_sum': 0.00986,
              'num_queries_sum': 32344,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.116667e-05,
              'm_query_time_avg': 2.756084e-07,
              'm_query_time_sum': 0.00487,
              'num_queries_sum': 17670,
              'point': 13,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.15e-05,
              'm_query_time_avg': 1.7513699e-07,
              'm_query_time_sum': 0.00489,
              'num_queries_sum': 27921,
              'point': 14,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00013616667,
              'm_query_time_avg': 1.97467e-07,
              'm_query_time_sum': 0.00817,
              'num_queries_sum': 41374,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00013533334,
              'm_query_time_avg': 2.037181e-07,
              'm_query_time_sum': 0.00812,
              'num_queries_sum': 39859,
              'point': 16,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00012766667,
              'm_query_time_avg': 2.0461587e-07,
              'm_query_time_sum': 0.00766,
              'num_queries_sum': 37436,
              'point': 17,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00011166667,
              'm_query_time_avg': 1.7754928e-07,
              'm_query_time_sum': 0.0067,
              'num_queries_sum': 37736,
              'point': 18,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.8666664e-05,
              'm_query_time_avg': 1.9708547e-07,
              'm_query_time_sum': 0.00472,
              'num_queries_sum': 23949,
              'point': 19,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00015200001,
              'm_query_time_avg': 1.7544872e-07,
              'm_query_time_sum': 0.0091200005,
              'num_queries_sum': 51981,
              'point': 20,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0001045,
              'm_query_time_avg': 3.0046004e-07,
              'm_query_time_sum': 0.00627,
              'num_queries_sum': 20868,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000148,
              'm_query_time_avg': 1.5602214e-07,
              'm_query_time_sum': 0.00888,
              'num_queries_sum': 56915,
              'point': 22,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00015266667,
              'm_query_time_avg': 1.7824132e-07,
              'm_query_time_sum': 0.00916,
              'num_queries_sum': 51391,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00022416667,
              'm_query_time_avg': 1.6767855e-07,
              'm_query_time_sum': 0.01345,
              'num_queries_sum': 80213,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00015733333,
              'm_query_time_avg': 1.60752e-07,
              'm_query_time_sum': 0.00944,
              'num_queries_sum': 58724,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00016033334,
              'm_query_time_avg': 1.745188e-07,
              'm_query_time_sum': 0.00962,
              'num_queries_sum': 55123,
              'point': 26,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000110500005,
              'm_query_time_avg': 1.5460311e-07,
              'm_query_time_sum': 0.00663,
              'num_queries_sum': 42884,
              'point': 27,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00014433333,
              'm_query_time_avg': 2.2055828e-07,
              'm_query_time_sum': 0.00866,
              'num_queries_sum': 39264,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0001305,
              'm_query_time_avg': 2.3578656e-07,
              'm_query_time_sum': 0.00783,
              'num_queries_sum': 33208,
              'point': 29,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.85e-05,
              'm_query_time_avg': 2.5585524e-07,
              'm_query_time_sum': 0.00591,
              'num_queries_sum': 23099,
              'point': 30,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00024866668,
              'm_query_time_avg': 2.1659916e-07,
              'm_query_time_sum': 0.01492,
              'num_queries_sum': 68883,
              'point': 31,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000120666664,
              'm_query_time_avg': 1.5314649e-07,
              'm_query_time_sum': 0.00724,
              'num_queries_sum': 47275,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000103,
              'm_query_time_avg': 1.5423394e-07,
              'm_query_time_sum': 0.00618,
              'num_queries_sum': 40069,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.533334e-05,
              'm_query_time_avg': 2.2161095e-07,
              'm_query_time_sum': 0.00572,
              'num_queries_sum': 25811,
              'point': 34,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00018383334,
              'm_query_time_avg': 2.050186e-07,
              'm_query_time_sum': 0.01103,
              'num_queries_sum': 53800,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00014366666,
              'm_query_time_avg': 2.612438e-07,
              'm_query_time_sum': 0.0086199995,
              'num_queries_sum': 32996,
              'point': 36,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000100666664,
              'm_query_time_avg': 2.5116435e-07,
              'm_query_time_sum': 0.00604,
              'num_queries_sum': 24048,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00013583334,
              'm_query_time_avg': 2.3219373e-07,
              'm_query_time_sum': 0.00815,
              'num_queries_sum': 35100,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.233333e-05,
              'm_query_time_avg': 1.8933007e-07,
              'm_query_time_sum': 0.00494,
              'num_queries_sum': 26092,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 6.8166664e-05,
              'm_query_time_avg': 4.033133e-07,
              'm_query_time_sum': 0.00409,
              'num_queries_sum': 10141,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000161,
              'm_query_time_avg': 1.7322382e-07,
              'm_query_time_sum': 0.00966,
              'num_queries_sum': 55766,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.2833336e-05,
              'm_query_time_avg': 1.9204761e-07,
              'm_query_time_sum': 0.00497,
              'num_queries_sum': 25879,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0001695,
              'm_query_time_avg': 1.7539926e-07,
              'm_query_time_sum': 0.01017,
              'num_queries_sum': 57982,
              'point': 43,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00013366666,
              'm_query_time_avg': 2.2448009e-07,
              'm_query_time_sum': 0.00802,
              'num_queries_sum': 35727,
              'point': 44,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000163,
              'm_query_time_avg': 2.1200954e-07,
              'm_query_time_sum': 0.00978,
              'num_queries_sum': 46130,
              'point': 45,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00016566667,
              'm_query_time_avg': 1.6703075e-07,
              'm_query_time_sum': 0.00994,
              'num_queries_sum': 59510,
              'point': 46,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00011933334,
              'm_query_time_avg': 1.5223354e-07,
              'm_query_time_sum': 0.00716,
              'num_queries_sum': 47033,
              'point': 47,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00014483334,
              'm_query_time_avg': 1.8296278e-07,
              'm_query_time_sum': 0.00869,
              'num_queries_sum': 47496,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0002005,
              'm_query_time_avg': 1.5445453e-07,
              'm_query_time_sum': 0.01203,
              'num_queries_sum': 77887,
              'point': 49,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0001515,
              'm_query_time_avg': 2.970103e-07,
              'm_query_time_sum': 0.00909,
              'num_queries_sum': 30605,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00013783333,
              'm_query_time_avg': 2.142598e-07,
              'm_query_time_sum': 0.00827,
              'num_queries_sum': 38598,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.00014,
              'm_query_time_avg': 1.6502948e-07,
              'm_query_time_sum': 0.0084,
              'num_queries_sum': 50900,
              'point': 52,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.0001005,
              'm_query_time_avg': 2.008594e-07,
              'm_query_time_sum': 0.00603,
              'num_queries_sum': 30021,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 1.7499999e-05,
              'm_query_time_avg': 1.6509433e-07,
              'm_query_time_sum': 0.00105,
              'num_queries_sum': 6360,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 0.000156,
              'm_query_time_avg': 2.0642658e-07,
              'm_query_time_sum': 0.0093600005,
              'num_queries_sum': 45343,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.533333e-05,
              'm_query_time_avg': 1.691607e-07,
              'm_query_time_sum': 0.00572,
              'num_queries_sum': 33814,
              'point': 56,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 9.1e-05,
              'm_query_time_avg': 1.7487109e-07,
              'm_query_time_sum': 0.0054599997,
              'num_queries_sum': 31223,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 7.833333e-05,
              'm_query_time_avg': 2.2682303e-07,
              'm_query_time_sum': 0.0047,
              'num_queries_sum': 20721,
              'point': 58,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0,
              'm_query_load': 8.15e-05,
              'm_query_time_avg': 2.4404852e-07,
              'm_query_time_sum': 0.00489,
              'num_queries_sum': 20037,
              'point': 59,
              'time_frame': 60,
              'timestamp': 1546300800
            }
          }
        ]
      },
      {
        'dimension': '5D730C79CA046D88',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 8,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0.00127,
              'm_query_load': 0.0005696667,
              'm_query_time_avg': 3.4948876e-06,
              'm_query_time_sum': 0.03418,
              'num_queries_sum': 9780,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00355,
              'm_query_load': 0.0013965,
              'm_query_time_avg': 4.3394275e-06,
              'm_query_time_sum': 0.083790004,
              'num_queries_sum': 19309,
              'point': 2,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00122,
              'm_query_load': 0.0005543333,
              'm_query_time_avg': 2.5081065e-06,
              'm_query_time_sum': 0.03326,
              'num_queries_sum': 13261,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00346,
              'm_query_load': 0.0014448334,
              'm_query_time_avg': 2.7572278e-06,
              'm_query_time_sum': 0.08669,
              'num_queries_sum': 31441,
              'point': 4,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00207,
              'm_query_load': 0.0008811667,
              'm_query_time_avg': 2.220216e-06,
              'm_query_time_sum': 0.05287,
              'num_queries_sum': 23813,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00332,
              'm_query_load': 0.0014538333,
              'm_query_time_avg': 3.5766122e-06,
              'm_query_time_sum': 0.08723,
              'num_queries_sum': 24389,
              'point': 6,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00394,
              'm_query_load': 0.0017068334,
              'm_query_time_avg': 3.3231659e-06,
              'm_query_time_sum': 0.10241,
              'num_queries_sum': 30817,
              'point': 7,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00209,
              'm_query_load': 0.00085333333,
              'm_query_time_avg': 2.846342e-06,
              'm_query_time_sum': 0.051200002,
              'num_queries_sum': 17988,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00623,
              'm_query_load': 0.0027533334,
              'm_query_time_avg': 4.1145704e-06,
              'm_query_time_sum': 0.1652,
              'num_queries_sum': 40150,
              'point': 9,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00197,
              'm_query_load': 0.0008745,
              'm_query_time_avg': 3.4011798e-06,
              'm_query_time_sum': 0.05247,
              'num_queries_sum': 15427,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00119,
              'm_query_load': 0.0005733333,
              'm_query_time_avg': 3.4705406e-06,
              'm_query_time_sum': 0.0344,
              'num_queries_sum': 9912,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00063,
              'm_query_load': 0.00027233333,
              'm_query_time_avg': 3.6190477e-06,
              'm_query_time_sum': 0.01634,
              'num_queries_sum': 4515,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00405,
              'm_query_load': 0.0017456666,
              'm_query_time_avg': 4.0076525e-06,
              'm_query_time_sum': 0.10474,
              'num_queries_sum': 26135,
              'point': 13,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00279,
              'm_query_load': 0.0011568334,
              'm_query_time_avg': 3.6042165e-06,
              'm_query_time_sum': 0.06941,
              'num_queries_sum': 19258,
              'point': 14,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00457,
              'm_query_load': 0.002017,
              'm_query_time_avg': 2.9403047e-06,
              'm_query_time_sum': 0.121020004,
              'num_queries_sum': 41159,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00348,
              'm_query_load': 0.0014146667,
              'm_query_time_avg': 3.1303705e-06,
              'm_query_time_sum': 0.084879994,
              'num_queries_sum': 27115,
              'point': 16,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00325,
              'm_query_load': 0.0014643333,
              'm_query_time_avg': 3.2537125e-06,
              'm_query_time_sum': 0.08786,
              'num_queries_sum': 27003,
              'point': 17,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00263,
              'm_query_load': 0.0011753333,
              'm_query_time_avg': 3.8881844e-06,
              'm_query_time_sum': 0.07052,
              'num_queries_sum': 18137,
              'point': 18,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0032000002,
              'm_query_load': 0.0014268333,
              'm_query_time_avg': 4.968659e-06,
              'm_query_time_sum': 0.08561,
              'num_queries_sum': 17230,
              'point': 19,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0031400002,
              'm_query_load': 0.0014411666,
              'm_query_time_avg': 2.836849e-06,
              'm_query_time_sum': 0.08647,
              'num_queries_sum': 30481,
              'point': 20,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00125,
              'm_query_load': 0.00057316665,
              'm_query_time_avg': 3.3835104e-06,
              'm_query_time_sum': 0.03439,
              'num_queries_sum': 10164,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00251,
              'm_query_load': 0.0011406667,
              'm_query_time_avg': 2.681713e-06,
              'm_query_time_sum': 0.06844,
              'num_queries_sum': 25521,
              'point': 22,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00204,
              'm_query_load': 0.0008655,
              'm_query_time_avg': 2.7834055e-06,
              'm_query_time_sum': 0.05193,
              'num_queries_sum': 18657,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00391,
              'm_query_load': 0.0017098334,
              'm_query_time_avg': 5.311141e-06,
              'm_query_time_sum': 0.10259,
              'num_queries_sum': 19316,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00296,
              'm_query_load': 0.0011903333,
              'm_query_time_avg': 2.9528258e-06,
              'm_query_time_sum': 0.07142,
              'num_queries_sum': 24187,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0019999999,
              'm_query_load': 0.0008588333,
              'm_query_time_avg': 2.8990155e-06,
              'm_query_time_sum': 0.05153,
              'num_queries_sum': 17775,
              'point': 26,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00385,
              'm_query_load': 0.0017561667,
              'm_query_time_avg': 3.7483546e-06,
              'm_query_time_sum': 0.10537,
              'num_queries_sum': 28111,
              'point': 27,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00263,
              'm_query_load': 0.0011631667,
              'm_query_time_avg': 2.9403834e-06,
              'm_query_time_sum': 0.06979,
              'num_queries_sum': 23735,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00194,
              'm_query_load': 0.000924,
              'm_query_time_avg': 3.1149566e-06,
              'm_query_time_sum': 0.05544,
              'num_queries_sum': 17798,
              'point': 30,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00139,
              'm_query_load': 0.00059383333,
              'm_query_time_avg': 2.0109492e-06,
              'm_query_time_sum': 0.03563,
              'num_queries_sum': 17718,
              'point': 31,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0019100001,
              'm_query_load': 0.00085716665,
              'm_query_time_avg': 3.4410543e-06,
              'm_query_time_sum': 0.051429998,
              'num_queries_sum': 14946,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0022,
              'm_query_load': 0.0008841667,
              'm_query_time_avg': 6.046273e-06,
              'm_query_time_sum': 0.05305,
              'num_queries_sum': 8774,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00377,
              'm_query_load': 0.0017351666,
              'm_query_time_avg': 2.7747867e-06,
              'm_query_time_sum': 0.10411,
              'num_queries_sum': 37520,
              'point': 34,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00479,
              'm_query_load': 0.0020615,
              'm_query_time_avg': 3.726388e-06,
              'm_query_time_sum': 0.12369,
              'num_queries_sum': 33193,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00368,
              'm_query_load': 0.0015093334,
              'm_query_time_avg': 3.3885876e-06,
              'm_query_time_sum': 0.090560004,
              'num_queries_sum': 26725,
              'point': 36,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00059,
              'm_query_load': 0.00028633332,
              'm_query_time_avg': 2.6341613e-06,
              'm_query_time_sum': 0.01718,
              'num_queries_sum': 6522,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00257,
              'm_query_load': 0.0011373333,
              'm_query_time_avg': 3.4862574e-06,
              'm_query_time_sum': 0.06824,
              'num_queries_sum': 19574,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00328,
              'm_query_load': 0.0014093333,
              'm_query_time_avg': 4.8152156e-06,
              'm_query_time_sum': 0.08456,
              'num_queries_sum': 17561,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0030999999,
              'm_query_load': 0.0014718333,
              'm_query_time_avg': 2.5396141e-06,
              'm_query_time_sum': 0.08831,
              'num_queries_sum': 34773,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00125,
              'm_query_load': 0.000573,
              'm_query_time_avg': 7.1018385e-06,
              'm_query_time_sum': 0.03438,
              'num_queries_sum': 4841,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00411,
              'm_query_load': 0.0016851666,
              'm_query_time_avg': 2.4349774e-06,
              'm_query_time_sum': 0.10111,
              'num_queries_sum': 41524,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00063,
              'm_query_load': 0.00027283333,
              'm_query_time_avg': 2.7466444e-06,
              'm_query_time_sum': 0.01637,
              'num_queries_sum': 5960,
              'point': 43,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0026699998,
              'm_query_load': 0.0011381666,
              'm_query_time_avg': 2.6450539e-06,
              'm_query_time_sum': 0.068289995,
              'num_queries_sum': 25818,
              'point': 44,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00122,
              'm_query_load': 0.00062616664,
              'm_query_time_avg': 7.2291705e-06,
              'm_query_time_sum': 0.03757,
              'num_queries_sum': 5197,
              'point': 45,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00165,
              'm_query_load': 0.0006058333,
              'm_query_time_avg': 5.066908e-06,
              'm_query_time_sum': 0.036349997,
              'num_queries_sum': 7174,
              'point': 46,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00304,
              'm_query_load': 0.0014896666,
              'm_query_time_avg': 3.7679692e-06,
              'm_query_time_sum': 0.089379996,
              'num_queries_sum': 23721,
              'point': 47,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00349,
              'm_query_load': 0.0015451666,
              'm_query_time_avg': 3.740418e-06,
              'm_query_time_sum': 0.092709996,
              'num_queries_sum': 24786,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00263,
              'm_query_load': 0.0011234999,
              'm_query_time_avg': 3.5488285e-06,
              'm_query_time_sum': 0.06741,
              'num_queries_sum': 18995,
              'point': 49,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0019999999,
              'm_query_load': 0.0008758333,
              'm_query_time_avg': 2.6036764e-06,
              'm_query_time_sum': 0.052550003,
              'num_queries_sum': 20183,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00373,
              'm_query_load': 0.0016878333,
              'm_query_time_avg': 2.4525925e-06,
              'm_query_time_sum': 0.101270005,
              'num_queries_sum': 41291,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00345,
              'm_query_load': 0.0014641667,
              'm_query_time_avg': 4.1059075e-06,
              'm_query_time_sum': 0.08785,
              'num_queries_sum': 21396,
              'point': 52,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00304,
              'm_query_load': 0.0014046667,
              'm_query_time_avg': 4.198675e-06,
              'm_query_time_sum': 0.08428,
              'num_queries_sum': 20073,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00281,
              'm_query_load': 0.0011435,
              'm_query_time_avg': 1.1385662e-05,
              'm_query_time_sum': 0.06861,
              'num_queries_sum': 6026,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0022399998,
              'm_query_load': 0.0008823333,
              'm_query_time_avg': 2.0439365e-06,
              'm_query_time_sum': 0.05294,
              'num_queries_sum': 25901,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00391,
              'm_query_load': 0.0017255,
              'm_query_time_avg': 2.755216e-06,
              'm_query_time_sum': 0.10353,
              'num_queries_sum': 37576,
              'point': 56,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00232,
              'm_query_load': 0.001164,
              'm_query_time_avg': 3.8337816e-06,
              'm_query_time_sum': 0.06984,
              'num_queries_sum': 18217,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00393,
              'm_query_load': 0.0017896666,
              'm_query_time_avg': 3.7415937e-06,
              'm_query_time_sum': 0.107379995,
              'num_queries_sum': 28699,
              'point': 58,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00261,
              'm_query_load': 0.0011541666,
              'm_query_time_avg': 2.6803684e-06,
              'm_query_time_sum': 0.06925,
              'num_queries_sum': 25836,
              'point': 59,
              'time_frame': 60,
              'timestamp': 1546300800
            }
          }
        ]
      },
      {
        'dimension': 'DFC1D304DA3FA3EC',
        'metrics': {
          'load': {
            'stats': {
              'cnt': 1789,
              'max': 0.000162,
              'p99': 3.0334824e-05,
              'rate': 1,
              'sum': 0.54269
            }
          },
          'latancy': {
            'stats': {
              'rate': 0.55897486,
              'cnt': 370,
              'sum': 6.02026,
              'min': 0.001414,
              'max': 0.002205,
              'p99': 0.0016270973
            }
          },
        },
        'rank': 9,
        'sparkline': [
          {
            'values': {
              'm_lock_time_sum': 0.00478,
              'm_query_load': 0.0013635,
              'm_query_time_avg': 2.7155043e-06,
              'm_query_time_sum': 0.08181,
              'num_queries_sum': 30127,
              'point': 1,
              'time_frame': 60,
              'timestamp': 1546304400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00336,
              'm_query_load': 0.0007861667,
              'm_query_time_avg': 3.98328e-06,
              'm_query_time_sum': 0.04717,
              'num_queries_sum': 11842,
              'point': 2,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00823,
              'm_query_load': 0.0021988333,
              'm_query_time_avg': 3.3171577e-06,
              'm_query_time_sum': 0.13193,
              'num_queries_sum': 39772,
              'point': 3,
              'time_frame': 60,
              'timestamp': 1546304300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00729,
              'm_query_load': 0.0019086667,
              'm_query_time_avg': 3.5315159e-06,
              'm_query_time_sum': 0.11452,
              'num_queries_sum': 32428,
              'point': 4,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00324,
              'm_query_load': 0.0007915,
              'm_query_time_avg': 3.6606798e-06,
              'm_query_time_sum': 0.04749,
              'num_queries_sum': 12973,
              'point': 5,
              'time_frame': 60,
              'timestamp': 1546304100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00506,
              'm_query_load': 0.0013901667,
              'm_query_time_avg': 4.4902026e-06,
              'm_query_time_sum': 0.08341,
              'num_queries_sum': 18576,
              'point': 6,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0049799997,
              'm_query_load': 0.0013498333,
              'm_query_time_avg': 2.9873484e-06,
              'm_query_time_sum': 0.08099,
              'num_queries_sum': 27111,
              'point': 7,
              'time_frame': 60,
              'timestamp': 1546304000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00653,
              'm_query_load': 0.0017441667,
              'm_query_time_avg': 2.9226944e-06,
              'm_query_time_sum': 0.10465,
              'num_queries_sum': 35806,
              'point': 8,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01324,
              'm_query_load': 0.0035473334,
              'm_query_time_avg': 3.1415498e-06,
              'm_query_time_sum': 0.21284,
              'num_queries_sum': 67750,
              'point': 9,
              'time_frame': 60,
              'timestamp': 1546303900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00829,
              'm_query_load': 0.0022695,
              'm_query_time_avg': 2.5547843e-06,
              'm_query_time_sum': 0.13617,
              'num_queries_sum': 53300,
              'point': 10,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00989,
              'm_query_load': 0.0026531667,
              'm_query_time_avg': 4.7932913e-06,
              'm_query_time_sum': 0.15919,
              'num_queries_sum': 33211,
              'point': 11,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0023400001,
              'm_query_load': 0.00054383336,
              'm_query_time_avg': 2.7556794e-06,
              'm_query_time_sum': 0.03263,
              'num_queries_sum': 11841,
              'point': 12,
              'time_frame': 60,
              'timestamp': 1546303700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00814,
              'm_query_load': 0.0021783332,
              'm_query_time_avg': 2.725415e-06,
              'm_query_time_sum': 0.1307,
              'num_queries_sum': 47956,
              'point': 13,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00646,
              'm_query_load': 0.0016063333,
              'm_query_time_avg': 2.4625053e-06,
              'm_query_time_sum': 0.09638,
              'num_queries_sum': 39139,
              'point': 14,
              'time_frame': 60,
              'timestamp': 1546303600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00417,
              'm_query_load': 0.0010665,
              'm_query_time_avg': 2.4792716e-06,
              'm_query_time_sum': 0.063990004,
              'num_queries_sum': 25810,
              'point': 15,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00897,
              'm_query_load': 0.0021201666,
              'm_query_time_avg': 2.8942939e-06,
              'm_query_time_sum': 0.12720999,
              'num_queries_sum': 43952,
              'point': 16,
              'time_frame': 60,
              'timestamp': 1546303500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.012800001,
              'm_query_load': 0.0032523335,
              'm_query_time_avg': 3.3860838e-06,
              'm_query_time_sum': 0.19514,
              'num_queries_sum': 57630,
              'point': 17,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00734,
              'm_query_load': 0.0018805,
              'm_query_time_avg': 2.9374398e-06,
              'm_query_time_sum': 0.11283,
              'num_queries_sum': 38411,
              'point': 18,
              'time_frame': 60,
              'timestamp': 1546303400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00497,
              'm_query_load': 0.001312,
              'm_query_time_avg': 2.7579442e-06,
              'm_query_time_sum': 0.07872,
              'num_queries_sum': 28543,
              'point': 19,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00284,
              'm_query_load': 0.0007995,
              'm_query_time_avg': 2.3425139e-06,
              'm_query_time_sum': 0.04797,
              'num_queries_sum': 20478,
              'point': 20,
              'time_frame': 60,
              'timestamp': 1546303200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00094,
              'm_query_load': 0.00026833333,
              'm_query_time_avg': 2.5988702e-06,
              'm_query_time_sum': 0.0161,
              'num_queries_sum': 6195,
              'point': 21,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00491,
              'm_query_load': 0.0013301667,
              'm_query_time_avg': 3.7564719e-06,
              'm_query_time_sum': 0.07981,
              'num_queries_sum': 21246,
              'point': 22,
              'time_frame': 60,
              'timestamp': 1546303100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00661,
              'm_query_load': 0.0016145,
              'm_query_time_avg': 2.2020913e-06,
              'm_query_time_sum': 0.09687,
              'num_queries_sum': 43990,
              'point': 23,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00624,
              'm_query_load': 0.001563,
              'm_query_time_avg': 2.7653928e-06,
              'm_query_time_sum': 0.093779996,
              'num_queries_sum': 33912,
              'point': 24,
              'time_frame': 60,
              'timestamp': 1546303000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00581,
              'm_query_load': 0.001681,
              'm_query_time_avg': 3.4991674e-06,
              'm_query_time_sum': 0.10086,
              'num_queries_sum': 28824,
              'point': 25,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01414,
              'm_query_load': 0.0037495,
              'm_query_time_avg': 3.6631116e-06,
              'm_query_time_sum': 0.22497,
              'num_queries_sum': 61415,
              'point': 26,
              'time_frame': 60,
              'timestamp': 1546302800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0046,
              'm_query_load': 0.0010568333,
              'm_query_time_avg': 2.2005136e-06,
              'm_query_time_sum': 0.06341,
              'num_queries_sum': 28816,
              'point': 27,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00726,
              'm_query_load': 0.0019916666,
              'm_query_time_avg': 3.09177e-06,
              'm_query_time_sum': 0.119500004,
              'num_queries_sum': 38651,
              'point': 28,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00385,
              'm_query_load': 0.001054,
              'm_query_time_avg': 5.009506e-06,
              'm_query_time_sum': 0.06324,
              'num_queries_sum': 12624,
              'point': 29,
              'time_frame': 60,
              'timestamp': 1546302700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00868,
              'm_query_load': 0.0022236665,
              'm_query_time_avg': 4.388527e-06,
              'm_query_time_sum': 0.13341999,
              'num_queries_sum': 30402,
              'point': 30,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00528,
              'm_query_load': 0.0013875,
              'm_query_time_avg': 4.9547675e-06,
              'm_query_time_sum': 0.08325,
              'num_queries_sum': 16802,
              'point': 31,
              'time_frame': 60,
              'timestamp': 1546302600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00207,
              'm_query_load': 0.00051183335,
              'm_query_time_avg': 3.2177284e-06,
              'm_query_time_sum': 0.03071,
              'num_queries_sum': 9544,
              'point': 32,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01009,
              'm_query_load': 0.0026281667,
              'm_query_time_avg': 2.985196e-06,
              'm_query_time_sum': 0.15769,
              'num_queries_sum': 52824,
              'point': 33,
              'time_frame': 60,
              'timestamp': 1546302500
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00493,
              'm_query_load': 0.0013363333,
              'm_query_time_avg': 2.2765473e-06,
              'm_query_time_sum': 0.080180004,
              'num_queries_sum': 35220,
              'point': 34,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00525,
              'm_query_load': 0.0013343333,
              'm_query_time_avg': 3.0052554e-06,
              'm_query_time_sum': 0.080060005,
              'num_queries_sum': 26640,
              'point': 35,
              'time_frame': 60,
              'timestamp': 1546302300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00396,
              'm_query_load': 0.0010561666,
              'm_query_time_avg': 6.097373e-06,
              'm_query_time_sum': 0.06337,
              'num_queries_sum': 10393,
              'point': 36,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0041,
              'm_query_load': 0.0010678333,
              'm_query_time_avg': 2.5878503e-06,
              'm_query_time_sum': 0.06407,
              'num_queries_sum': 24758,
              'point': 37,
              'time_frame': 60,
              'timestamp': 1546302200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00871,
              'm_query_load': 0.0022323334,
              'm_query_time_avg': 3.234094e-06,
              'm_query_time_sum': 0.13394,
              'num_queries_sum': 41415,
              'point': 38,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00398,
              'm_query_load': 0.0010513334,
              'm_query_time_avg': 6.9341545e-06,
              'm_query_time_sum': 0.06308,
              'num_queries_sum': 9097,
              'point': 39,
              'time_frame': 60,
              'timestamp': 1546302100
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0075,
              'm_query_load': 0.0019343334,
              'm_query_time_avg': 3.4263278e-06,
              'm_query_time_sum': 0.11606,
              'num_queries_sum': 33873,
              'point': 40,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01127,
              'm_query_load': 0.0030061665,
              'm_query_time_avg': 2.8026477e-06,
              'm_query_time_sum': 0.18037,
              'num_queries_sum': 64357,
              'point': 41,
              'time_frame': 60,
              'timestamp': 1546302000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00849,
              'm_query_load': 0.002095,
              'm_query_time_avg': 2.6647162e-06,
              'm_query_time_sum': 0.1257,
              'num_queries_sum': 47172,
              'point': 42,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01239,
              'm_query_load': 0.0032271666,
              'm_query_time_avg': 3.3103672e-06,
              'm_query_time_sum': 0.19363,
              'num_queries_sum': 58492,
              'point': 43,
              'time_frame': 60,
              'timestamp': 1546301800
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01021,
              'm_query_load': 0.0027058334,
              'm_query_time_avg': 3.6106665e-06,
              'm_query_time_sum': 0.16235,
              'num_queries_sum': 44964,
              'point': 44,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.01205,
              'm_query_load': 0.0030750001,
              'm_query_time_avg': 3.0822948e-06,
              'm_query_time_sum': 0.18450001,
              'num_queries_sum': 59858,
              'point': 45,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0067499997,
              'm_query_load': 0.0017163333,
              'm_query_time_avg': 8.004664e-06,
              'm_query_time_sum': 0.10298,
              'num_queries_sum': 12865,
              'point': 46,
              'time_frame': 60,
              'timestamp': 1546301700
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.004,
              'm_query_load': 0.0010641667,
              'm_query_time_avg': 2.3323348e-06,
              'm_query_time_sum': 0.06385,
              'num_queries_sum': 27376,
              'point': 47,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.0041,
              'm_query_load': 0.0010851667,
              'm_query_time_avg': 4.02137e-06,
              'm_query_time_sum': 0.06511,
              'num_queries_sum': 16191,
              'point': 48,
              'time_frame': 60,
              'timestamp': 1546301600
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00725,
              'm_query_load': 0.0018516666,
              'm_query_time_avg': 2.7822994e-06,
              'm_query_time_sum': 0.111099996,
              'num_queries_sum': 39931,
              'point': 49,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00189,
              'm_query_load': 0.00054000004,
              'm_query_time_avg': 1.8451026e-05,
              'm_query_time_sum': 0.0324,
              'num_queries_sum': 1756,
              'point': 50,
              'time_frame': 60,
              'timestamp': 1546301400
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00521,
              'm_query_load': 0.0013236667,
              'm_query_time_avg': 5.5026676e-06,
              'm_query_time_sum': 0.07942,
              'num_queries_sum': 14433,
              'point': 51,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00493,
              'm_query_load': 0.001321,
              'm_query_time_avg': 4.3432515e-06,
              'm_query_time_sum': 0.07926,
              'num_queries_sum': 18249,
              'point': 52,
              'time_frame': 60,
              'timestamp': 1546301300
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00692,
              'm_query_load': 0.0018896667,
              'm_query_time_avg': 2.8311026e-06,
              'm_query_time_sum': 0.11338,
              'num_queries_sum': 40048,
              'point': 53,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00548,
              'm_query_load': 0.0014023334,
              'm_query_time_avg': 3.4528891e-06,
              'm_query_time_sum': 0.08414,
              'num_queries_sum': 24368,
              'point': 54,
              'time_frame': 60,
              'timestamp': 1546301200
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00487,
              'm_query_load': 0.0013505,
              'm_query_time_avg': 3.3591741e-06,
              'm_query_time_sum': 0.08103,
              'num_queries_sum': 24122,
              'point': 55,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.010369999,
              'm_query_load': 0.0027228333,
              'm_query_time_avg': 4.4593967e-06,
              'm_query_time_sum': 0.16337,
              'num_queries_sum': 36635,
              'point': 56,
              'time_frame': 60,
              'timestamp': 1546301000
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00845,
              'm_query_load': 0.0022086666,
              'm_query_time_avg': 4.576441e-06,
              'm_query_time_sum': 0.13252,
              'num_queries_sum': 28957,
              'point': 57,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00299,
              'm_query_load': 0.00081583334,
              'm_query_time_avg': 8.146114e-06,
              'm_query_time_sum': 0.04895,
              'num_queries_sum': 6009,
              'point': 58,
              'time_frame': 60,
              'timestamp': 1546300900
            }
          },
          {
            'values': {
              'm_lock_time_sum': 0.00409,
              'm_query_load': 0.0011015,
              'm_query_time_avg': 3.4146215e-06,
              'm_query_time_sum': 0.06609,
              'num_queries_sum': 19355,
              'point': 59,
              'time_frame': 60,
              'timestamp': 1546300800
            }
          }
        ]
      },
    ],
    'total_rows': 9
  };

  public tableData: any;

  public totalRows: number;
  public queries: any;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
  ) {
    super(route, router, instanceService);
    this.selectedQueryType = this.queryTypes[0];

    this.queries = this.mockQueryProfile.rows;
    this.totalRows = this.mockQueryProfile.total_rows;
  }

  ngOnInit() {
    const mockArray = [
      {
        'Point': 0,
        'Start_ts': '2019-03-21T14:59:28Z',
        'NoData': false,
        'Query_count': 22,
        'Query_load': 0.00044082195,
        'Query_time_avg': 0.0175688
      },
      {
        'Point': 1,
        'Start_ts': '2019-03-21T14:47:28Z',
        'NoData': false,
        'Query_count': 25,
        'Query_load': 0.0008300738,
        'Query_time_avg': 0.01754594
      },
      {
        'Point': 2,
        'Start_ts': '2019-03-21T14:35:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00052262266,
        'Query_time_avg': 0.01741783
      },
      {
        'Point': 3,
        'Start_ts': '2019-03-21T14:23:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.0006480602,
        'Query_time_avg': 0.0173951
      },
      {
        'Point': 4,
        'Start_ts': '2019-03-21T14:11:28Z',
        'NoData': false,
        'Query_count': 6,
        'Query_load': 0.00034209044,
        'Query_time_avg': 0.017283598
      },
      {
        'Point': 5,
        'Start_ts': '2019-03-21T13:59:28Z',
        'NoData': false,
        'Query_count': 18,
        'Query_load': 0.0003708497,
        'Query_time_avg': 0.01715585
      },
      {
        'Point': 6,
        'Start_ts': '2019-03-21T13:47:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.0004104204,
        'Query_time_avg': 0.017298305
      },
      {
        'Point': 7,
        'Start_ts': '2019-03-21T13:35:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00075334636,
        'Query_time_avg': 0.017178468
      },
      {
        'Point': 8,
        'Start_ts': '2019-03-21T13:23:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.000698235,
        'Query_time_avg': 0.01712988
      },
      {
        'Point': 9,
        'Start_ts': '2019-03-21T13:11:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00048711765,
        'Query_time_avg': 0.01696416
      },
      {
        'Point': 10,
        'Start_ts': '2019-03-21T12:59:28Z',
        'NoData': false,
        'Query_count': 2,
        'Query_load': 0.00007934625,
        'Query_time_avg': 0.01707627
      },
      {
        'Point': 11,
        'Start_ts': '2019-03-21T12:47:28Z',
        'NoData': false,
        'Query_count': 10,
        'Query_load': 0.00020919568,
        'Query_time_avg': 0.01707124
      },
      {
        'Point': 12,
        'Start_ts': '2019-03-21T12:35:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.0006085776,
        'Query_time_avg': 0.0171027
      },
      {
        'Point': 13,
        'Start_ts': '2019-03-21T12:23:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00075663766,
        'Query_time_avg': 0.01678981
      },
      {
        'Point': 14,
        'Start_ts': '2019-03-21T12:11:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.0007241547,
        'Query_time_avg': 0.016381245
      },
      {
        'Point': 15,
        'Start_ts': '2019-03-21T11:59:28Z',
        'NoData': false,
        'Query_count': 28,
        'Query_load': 0.0012239272,
        'Query_time_avg': 0.015832406
      },
      {
        'Point': 16,
        'Start_ts': '2019-03-21T11:47:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00065410184,
        'Query_time_avg': 0.01477689
      },
      {
        'Point': 17,
        'Start_ts': '2019-03-21T11:35:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00043718418,
        'Query_time_avg': 0.014516711
      },
      {
        'Point': 18,
        'Start_ts': '2019-03-21T11:23:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00042974917,
        'Query_time_avg': 0.014694266
      },
      {
        'Point': 19,
        'Start_ts': '2019-03-21T11:11:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00066831027,
        'Query_time_avg': 0.014599123
      },
      {
        'Point': 20,
        'Start_ts': '2019-03-21T10:59:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00054119126,
        'Query_time_avg': 0.014046963
      },
      {
        'Point': 21,
        'Start_ts': '2019-03-21T10:47:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 51240.957,
        'Query_time_avg': 0.014008578
      },
      {
        'Point': 22,
        'Start_ts': '2019-03-21T10:35:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00041493305,
        'Query_time_avg': 0.014576021
      },
      {
        'Point': 23,
        'Start_ts': '2019-03-21T10:23:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.0005657964,
        'Query_time_avg': 0.014349163
      },
      {
        'Point': 24,
        'Start_ts': '2019-03-21T10:11:28Z',
        'NoData': false,
        'Query_count': 22,
        'Query_load': 0.0010165278,
        'Query_time_avg': 0.0138633745
      },
      {
        'Point': 25,
        'Start_ts': '2019-03-21T09:59:28Z',
        'NoData': false,
        'Query_count': 20,
        'Query_load': 0.0002015177,
        'Query_time_avg': 0.010449383
      },
      {
        'Point': 26,
        'Start_ts': '2019-03-21T09:47:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00022416704,
        'Query_time_avg': 0.0113805765
      },
      {
        'Point': 27,
        'Start_ts': '2019-03-21T09:35:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00040449965,
        'Query_time_avg': 0.013443847
      },
      {
        'Point': 28,
        'Start_ts': '2019-03-21T09:23:28Z',
        'NoData': false,
        'Query_count': 24,
        'Query_load': 0.00020293423,
        'Query_time_avg': 0.016280053
      },
      {
        'Point': 29,
        'Start_ts': '2019-03-21T09:11:28Z',
        'NoData': false,
        'Query_count': 8,
        'Query_load': 0.00014011432,
        'Query_time_avg': 0.03430918
      },
      {
        'Point': 30,
        'Start_ts': '2019-03-21T08:59:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 31,
        'Start_ts': '2019-03-21T08:47:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 32,
        'Start_ts': '2019-03-21T08:35:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 33,
        'Start_ts': '2019-03-21T08:23:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 34,
        'Start_ts': '2019-03-21T08:11:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 35,
        'Start_ts': '2019-03-21T07:59:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 36,
        'Start_ts': '2019-03-21T07:47:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 37,
        'Start_ts': '2019-03-21T07:35:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 38,
        'Start_ts': '2019-03-21T07:23:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 39,
        'Start_ts': '2019-03-21T07:11:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 40,
        'Start_ts': '2019-03-21T06:59:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 41,
        'Start_ts': '2019-03-21T06:47:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 42,
        'Start_ts': '2019-03-21T06:35:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 43,
        'Start_ts': '2019-03-21T06:23:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 44,
        'Start_ts': '2019-03-21T06:11:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 45,
        'Start_ts': '2019-03-21T05:59:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 46,
        'Start_ts': '2019-03-21T05:47:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 47,
        'Start_ts': '2019-03-21T05:35:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 48,
        'Start_ts': '2019-03-21T05:23:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 49,
        'Start_ts': '2019-03-21T05:11:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 50,
        'Start_ts': '2019-03-21T04:59:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 51,
        'Start_ts': '2019-03-21T04:47:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 52,
        'Start_ts': '2019-03-21T04:35:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 53,
        'Start_ts': '2019-03-21T04:23:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 54,
        'Start_ts': '2019-03-21T04:11:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 55,
        'Start_ts': '2019-03-21T03:59:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 56,
        'Start_ts': '2019-03-21T03:47:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 57,
        'Start_ts': '2019-03-21T03:35:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      },
      {
        'Point': 58,
        'Start_ts': '2019-03-21T03:23:28Z',
        'NoData': true,
        'Query_count': 0,
        'Query_load': 0,
        'Query_time_avg': 0
      }
    ];
    const entriesArray = Object.entries(this.listColumns);
    this.selectOptions = entriesArray.map(item => new SelectOptionModel(item));
    this.tableData = this.mockQueryProfile.rows.map(row => new TableDataModel(row));
  }

  ngOnChanges() {
  }

  addColumn() {
    this.tableData.forEach(query => query.metrics.push(new MetricModel()));
    setTimeout(() => this.componentRef.directiveRef.scrollToRight(), 0);
  }

  /**
   * Check if current query is first seen for current date
   * @param currentQuery - query in main qan-table
   */
  checkFirstSeen(currentQuery) {
    this.isFirstSeen = moment.utc(currentQuery['FirstSeen']).valueOf() > moment.utc(this.fromUTCDate).valueOf();
    return this.isFirstSeen;
  }

  /**
   * Set router parameters if query is checked in main qan-table
   * @param queryID - checked queries' id
   * @return query params of current query
   */
  composeQueryParamsForGrid(queryID: string = ''): QueryParams {
    const queryParams: QueryParams = Object.assign({}, this.queryParams);
    queryParams.queryID = queryID || 'TOTAL';
    return queryParams;
  }


  onChangeParams(params): void {
  }
}
