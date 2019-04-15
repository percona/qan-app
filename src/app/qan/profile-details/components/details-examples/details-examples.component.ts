import { Component, Input } from '@angular/core';
import * as hljs from 'highlight.js';
import * as vkbeautify from 'vkbeautify';

@Component({
  selector: 'app-details-examples',
  templateUrl: './details-examples.component.html',
  styleUrls: ['./details-examples.component.css']
})
export class DetailsExamplesComponent {
  @Input() exampleParam: any;

  public isCopied = false;
  event = new Event('showSuccessNotification');

  constructor() { }

  /**
   * Fix beautify dispalying text, will be delete after approve https://github.com/vkiryukhin/vkBeautify/pull/25
   * @param {string} text
   * @returns {string}
   */
  fixBeautifyText(text: string): string {
    return vkbeautify.sql(text.toLowerCase()).replace('explain', 'EXPLAIN ').replace('  ', ' ');
  }

  highlightExampleQuery(exampleText) {
    return hljs.highlight('sql', this.fixBeautifyText(exampleText)).value;
  }

  showSuccessNotification() {
    this.isCopied = true;
    window.parent.document.dispatchEvent(this.event);
    setTimeout(() => { this.isCopied = false }, 3000);
  }
}
