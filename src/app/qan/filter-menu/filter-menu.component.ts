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
  public selected: any = this.filterMenuService.getSelected.getValue();

  constructor(private filterMenuService: FilterMenuService) {
    this.filterMenuService.getSelected.subscribe(response => {
      this.selected = response;
      // todo: Add check when filters are coming
      if (this.currentFilters.length) {
        this.resetAllFilters();
        if (this.selected.length) {
          this.checkSelectedFilters();
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
  }

  setConfigs(selectedFilter) {
    this.selected = this.makeSelectedArray(selectedFilter);
    this.filterMenuService.updateSelected(this.selected);
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

  resetAllFilters() {
    this.currentFilters.forEach(group => group.items.forEach(item => item.state = false));
  }

  checkSelectedFilters() {
    this.selected.forEach(selectedItem => {
      const group = this.currentFilters.find(filterGroup => filterGroup.filterGroup === selectedItem.groupName);
      if (group) {
        const filter = group.items.find(item => item.value === selectedItem.filterName);
        if (filter) {
          filter.state = true;
        }
      }
    });
  }
}
