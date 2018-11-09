import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryProfileCellComponent } from './query-profile-cell.component';

describe('QueryProfileCellComponent', () => {
  let component: QueryProfileCellComponent;
  let fixture: ComponentFixture<QueryProfileCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryProfileCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryProfileCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
