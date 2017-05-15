/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryProfileComponent } from './query-profile.component';

describe('QueryProfileComponent', () => {
  let component: QueryProfileComponent;
  let fixture: ComponentFixture<QueryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
