import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminUsersComponent } from './broker-admin-users.component';

describe('BrokerAdminUsersComponent', () => {
  let component: BrokerAdminUsersComponent;
  let fixture: ComponentFixture<BrokerAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
