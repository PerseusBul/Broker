import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminOfficesComponent } from './broker-admin-offices.component';

describe('BrokerAdminOfficesComponent', () => {
  let component: BrokerAdminOfficesComponent;
  let fixture: ComponentFixture<BrokerAdminOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
