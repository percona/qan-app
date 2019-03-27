import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCellComponent } from './main-cell.component';

describe('MainCellComponent', () => {
  let component: MainCellComponent;
  let fixture: ComponentFixture<MainCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [MainCellComponent]
    })
      .compileComponents();
=======
      declarations: [MainCellComponent]
    })
      .compileComponents();
>>>>>>> PMM-2.0
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
