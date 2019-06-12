import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatusComponent } from './table-status.component';

describe('TableStatusComponent', () => {
  let component: TableStatusComponent;
  let fixture: ComponentFixture<TableStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
