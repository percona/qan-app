import { Component, Input } from '@angular/core';
import * as vkbeautify from 'vkbeautify';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-query-example',
  templateUrl: './query-example.component.html',
  styleUrls: ['./query-example.component.css']
})
export class QueryExampleComponent {
  @Input() exampleParam: any;
  @Input() beatify: boolean;

  public isCopied = false;
  event = new Event('showSuccessNotification');

  constructor() {
  }

  /**
   * Fix beautify dispalying text, will be delete after approve https://github.com/vkiryukhin/vkBeautify/pull/25
   * @param {string} text
   * @returns {string}
   */
  fixBeautifyText(text: string): string {
    return vkbeautify.sql(text.toLowerCase()).replace('explain', 'EXPLAIN ').replace('  ', ' ');
  }

  highlightExampleQuery(exampleText) {
    if (this.beatify) {
      exampleText = this.fixBeautifyText(exampleText);
    }
    return hljs.highlight('sql', exampleText).value;
  }

  showSuccessNotification() {
    this.isCopied = true;
    window.parent.document.dispatchEvent(this.event);
    setTimeout(() => {
      this.isCopied = false
    }, 3000);
  }
}
