import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminOfficeViewComponent } from './broker-admin-office-view.component';

describe('BrokerAdminOfficeViewComponent', () => {
  let component: BrokerAdminOfficeViewComponent;
  let fixture: ComponentFixture<BrokerAdminOfficeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminOfficeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminOfficeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
