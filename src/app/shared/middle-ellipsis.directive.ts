import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMiddleEllipsis]',
})
export class MiddleEllipsisDirective {
  public dataTooltip: string;
  public value: string;
  public charsLimit = 9;
  public charsToView = 4;

  @Input() set toCrop(name: string) {
    this.value = name;
    this.cropString(this.value);
  }

  constructor(private el: ElementRef) {
  }

  // @HostBinding('attr.data-tooltip')
  //
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.el.nativeElement.innerText = this.value;
  // }
  //
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.cropString(this.value);
  // }

  cropString(name) {
    this.el.nativeElement.innerText =
      name.length > this.charsLimit ? name.slice(0, this.charsToView) + '...' + name.slice(-this.charsToView) : name;
    // this.dataTooltip = name.length > this.charsLimit ? name.slice(0, this.charsToView) + '...' + name.slice(-this.charsToView) : name;
    // this.dataTooltip = !value ? `NA at ${dateToShow}` : `${load} at ${dateToShow}`;

  }
}
