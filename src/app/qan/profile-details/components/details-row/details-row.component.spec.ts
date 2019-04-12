import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRowComponent } from './details-row.component';

describe('DetailsRowComponent', () => {
  let component: DetailsRowComponent;
  let fixture: ComponentFixture<DetailsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
