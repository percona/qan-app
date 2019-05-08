import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryExampleComponent } from './query-example.component';

describe('QueryExampleComponent', () => {
  let component: QueryExampleComponent;
  let fixture: ComponentFixture<QueryExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueryExampleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
