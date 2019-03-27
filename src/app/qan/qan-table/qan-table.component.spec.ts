import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QanTableComponent } from './qan-table.component';

describe('QanTableComponent', () => {
  let component: QanTableComponent;
  let fixture: ComponentFixture<QanTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [QanTableComponent]
    })
      .compileComponents();
=======
      declarations: [QanTableComponent]
    })
      .compileComponents();
>>>>>>> PMM-2.0
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
