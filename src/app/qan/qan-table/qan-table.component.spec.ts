import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QanTableComponent } from './qan-table.component';

describe('QanTableComponent', () => {
  let component: QanTableComponent;
  let fixture: ComponentFixture<QanTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QanTableComponent]
    })
      .compileComponents();
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
