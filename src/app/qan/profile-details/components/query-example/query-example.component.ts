import { Component, Input } from "@angular/core";
import * as vkbeautify from "vkbeautify";
import * as hljs from "highlight.js";
import sqlFormatter from "sql-formatter";

@Component({
  selector: "app-query-example",
  templateUrl: "./query-example.component.html",
  styleUrls: ["./query-example.component.css"]
})
export class QueryExampleComponent {
  @Input() exampleParam: any;
  @Input() beatify: boolean;
  @Input() serviceType: string;

  public isCopied = false;
  event = new Event("showSuccessNotification");

  constructor() {}

  /**
   * Fix beautify dispalying text, will be delete after approve https://github.com/vkiryukhin/vkBeautify/pull/25
   * @param {string} text
   * @returns {string}
   */

  fixBeautifyText(text: string): string {
    return sqlFormatter.format(text.toLowerCase())
      .replace("explain", "EXPLAIN ")
      .replace("  ", " ");
  }

  highlightExampleQuery(exampleText) {
    // TODO: add syntax highlighting
    if (this.beatify) {
      switch (this.serviceType) {
        case "mongodb":
          return vkbeautify.json(exampleText, 2);
          break;
        case "SQL":
          return this.fixBeautifyText(exampleText);
          break;
        default:
          return this.fixBeautifyText(exampleText);
      }
    }
    return "";
  }

  showSuccessNotification() {
    this.isCopied = true;
    window.parent.document.dispatchEvent(this.event);
    setTimeout(() => {
      this.isCopied = false;
    }, 3000);
  }
}
