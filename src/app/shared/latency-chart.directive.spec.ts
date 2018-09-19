/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LatencyChartDirective } from './latency-chart.directive';

fdescribe('LatencyChartDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LatencyChartDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
