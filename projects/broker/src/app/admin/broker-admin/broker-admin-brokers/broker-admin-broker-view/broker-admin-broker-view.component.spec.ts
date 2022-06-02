import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminBrokerViewComponent } from './broker-admin-broker-view.component';

describe('BrokerAdminBrokerViewComponent', () => {
  let component: BrokerAdminBrokerViewComponent;
  let fixture: ComponentFixture<BrokerAdminBrokerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminBrokerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminBrokerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
