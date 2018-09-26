import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddAwsComponent} from './add-aws.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AddAwsService, MySQLCredentials, RDSCredentials} from './add-aws.service';

fdescribe('AddAwsComponent', () => {
  let component: AddAwsComponent;
  let fixture: ComponentFixture<AddAwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAwsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, HttpModule, NgbModule],
      providers: [
        AddAwsService, RDSCredentials, MySQLCredentials,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component user was submitted changes and promise data is correct ', (done) => {
    const promiseData = [
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora1'},
        'service': {
          'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora',
          'engine_version': '5.6.10a'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora57'},
        'service': {
          'address': 'rds-aurora57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora-mysql',
          'engine_version': '5.7.12'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql56'},
        'service': {
          'address': 'rds-mysql56.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.6.37'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql57'},
        'service': {
          'address': 'rds-mysql57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.7.19'
        }
      }
    ];
    component.submitted = true;
    const spy = spyOn(component.addAwsService, 'discover').and.returnValue(Promise.resolve(promiseData));
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      done();
    });
  });

  it('should not create error if getRegistered return data', (done) => {
    const promiseData = [
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora1'},
        'service': {
          'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora',
          'engine_version': '5.6.10a'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora57'},
        'service': {
          'address': 'rds-aurora57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora-mysql',
          'engine_version': '5.7.12'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql56'},
        'service': {
          'address': 'rds-mysql56.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.6.37'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql57'},
        'service': {
          'address': 'rds-mysql57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.7.19'
        }
      }
    ];
    const regData = [{
      'node': {'region': 'us-east-1', 'name': 'rds-aurora1'},
      'service': {
        'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
        'port': 3306,
        'engine': 'aurora',
        'engine_version': '5.6.10a'
      }
    }];
    const spy = spyOn(component.addAwsService, 'discover').and.returnValue(Promise.resolve(promiseData));
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
    const spy = spyOn(component.addAwsService, 'discover').and.returnValue(Promise.reject(undefined));
    component.submitted = false;
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then().catch(() => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('Bad response');
      done();
    });
  });

  it('should not create error if response data is valid', (done) => {
    const promiseData = [
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora1'},
        'service': {
          'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora',
          'engine_version': '5.6.10a'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora57'},
        'service': {
          'address': 'rds-aurora57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora-mysql',
          'engine_version': '5.7.12'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql56'},
        'service': {
          'address': 'rds-mysql56.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.6.37'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql57'},
        'service': {
          'address': 'rds-mysql57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.7.19'
        }
      }
    ];
    const spy = spyOn(component.addAwsService, 'discover').and.returnValue(Promise.resolve(promiseData));
    component.onSubmit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should not create error if response data is valid', (done) => {
    const promiseData = [
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora1'},
        'service': {
          'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora',
          'engine_version': '5.6.10a'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora57'},
        'service': {
          'address': 'rds-aurora57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora-mysql',
          'engine_version': '5.7.12'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql56'},
        'service': {
          'address': 'rds-mysql56.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.6.37'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql57'},
        'service': {
          'address': 'rds-mysql57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.7.19'
        }
      }
    ];
    const spy = spyOn(component.addAwsService, 'discover').and.returnValue(Promise.resolve(promiseData));
    component.onSubmit();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should create Bad response error if promise returns undefined', (done) => {
    const spy = spyOn(component.addAwsService, 'discover').and.returnValue(Promise.reject(undefined));
    component.onSubmit();
    spy.calls.mostRecent().returnValue.then().catch(() => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('Bad response');
      done();
    });
  });

  it('enableInstanceMonitoring', () => {
    component.enableInstanceMonitoring({name: 'name', region: 'region'});
    fixture.detectChanges();
    expect(component.rdsNode).toBeTruthy();
  });

  it('should be true if show connect parameters are equal with rdsNode', () => {
    component.rdsNode = {
      name: 'name',
      region: 'region'
    };
    const result = component.showConnect({name: 'name', region: 'region'});
    fixture.detectChanges();
    expect(result).toBeTruthy();
  });

  it('should clear rdsNode data', () => {
    component.cancel();
    fixture.detectChanges();
    [component.rdsNode.name, component.rdsNode.region].map(item => expect(item).toBe(''));
  });

  it('should not create error if all promise data is valid', (done) => {
    const promiseData = [
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora1'},
        'service': {
          'address': 'rds-aurora1.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora',
          'engine_version': '5.6.10a'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-aurora57'},
        'service': {
          'address': 'rds-aurora57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'aurora-mysql',
          'engine_version': '5.7.12'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql56'},
        'service': {
          'address': 'rds-mysql56.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.6.37'
        }
      },
      {
        'node': {'region': 'us-east-1', 'name': 'rds-mysql57'},
        'service': {
          'address': 'rds-mysql57.cg8slbmxcsve.us-east-1.rds.amazonaws.com',
          'port': 3306,
          'engine': 'mysql',
          'engine_version': '5.7.19'
        }
      }
    ];
    const spy = spyOn(component.addAwsService, 'enable').and.returnValue(Promise.resolve(promiseData));
    component.onConnect();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should create Bad response error if promise returns undefined', (done) => {
    const spy = spyOn(component.addAwsService, 'enable').and.returnValue(Promise.reject(undefined));
    component.onConnect();
    spy.calls.mostRecent().returnValue.then().catch(() => {
      fixture.detectChanges();
      expect(component.errorMessage).toBe('Bad response');
      done();
    });
  });

  it('should create rdsNode if enable instance monitoring has been called', () => {
    component.enableInstanceMonitoring({name: 'name', region: 'region'});
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
    const promiseData = [
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
    const spy = spyOn(component.addAwsService, 'getRegistered').and.returnValue(Promise.resolve(promiseData));
    component.getRegistered();
    spy.calls.mostRecent().returnValue.then((data) => {
      fixture.detectChanges();
      expect(component.registeredNames).toEqual(['name:region']);
      done();
    })
  });
});
