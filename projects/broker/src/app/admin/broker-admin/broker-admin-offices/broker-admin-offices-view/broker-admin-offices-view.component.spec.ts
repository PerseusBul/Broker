import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminOfficesViewComponent } from './broker-admin-offices-view.component';

describe('BrokerAdminOfficesViewComponent', () => {
  let component: BrokerAdminOfficesViewComponent;
  let fixture: ComponentFixture<BrokerAdminOfficesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminOfficesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminOfficesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
