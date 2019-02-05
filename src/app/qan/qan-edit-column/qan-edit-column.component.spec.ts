import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QanEditColumnComponent } from './qan-edit-column.component';

describe('QanEditColumnComponent', () => {
  let component: QanEditColumnComponent;
  let fixture: ComponentFixture<QanEditColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QanEditColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QanEditColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
