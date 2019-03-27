import { AddAmazonRDSComponent } from './add-amazon-rds.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddAmazonRDSService, MySQLCredentials, RDSCredentials } from './add-amazon-rds.service';

fdescribe('AddAmazonRDSComponent', () => {
  let component: AddAmazonRDSComponent;
  let fixture: ComponentFixture<AddAmazonRDSComponent>;
  const promiseData = [
    {
      'node': { 'region': 'us-east-1', 'name': 'rds-aurora1' },
      'service': {
        'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
        'port': 3306,
        'engine': 'aurora',
        'engine_version': '5.6.10a'
      }
    },
    {
      'node': { 'region': 'us-east-1', 'name': 'rds-aurora57' },
      'service': {
        'address': 'rds-aurora57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
        'port': 3306,
        'engine': 'aurora-mysql',
        'engine_version': '5.7.12'
      }
    },
    {
      'node': { 'region': 'us-east-1', 'name': 'rds-mysql56' },
      'service': {
        'address': 'rds-mysql56.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
        'port': 3306,
        'engine': 'mysql',
        'engine_version': '5.6.37'
      }
    },
    {
      'node': { 'region': 'us-east-1', 'name': 'rds-mysql57' },
      'service': {
        'address': 'rds-mysql57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
        'port': 3306,
        'engine': 'mysql',
        'engine_version': '5.7.19'
      }
    }
  ];
  const err = {
    _body: '{"error":"NoCredentialProviders: no valid providers in chain", "code":2}',
    status: 500,
    ok: false,
    statusText: 'Internal Server Error',
    type: 2,
    url: 'http://localhost/managed/v0/rds/discover',
    json: () => { return JSON.parse(err._body) }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAmazonRDSComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, HttpClientModule, NgbModule],
      providers: [
        AddAmazonRDSService, RDSCredentials, MySQLCredentials,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmazonRDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component user was submitted changes and promise data is correct ', (done) => {
    component.submitted = true;
    const spy = spyOn(component.addAmazonRDSService, 'discover').and.returnValue(Promise.resolve(promiseData));
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      done();
    });
  });

  it('should not create error if getRegistered return data', (done) => {
    const regData = [{
      'node': { 'region': 'us-east-1', 'name': 'rds-aurora1' },
      'service': {
        'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
        'port': 3306,
        'engine': 'aurora',
        'engine_version': '5.6.10a'
      }
    }];
    const spy = spyOn(component.addAmazonRDSService, 'discover').and.returnValue(Promise.resolve(promiseData));
    spyOn(component, 'getRegistered').and.returnValue(Promise.resolve(regData));
    component.submitted = false;
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBeFalsy();
      done();
    });
  });

  it('should be Bad response if promise returns undefined', (done) => {
    const spy = spyOn(component.addAmazonRDSService, 'discover').and.returnValue(Promise.reject(undefined));
    component.submitted = false;
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then().catch(() => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('Bad response');
      done();
    });
  });

  it('should not create error if response data is valid', (done) => {
    const spy = spyOn(component.addAmazonRDSService, 'discover').and.returnValue(Promise.resolve(promiseData));
    component.onSubmit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should not create error if response data is valid', (done) => {
    const spy = spyOn(component.addAmazonRDSService, 'discover').and.returnValue(Promise.resolve(promiseData));
    component.onSubmit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should create Bad response error if promise returns undefined', (done) => {
    const spy = spyOn(component.addAmazonRDSService, 'discover').and.returnValue(Promise.reject(undefined));
    component.onSubmit();
    spy.calls.mostRecent().returnValue.then().catch(() => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('Bad response');
      done();
    });
  });

  it('enableInstanceMonitoring', () => {
    component.enableInstanceMonitoring({ name: 'name', region: 'region' });
    fixture.detectChanges();
    expect(component.rdsNode).toBeTruthy();
  });

  it('should be true if show connect parameters are equal with rdsNode', () => {
    component.rdsNode = {
      name: 'name',
      region: 'region'
    };
    const result = component.showConnect({ name: 'name', region: 'region' });
    fixture.detectChanges();
    expect(result).toBeTruthy();
  });

  it('should clear rdsNode data', () => {
    component.cancel();
    fixture.detectChanges();
    [component.rdsNode.name, component.rdsNode.region].map(item => expect(item).toBe(''));
  });

  it('should not create error if all promise data is valid', (done) => {
    const spy = spyOn(component.addAmazonRDSService, 'enable').and.returnValue(Promise.resolve(promiseData));
    component.onConnect();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should create Bad response error if promise returns undefined', (done) => {
    const spy = spyOn(component.addAmazonRDSService, 'enable').and.returnValue(Promise.reject(undefined));
    component.onConnect();
    spy.calls.mostRecent().returnValue.then().catch(() => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('Bad response');
      done();
    });
  });

  // it('should be NoCredentialProviders error if this error is presented in response ', (done) => {
  //   const spy = spyOn(component.addAwsService, 'enable').and.returnValue(Promise.reject(err));
  //
  //   component.onConnect();
  //   spy.calls.mostRecent().returnValue.then().catch((error) => {
  //     fixture.detectChanges();
  //     expect(component.errorMessage).toBe('NoCredentialProviders: no valid providers in chain');
  //     done();
  //   });
  // });

  it('should create rdsNode if enable instance monitoring has been called', () => {
    component.enableInstanceMonitoring({ name: 'name', region: 'region' });
    fixture.detectChanges();
    expect(component.rdsNode).toBeTruthy();
  });

  it('should be empty array if registeredRDSInstances is undefined', () => {
    component.registeredRDSInstances = undefined;
    component.getRegistered();
    fixture.detectChanges();
    expect(component.registeredNames).toEqual([]);
  });

  it('should create registeredNames array if promise data is presented', (done) => {
    const promise = [
      {
        node: {
          name: 'name',
          region: 'region'
        },
        service: {
          address: 'address',
          port: 80,
          engine: 'engine',
          engine_version: 'eng-ver',
        }
      }
    ];
    const spy = spyOn(component.addAmazonRDSService, 'getRegistered').and.returnValue(Promise.resolve(promise));
    component.getRegistered();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.registeredNames).toEqual(['name:region']);
      done();
    })
  });

  // it('should be NoCredentialProviders error if this error is presented in response ', (done) => {
  //   const spy = spyOn(component.addAwsService, 'getRegistered').and.returnValue(Promise.reject(err));
  //   component.getRegistered();
  //   spy.calls.mostRecent().returnValue.then().catch((error) => {
  //     fixture.detectChanges();
  //     expect(component.errorMessage).toBe('NoCredentialProviders: no valid providers in chain');
  //     done();
  //   });
  // });

  // it('should create error if response has NoCredentialProviders error', () => {
  //   component.checkErrorMessage(err);
  //   expect(component.errorMessage).toBe('Cannot automatically discover instances - please provide AWS access credentials');
  // });
});
