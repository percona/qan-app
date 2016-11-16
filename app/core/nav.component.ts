import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import 'moment-timezone';

import { Instance, Navigation, NavService } from './nav.service';

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

moment.fn.toString = function () {
  return this.clone().locale('en').format(moment.defaultFormat);
}
moment.tz.setDefault('America/Los_Angeles');

// export class Section {
//   constructor(
//     public begin: moment.Moment,
//     public end: moment.Moment,
//     public search: string,
//     public db: string
//   ) { }
// }

@Component({
  selector: 'nav',
  templateUrl: 'app/core/nav.component.html',
  styles: [`
                  .full button span {
                    background-color: limegreen;
                    border-radius: 32px;
                    color: black;
                  }
                  .partially button span {
                    background-color: orange;
                    border-radius: 32px;
                    color: black;
                  }

            `]
})
export class NavComponent implements OnInit {

  private formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  private format = this.formats[0];
  private maxDateTo: Date = moment().toDate();
  private maxDateFrom: Date = moment().toDate();
  private minDate: Date;
  public dtTo: moment.Moment = moment();
  public dtFrom: moment.Moment = moment().subtract(1, 'h');
  public dtToCal: Date = moment().toDate();
  public dtFromCal: Date = (moment().subtract(1, 'd').toDate());
  public dbServers: Array<Instance>;
  public search: string;
  public isDropdownOpen: boolean = false;
  public navigation: Navigation = new Navigation();
  private navigationSubscription: Subscription;


  public constructor(private route: ActivatedRoute, private router: Router, private navService: NavService) {
    // select db server
    this.navigationSubscription = this.navService.navigation$.subscribe(nav => {
      this.navigation = nav;
    });
  }

  public getDBLogo(distro: string): string {
    var src: string;
    switch (true) {
      case distro.indexOf('Percona Server') !== -1:
        src = 'img/percona-server-black-50.png';
        break;
      case distro.indexOf('Percona XtraDB') !== -1:
        src = 'img/Percona_XtraDB_Cluster.png';
        break;
      default:
        src = 'img/database.png';
        break;
    }
    return src;
  }

  public setHotRange(amount: number, unitOfTime: string): boolean {
    this.dtFrom = moment().subtract(amount, unitOfTime).format();
    this.dtTo = moment();
    return false;
  }

  onDateChanged(date: any, valueOf: string) {
    if (!this.isDropdownOpen) {
      return;
    }

    switch (valueOf) {
      case 'dtFromCal':
        if (date.constructor.toString().indexOf("Date") > -1) {
          this.minDate = date;
          if (moment(this.dtFromCal).isBefore(this.dtToCal)) {
            console.log(this.dtToCal);
            this.dtToCal = moment(this.dtToCal).set({ hour: 23, minute: 59, second: 59 }).toDate();
            console.log(this.dtToCal);
          } else {
            this.dtToCal = moment(this.dtFromCal).set({ hour: 23, minute: 59, second: 59 }).toDate();
          }
          this.dtFrom = moment(date).set({ hour: 0, minute: 0, second: 0 });
        }
        break;
      case 'dtToCal':
        if (date.constructor.toString().indexOf("Date") > -1) {
          this.maxDateFrom = date;
          if (moment(this.dtFromCal).isBefore(this.dtToCal)) {
            this.dtFromCal = moment(this.dtFromCal).set({ hour: 0, minute: 0, second: 0 }).toDate();
          } else {
            this.dtFromCal = moment(this.dtToCal).set({ hour: 0, minute: 0, second: 0 }).toDate();
          }
          this.dtTo = moment(date).set({ hour: 23, minute: 59, second: 59 });
        }
        break;
      case 'dtFrom':
        this.dtFromCal = moment(date.target.value).toDate();
        break;
      case 'dtTo':
        this.dtToCal = moment(date.target.value).toDate();
        break;
    }
  }

  getDBServers() {
    this.navService
      .getDBServers()
      .then(dbServers => {
        this.dbServers = dbServers;
      })
      .catch(err => console.log(err));
  }

  closeCalendars() {
    this.isDropdownOpen = false;
  }

  openCalendars() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
    this.getDBServers();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}