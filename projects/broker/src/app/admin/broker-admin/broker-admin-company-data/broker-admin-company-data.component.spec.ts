import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminCompanyDataComponent } from './broker-admin-company-data.component';

describe('BrokerAdminCompanyDataComponent', () => {
  let component: BrokerAdminCompanyDataComponent;
  let fixture: ComponentFixture<BrokerAdminCompanyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminCompanyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminCompanyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
