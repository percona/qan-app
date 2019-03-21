import {CoreComponent, QueryParams, QanError} from '../../core/core.component';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InstanceService} from '../../core/services/instance.service';
import {QueryProfileService} from './query-profile.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

const queryProfileError = 'No data. Please check pmm-client and database configurations on selected instance.';

@Component({
  moduleId: module.id,
  templateUrl: 'query-profile.component.html',
  styleUrls: ['./query-profile.component.scss'],
})
export class QueryProfileComponent extends CoreComponent implements OnInit {
  @ViewChild('qanTable') table: ElementRef;

  objectKeys = Object.keys;
  public queryProfile: Array<{}>;
  public profileTotal;
  public offset: number;
  public isAdditionalColumn = false;
  public totalAmountOfQueries: number;
  public leftInDbQueries: number;
  public searchValue: string;
  public fromDate: string;
  public toDate: string;
  public quantityDbQueriesMessage: string;
  public isLoading: boolean;
  public isQueryLoading: boolean;
  public noQueryError: string;
  public isFirstSeen: boolean;
  public isFirstSeenChecked = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public measurement: string;
  public mockQueryProfile = {};

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService,
              public queryProfileService: QueryProfileService
  ) {
    super(route, router, instanceService);

    this.mockQueryProfile = {
      'rows': [
        {
          'metrics': {
            'lock_time': {
              'stats': {
                'cnt': 1789,
                'max': 0.000162,
                'p99': 3.0334824e-05,
                'rate': 1,
                'sum': 0.54269
              }
            },
            'bytes_sent': {
              'stats': {
                'rate': 0.36247563,
                'cnt': 370,
                'sum': 760840,
                'min': 184,
                'max': 249,
                'p99': 205.63243
              }
            },
            'query_time': {
              'stats': {
                'rate': 0.55897486,
                'cnt': 370,
                'sum': 6.02026,
                'min': 0.001414,
                'max': 0.002205,
                'p99': 0.0016270973
              }
            },
            'rows_sent': {
              'stats': {
                'rate': 0.30032468,
                'cnt': 370,
                'sum': 3700,
                'min': 1,
                'max': 1,
                'p99': 1
              }
            }
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
          'dimension': '1D410B4BE5060972',
          'metrics': {
            'lock_time': {
              'stats': {
                'cnt': 1789,
                'max': 0.000162,
                'p99': 3.0334824e-05,
                'rate': 1,
                'sum': 0.54269
              }
            },
            'bytes_sent': {
              'stats': {
                'rate': 0.36247563,
                'cnt': 370,
                'sum': 760840,
                'min': 184,
                'max': 249,
                'p99': 205.63243
              }
            },
            'query_time': {
              'stats': {
                'rate': 0.55897486,
                'cnt': 370,
                'sum': 6.02026,
                'min': 0.001414,
                'max': 0.002205,
                'p99': 0.0016270973
              }
            },
            'rows_sent': {
              'stats': {
                'rate': 0.30032468,
                'cnt': 370,
                'sum': 3700,
                'min': 1,
                'max': 1,
                'p99': 1
              }
            }
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
        }
      ],
      'total_rows': 1
    };
  }

  ngOnInit() {
  }

  /**
   * Load query if params have been changed
   * @param params - current link params
   */
  onChangeParams(params) {
    // checks changing tz
    this.fromDate = moment(this.from).format('llll');
    this.toDate = moment(this.to).format('llll');

    // only if host, from and to are different from prev router - load queries.
    if (!this.previousQueryParams ||
      this.previousQueryParams['var-host'] !== this.queryParams['var-host'] ||
      this.previousQueryParams.from !== this.queryParams.from ||
      this.previousQueryParams.to !== this.queryParams.to ||
      this.previousQueryParams.search !== this.queryParams.search ||
      this.previousQueryParams.first_seen !== this.queryParams.first_seen ||
      this.previousQueryParams.tz !== this.queryParams.tz) {
      this.loadQueries();
    }
  }

  navigateToDetails(subsystem, id) {
    const params = this.composeQueryParamsForGrid(id);
    this.router.navigate(['./', 'report', subsystem], {queryParams: params, relativeTo: this.route})
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
   * Load first 10 queries for main qan-table
   */
  public async loadQueries() {
    this.isQueryLoading = true;

    // clear after error
    this.noQueryError = '';
    this.totalAmountOfQueries = this.leftInDbQueries = 0;
    this.queryProfile = [];
    this.searchValue = this.queryParams.search === 'null' ? '' : this.queryParams.search;
    const search = this.queryParams.search === 'null' && this.searchValue !== 'NULL' ? '' : this.queryParams.search;
    const firstSeen = this.queryParams.first_seen;
    this.offset = 0;
    try {
      const data = await this.queryProfileService
        .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
      if (data.hasOwnProperty('Error') && data['Error'] !== '') {
        this.testingVariable = true;
        throw new QanError('Queries are not available.');
      }
      this.totalAmountOfQueries = data['TotalQueries'];
      if (this.totalAmountOfQueries > 0) {
        this.queryProfile = data['Query'];
        this.countDbQueries();
        this.profileTotal = this.queryProfile[0];
      }
    } catch (err) {
      this.noQueryError = err.name === QanError.errType ? err.message : queryProfileError;
    } finally {
      this.isQueryLoading = false;
    }
    // console.log(JSON.stringify(this.queryProfile[1]['Log']));
  }

  /**
   * Load next 10 queries for main qan-table
   */
  public async loadMoreQueries() {
    this.isLoading = true;
    this.offset = this.offset + 10;
    const dbServerUUID = this.dbServer.UUID;
    const search =
      this.queryParams.search === 'null' &&
      this.searchValue !== 'NULL' && this.searchValue !== 'null' ? '' : this.queryParams.search;
    const firstSeen = this.queryParams.first_seen;
    const data = await this.queryProfileService
      .getQueryProfile(dbServerUUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);

    const _ = data['Query'].shift();
    for (const q of data['Query']) {
      this.queryProfile.push(q);
    }
    this.countDbQueries();
    this.isLoading = false;
  }

  /**
   * Count how queries left in main qan-table
   */
  countDbQueries() {
    this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
    this.quantityDbQueriesMessage = this.leftInDbQueries > 0 ?
      `Load next ${this.leftInDbQueries > 10 ? 10 : this.leftInDbQueries} queries` :
      'No more queries for selected time range';
  }

  /**
   * Set router parameters if query is checked in main qan-table
   * @param queryID - checked queries' id
   * @return query params of current query
   */
  composeQueryParamsForGrid(queryID: string | null): QueryParams {
    const queryParams: QueryParams = Object.assign({}, this.queryParams);
    queryParams.queryID = queryID || 'TOTAL';
    return queryParams;
  }

  /**
   * Show search queries result for main qan-table
   */
  search() {
    this.isSearchQuery = true;
    const params: QueryParams = Object.assign({}, this.queryParams);
    if (!!this.searchValue) {
      params.search = this.searchValue === 'null' ? 'NULL' : this.searchValue;
      this.testingVariable = true;
    } else {
      this.testingVariable = false;
      delete params.search;
    }
    delete params.queryID;
    this.router.navigate(['profile'], {queryParams: params});
  }

  /**
   * Show first-seen queries or restore default state of main qan-table queries
   * if isFirstSeenChecked is false
   * @param isFirstSeenChecked - state for checked switcher for first-seen
   */
  toggleFirstSeen(isFirstSeenChecked = false) {
    this.isQueryLoading = true;
    this.isFirstSeenChecked = isFirstSeenChecked;
    const params: QueryParams = Object.assign({}, this.queryParams);
    if (isFirstSeenChecked) {
      this.testingVariable = true;
      params.first_seen = this.isFirstSeenChecked;
    } else {
      this.testingVariable = false;
      delete params.first_seen;
    }
    delete params.queryID;
    this.router.navigate(['profile'], {queryParams: params});
    this.isQueryLoading = false;
  }
}
