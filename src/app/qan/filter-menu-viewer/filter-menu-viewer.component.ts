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
      console.log('selected filter menu aside - ', this.selectedArray);
      console.log('filters menu aside - ', this.filters);

      // if (this.filters.length && this.selectedArray.length) {
      //   this.filters.forEach(filterGroup => {
      //     console.log('filterGroup - ', filterGroup);
      //     this.selectedArray.forEach(selectedFilter => {
      //       console.log('selectedArray - ', this.selectedArray);
      //       const selectedFilterItem = filterGroup.items.find(item => item.value === selectedFilter.filterName);
      //       if (selectedFilterItem) {
      //         console.log('selectedFilterItem - ', selectedFilterItem);
      //         selectedFilterItem.state = true;
      //       } else {
      //         console.log('else');
      //         filterGroup.items.forEach(item => item.state = false);
      //       }
      //     })
      //   })
      // }

      if (this.filters.length && this.selectedArray.length) {
        this.filters.forEach(group => group.items.forEach(item => item.state = false));
        this.selectedArray.forEach(selectedItem => {
          const group = this.filters.find(filterGroup => filterGroup.filterGroup === selectedItem.groupName);
          if (group) {
            const filter = group.items.find(item => item.value === selectedItem.filterName);
            if (filter) {
              filter.state = true;
            }
          }
        });
        console.log('this.filters - ', this.filters);
      }
    });


    this.getFilters$ = this.filterService.Get({
      period_start_from: this.currentParams.period_start_from,
      period_start_to: this.currentParams.period_start_to
    })
      .pipe(
        map(response => this.filterMenuService.generateFilterGroup(response))
      )
      .subscribe(
        response => {
          if (response.length) {
            this.filterMenuService.updateFilterConfigs(response)
          }
        }
      );

    this.filterSubscription$ = this.filterMenuService.filterSource.subscribe(
      filters => {
        this.filters = filters;
        // todo: move this check to selected
        this.currentParams.labels = this.filterMenuService.prepareLabels(filters);
        this.qanProfileService.updateProfileParams(this.currentParams);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getFilters$.unsubscribe();
    this.filterSubscription$.unsubscribe();
  }
}
