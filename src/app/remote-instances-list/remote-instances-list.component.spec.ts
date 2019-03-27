import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteInstancesListComponent } from './remote-instances-list.component';

describe('RemoteInstancesListComponent', () => {
  let component: RemoteInstancesListComponent;
  let fixture: ComponentFixture<RemoteInstancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteInstancesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteInstancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
