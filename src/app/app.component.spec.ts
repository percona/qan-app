/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { InstanceService } from './core/services/instance.service';
import { CoreModule } from './core/core.module';
import { AddInstanceComponent } from './add-instance/add-instance.component';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, AppRoutingModule, NgbModule, HttpModule, CoreModule],
      declarations: [
        AppComponent,
        AddInstanceComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        InstanceService,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: InstanceService,
          useValue: {
            dbServers: []
          },
        }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should switch theme to dark if now is light', () => {
    component.theme = 'app-theme-light';
    component.toggleTheme();
    expect(component.theme).toBe('app-theme-dark');
  });

  it('should switch theme to light if now is dark', () => {
    component.theme = 'app-theme-dark';
    component.toggleTheme();
    fixture.detectChanges();
    expect(component.theme).toBe('app-theme-light');
  });

  it('should return empty string if parameter for get cookie is false', () => {
    const result = component.getCookie(false);
    fixture.detectChanges();
    expect(result).toBe('');
  });

  it('should return empty string if parameter for get cookie is false', () => {
    spyOn(component, 'getJsonFromUrl').and.returnValue({ theme: 'dark' });
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.theme).toBe('app-theme-dark');
  });

  it('should return empty string if parameter for get cookie is false', () => {
    spyOn(component, 'getJsonFromUrl').and.returnValue({ theme: 'light' });
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.theme).toBe('app-theme-light');
  });

  it('should be app-theme-dark if parameter for theme is not valid case', () => {
    component.theme = 'app-theme-dark';
    spyOn(component, 'getJsonFromUrl').and.returnValue({ theme: '???' });
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.theme).toBe('app-theme-dark');
  });
});
