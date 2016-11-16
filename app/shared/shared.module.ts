import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { MapToIterablePipe } from './map-to-iterable.pipe';
import { MomentFormatPipe } from './moment-format.pipe';
import { TruncateRootPipe } from './truncate-root.pipe';
import { HumanizePipe } from './humanize.pipe';
import { LatencyCartDirective } from './latency-chart.directive'


@NgModule({
    imports: [CommonModule],
    declarations: [MapToIterablePipe, MomentFormatPipe, TruncateRootPipe, HumanizePipe, LatencyCartDirective],
    exports: [MapToIterablePipe, MomentFormatPipe, TruncateRootPipe, HumanizePipe, LatencyCartDirective,
        CommonModule, FormsModule, HttpModule, NgbModule, RouterModule]
})
export class SharedModule { }