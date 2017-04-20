import { Component, OnInit } from '@angular/core';
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

    constructor(private route: ActivatedRoute, private router: Router) {
        this.to = moment.utc().format();
        this.from = moment.utc().subtract(1, 'h').format();
    }

    ngOnInit() {}
}
