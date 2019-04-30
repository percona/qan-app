import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'qan-profile.component.html',
  styleUrls: ['./qan-profile.component.scss'],
})
export class QanProfileComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('pmmQanWrapper') qanWrapper: ElementRef;
  @ViewChild('table') table: ElementRef;

  public queryProfile: Array<{}>;
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

  constructor() {
  }

  ngOnInit() {
  }

  checkRender() {
    const height = this.table.nativeElement.offsetHeight;
    this.qanWrapper.nativeElement.style.setProperty('--filter-height', `${height}px`);
  }
}
