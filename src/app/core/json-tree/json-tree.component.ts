import {Component, Input, OnChanges, ElementRef} from '@angular/core';
import * as renderjson from 'renderjson';

@Component({
  selector: 'app-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss']
})

export class JSONTreeComponent implements OnChanges {
  public element: ElementRef;
  public isCopied = false;
  public isCollapsed = false;

  @Input() public json: any;

  constructor(element: ElementRef) {
    this.element = element;
    renderjson.set_icons('+', '-');
  }

  ngOnChanges() {
    this.element.nativeElement.getElementById('json-viewer').appendChild(renderjson(this.json));
  }

  public toggleAll() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      renderjson.set_show_to_level('all');
    } else {
      renderjson.set_show_to_level();
    }
  }
}


