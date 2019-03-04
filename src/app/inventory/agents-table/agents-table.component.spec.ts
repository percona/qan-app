import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsTableComponent } from './agents-table.component';

describe('AgentsTableComponent', () => {
  let component: AgentsTableComponent;
  let fixture: ComponentFixture<AgentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
