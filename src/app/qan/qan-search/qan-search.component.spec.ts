import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QanSearchComponent } from './qan-search.component';

describe('QanSearchComponent', () => {
  let component: QanSearchComponent;
  let fixture: ComponentFixture<QanSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QanSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
