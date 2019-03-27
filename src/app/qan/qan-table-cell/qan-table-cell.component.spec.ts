import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QanTableCellComponent } from './qan-table-cell.component';

describe('QanTableCellComponent', () => {
  let component: QanTableCellComponent;
  let fixture: ComponentFixture<QanTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [QanTableCellComponent]
    })
      .compileComponents();
=======
      declarations: [QanTableCellComponent]
    })
      .compileComponents();
>>>>>>> PMM-2.0
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QanTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
