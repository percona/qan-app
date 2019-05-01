import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesViewerComponent } from './examples-viewer.component';

describe('ExamplesViewerComponent', () => {
  let component: ExamplesViewerComponent;
  let fixture: ComponentFixture<ExamplesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
