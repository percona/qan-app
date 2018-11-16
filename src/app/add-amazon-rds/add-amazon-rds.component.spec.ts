import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmazonRDSComponent } from './add-amazon-rds.component';

describe('AddAmazonRDSComponent', () => {
  let component: AddAmazonRDSComponent;
  let fixture: ComponentFixture<AddAmazonRDSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAmazonRDSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmazonRDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
