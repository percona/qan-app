import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwsComponent } from './add-aws.component';

describe('AddAwsComponent', () => {
  let component: AddAwsComponent;
  let fixture: ComponentFixture<AddAwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
