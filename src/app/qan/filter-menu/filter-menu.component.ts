import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FilterMenuService } from './filter-menu.service';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit, OnChanges {
  @Input() currentFilters: any = [];
  public limits = {};
  public defaultLimit = 4;
  public selected = [];

  constructor(
    private filterMenuService: FilterMenuService,
  ) {
    this.filterMenuService.getSelected.subscribe(response => {
      this.selected = response;
      console.log('selected component - ', this.selected);
      console.log('selected currentFilters - ', this.currentFilters);
    });
    console.log('currentFilters component - ', this.currentFilters);
  }

  ngOnInit() {
    console.log('currentFilters component init - ', this.currentFilters);
  }

  ngOnChanges() {
    if (this.currentFilters.length && this.selected.length) {
      this.currentFilters.forEach(item => {
        if (this.selected.includes(selectedItem => selectedItem.groupName === item.filterGroup)) {
          console.log('selectedItem.groupName - ', item.filterGroup);
        }
      });
      // this.selected.forEach(item => )
    }
    console.log('currentFilters component changes - ', this.currentFilters);
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
  }

  setConfigs(selectedFilter) {
    this.selected = this.makeSelectedArray(selectedFilter);
    this.filterMenuService.updateSelected(this.selected);
    // this.filterMenuService.updateFilterConfigs(this.currentFilters);
  }

  makeSelectedArray(filter) {
    if (filter.state) {
      this.selected.push(filter);
      return this.getUnique(this.selected, 'filterName');
    } else {
      return this.selected.filter(item => item.filterName !== filter.filterName);
    }
  }

  getUnique(arr, comp) {
    return arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  }
}
