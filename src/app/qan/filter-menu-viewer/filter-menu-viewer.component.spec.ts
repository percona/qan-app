import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMenuViewerComponent } from './filter-menu-viewer.component';

describe('FilterMenuViewerComponent', () => {
  let component: FilterMenuViewerComponent;
  let fixture: ComponentFixture<FilterMenuViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterMenuViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMenuViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
