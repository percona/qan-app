import { AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { InstanceService } from '../../core/services/instance.service';
import { QueryProfileService } from './query-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
const queryProfileError = 'No data. Please check pmm-client and database configurations on selected instance.';

@Component({
  moduleId: module.id,
  templateUrl: 'query-profile.component.html',
  styleUrls: ['./query-profile.component.scss'],
})
export class QueryProfileComponent implements OnInit, AfterViewChecked {
  // @ViewChild('qanTable') table: ElementRef;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: ElementRef;
  @ViewChild('pmmQanWrapper') pmmQanWrapper: ElementRef;

  public queryProfile: Array<{}>;
  public selectPaginationConfig = [10, 50, 100];
  public selectedPaginationOption: any = 10;
  public profileTotal;
  public offset: number;
  public totalAmountOfQueries: number;
  public searchValue: string;
  public isLoading: boolean;
  public isQueryLoading: boolean;
  public noQueryError: string;
  public isFirstSeenChecked = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public measurement: string;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
    public queryProfileService: QueryProfileService) {
  }

  ngOnInit() {
    console.log('table - ', this.table);
    console.log('filter - ', this.filter);
  }

  ngAfterViewChecked() {
    const height = this.table.nativeElement.offsetHeight;
    this.filter.nativeElement.style.height = `${height}px`;
  }
}
