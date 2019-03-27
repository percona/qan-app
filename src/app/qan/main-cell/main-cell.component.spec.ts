import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCellComponent } from './main-cell.component';

describe('MainCellComponent', () => {
  let component: MainCellComponent;
  let fixture: ComponentFixture<MainCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainCellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
