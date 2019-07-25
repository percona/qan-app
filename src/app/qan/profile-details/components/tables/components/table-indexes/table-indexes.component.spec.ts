import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIndexesComponent } from './table-indexes.component';

describe('TableIndexesComponent', () => {
  let component: TableIndexesComponent;
  let fixture: ComponentFixture<TableIndexesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableIndexesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIndexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
