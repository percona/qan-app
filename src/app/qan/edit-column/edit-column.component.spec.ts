import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColumnComponent } from './edit-column.component';

describe('EditColumnComponent', () => {
  let component: EditColumnComponent;
  let fixture: ComponentFixture<EditColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditColumnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
