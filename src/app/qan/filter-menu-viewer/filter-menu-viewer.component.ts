import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FilterMenuService } from '../filter-menu/filter-menu.service';
import { FiltersService } from '../../pmm-api-services/services/filters.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filter-menu-viewer',
  templateUrl: './filter-menu-viewer.component.html',
  styleUrls: ['./filter-menu-viewer.component.css']
})
export class FilterMenuViewerComponent implements OnInit, OnDestroy {

  public currentParams: GetProfileBody;
  public selectedArray: any = [];
  private filterSubscription$: Subscription;
  private getFilters$: Subscription;
  public filters$: any = [];
  public filters: any = [];

  constructor(
    private filterMenuService: FilterMenuService,
    private filterService: FiltersService,
    private qanFilterService: FilterMenuService,
    private qanProfileService: QanProfileService,
  ) {
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
    this.qanFilterService.getSelected.subscribe(response => {
      this.selectedArray = response;
      if (this.filters.length) {
        this.resetAllFilters();
        if (this.selectedArray.length) {
          this.checkSelectedFilters();
        }
      }
    });

    this.getFilters$ = this.filterService.Get(
      {
        period_start_from: this.currentParams.period_start_from,
        period_start_to: this.currentParams.period_start_to
      }
    ).pipe(
      map(response => this.filterMenuService.generateFilterGroup(response))
    ).subscribe(
      filters => {
        this.filters = filters;
        this.filterMenuService.updateAutocompleteFilters(filters)
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getFilters$.unsubscribe();
    this.filterSubscription$.unsubscribe();
  }

  resetAllFilters() {
    this.filters.forEach(group => group.items.forEach(item => item.state = false));
  }

  checkSelectedFilters() {
    this.selectedArray.forEach(selectedItem => {
      const group = this.filters.find(filterGroup => filterGroup.filterGroup === selectedItem.groupName);
      if (group) {
        const filter = group.items.find(item => item.value === selectedItem.filterName);
        if (filter) {
          filter.state = true;
        }
      }
    });
  }
}
