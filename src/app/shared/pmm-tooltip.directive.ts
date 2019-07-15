import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({ selector: '[appPmmTooltip]' })
export class PmmTooltipDirective implements OnInit {

  @Input('appPmmTooltip') text = '';
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    if (this.text) {
      const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.text = this.text;
    }
  }

  @HostListener('mouseout')
  hide() {
    if (this.text) {
      this.overlayRef.detach();
    }
  }
}
