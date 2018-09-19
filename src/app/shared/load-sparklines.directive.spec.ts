/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LoadSparklinesDirective } from './load-sparklines.directive';

fdescribe('LoadSparklinesDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef('<div></div>');
    const directive = new LoadSparklinesDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
