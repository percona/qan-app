import {Component, OnInit} from '@angular/core';
import {QanFilterService} from './qan-filter.service';
import {st} from '@angular/core/src/render3';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit {

  public isToggleMenu = false;
  public limitsForFilterItems = {};
  public filterLimit = 4;
  public filterMenuCategories: Array<{}> = [];

  constructor(private qanFilterService: QanFilterService) {
  }

  ngOnInit() {
    this.getParameters();
  }

  getAll(currentCategory) {
    this.limitsForFilterItems[currentCategory.name] =
      this.limitsForFilterItems[currentCategory.name] <= this.filterLimit ? currentCategory.states.length - 1 : this.filterLimit;
  }

  async getParameters() {
    this.filterMenuCategories = await this.qanFilterService.getItems();
    this.filterMenuCategories.forEach(item => this.limitsForFilterItems[item['name']] = this.filterLimit)
  }

  saveConfiguration(state) {
    localStorage.setItem(state.name, JSON.stringify(state));
  }
}
