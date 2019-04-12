import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExamplesComponent } from './details-examples.component';

describe('DetailsExamplesComponent', () => {
  let component: DetailsExamplesComponent;
  let fixture: ComponentFixture<DetailsExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsExamplesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
