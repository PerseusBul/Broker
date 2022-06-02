import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminBrokersComponent } from './broker-admin-brokers.component';

describe('BrokerAdminBrokersComponent', () => {
  let component: BrokerAdminBrokersComponent;
  let fixture: ComponentFixture<BrokerAdminBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminBrokersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
