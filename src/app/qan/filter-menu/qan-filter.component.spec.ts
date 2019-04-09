import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QanFilterComponent } from './qan-filter.component';

describe('QanFilterComponent', () => {
  let component: QanFilterComponent;
  let fixture: ComponentFixture<QanFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QanFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
