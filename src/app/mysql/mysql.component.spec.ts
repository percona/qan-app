/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MySQLComponent } from './mysql.component';

describe('MySQLComponent', () => {
  let component: MySQLComponent;
  let fixture: ComponentFixture<MySQLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySQLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySQLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
