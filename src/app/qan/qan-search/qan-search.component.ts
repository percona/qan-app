import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { QanFilterService } from '../qan-filter/qan-filter.service';
import { FilterSearchService } from '../../core/services/filter-search.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { GetProfileBody, QanTableService } from '../qan-table/qan-table.service';
import { FilterLabelModel } from './filter-label.model';

@Component({
  selector: 'app-qan-search',
  templateUrl: './qan-search.component.html',
  styleUrls: ['./qan-search.component.scss']
})
export class QanSearchComponent implements OnInit {

  @ViewChild('tabs')
  private tabs: NgbTabset;

  public autocomplete: any;
  public selected: Array<{}> = [];
  private filterSubscription$: Subscription;
  public filters: any;
  public profileParams: GetProfileBody;

  constructor(private qanFilterService: QanFilterService,
    private qanTableService: QanTableService,
    private filterSearchService: FilterSearchService) {
    // this.profileParams = this.qanTableService.getProfileParamsState;
    //
    // this.filterSubscription$ = this.qanFilterService.filterSource.subscribe(items => {
    //   this.filters = items;
    //   console.log('filters - ', this.filters);
    //   // this.profileParams.labels = this.filters.map(filter => new FilterLabelModel(filter));
    //   // this.autocomplete = [].concat(...items);
    // });
    //
    // this.qanFilterService.getAutocomplete.subscribe(configs => {
    //   this.autocomplete = configs;
    //   console.log('autocomplete - ', this.autocomplete);
    // });
    // //
    // this.qanFilterService.filterSource.pipe(
    //   map(groups => [].concat(...groups).filter(group => group.state))
    // ).subscribe(selected => {
    //   this.selected = selected;
    //   console.log('selected - ', this.selected);
    // })
  }

  ngOnInit() {
  }
  //
  // ngOnDestroy() {
  //   this.filterSubscription$.unsubscribe();
  // }
  //
  // groupSelected() {
  //   this.selected = [...this.selected.sort((a, b) => a['groupName'].localeCompare(b['groupName']))];
  // }
  //
  // changeFilterState(event: any) {
  //   console.log('event - ', event);
  //   if (event.filterName) {
  //     this.toggleItem(event);
  //   }
  // }
  //
  // toggleItem(item) {
  //   item.state = !item.state;
  //   this.qanFilterService.updateFilterConfigs(this.filters);
  // }
  //
  // resetAll() {
  //   console.log('this.qanFilterService.getFilterInitialState - ', this.qanFilterService.getFilterInitialState);
  //   this.qanFilterService.updateFilterConfigs(this.qanFilterService.getFilterInitialState);
  // }
  //
  // autocompleteSearch = (term: string, item: any) => {
  //   return this.filterSearchService.findBySearch(item.filterName, term)
  //     || this.filterSearchService.findBySearch(item.groupName, term);
  // };
}
