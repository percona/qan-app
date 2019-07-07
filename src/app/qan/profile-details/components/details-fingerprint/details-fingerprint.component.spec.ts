import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFingerprintComponent } from './details-fingerprint.component';

describe('DetailsFingerprintComponent', () => {
  let component: DetailsFingerprintComponent;
  let fixture: ComponentFixture<DetailsFingerprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFingerprintComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFingerprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
