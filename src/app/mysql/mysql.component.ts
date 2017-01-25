import { Component, OnInit } from '@angular/core';
import { NavService } from '../core/nav/nav.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.scss']
})
export class MySQLComponent implements OnInit {
    private from: string;
    private to: string;

    constructor(private route: ActivatedRoute, private router: Router, private navService: NavService) {
        this.to = moment.utc().format();
        this.from = moment.utc().subtract(1, 'h').format();
    }

    ngOnInit() {
        // FIXME: rewrite this to use async/await
        setTimeout(() => {
            console.log('redirect sleep');
            try {
                this.navService.setNavigation({'subPath': 'profile'});
                const path = ['profile', this.navService.dbServers[0].Name, 'from', this.from, 'to', this.to];
                this.router.navigate(path, { relativeTo: this.route });
            } catch (e) {
                console.error('dbServers is not resolved');
            }
        }, 4000);
    }
}
