import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss']
})

export class JSONTreeComponent {
  public nodes: any[];
  public currentJSON: any = {};
  public options: any = {};

  @Input() set json(json: string) {
    if (json) {
      this.currentJSON = JSON.stringify(json);
      this.nodes = this.jsonToArray(json);
    }
  }

  isCollapsed(node) {
    return !node.data.value && node.isCollapsed;
  }

  jsonToArray(item) {
    const arr = [];

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        if (typeof item[key] === 'object' && !item[key].length) {
          arr.push({
            id: key,
            children: this.jsonToArray(item[key])
          });
        } else {
          arr.push({
            id: key,
            nodeClass: `hljs-${typeof item[key]}`,
            value: item[key],
          })
        }
      }
    }

    return arr;
  }
}


