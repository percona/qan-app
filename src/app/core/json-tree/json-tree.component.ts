import {Component, Input, OnChanges, ElementRef} from '@angular/core';
import * as renderjson from 'renderjson';

@Component({
  selector: 'app-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss']
})

export class JSONTreeComponent implements OnChanges {
  public element: ElementRef;
  public isCollapsed = true;

  @Input() public json: any;

  constructor(element: ElementRef) {
    this.element = element;
    renderjson.set_icons('+', '-');
  }

  /**
   * Reset state of JSON viewer
   */
  ngOnChanges() {
    this.isCollapsed = true;
    this.resetJson();
  }

  /**
   * Collapse all JSON viewer object
   */
  public toggleAll() {
    this.isCollapsed = !this.isCollapsed;
    this.resetJson();
  }

  /**
   * Reset JSON object for viewer
   */
  public resetJson() {
    renderjson.set_show_to_level(this.isCollapsed ? '' : 'all');

    this.element.nativeElement.querySelector('#json-tree__viewer').innerHTML = '';
    this.element.nativeElement.querySelector('#json-tree__viewer').appendChild(renderjson(this.json));
  }
}


