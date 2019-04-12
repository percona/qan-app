import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLabelsComponent } from './details-labels.component';

describe('DetailsLabelsComponent', () => {
  let component: DetailsLabelsComponent;
  let fixture: ComponentFixture<DetailsLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsLabelsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
