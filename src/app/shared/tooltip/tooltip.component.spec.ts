import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TootltipComponent } from './tooltip.component';

describe('TootltipComponent', () => {
  let component: TootltipComponent;
  let fixture: ComponentFixture<TootltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TootltipComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TootltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
