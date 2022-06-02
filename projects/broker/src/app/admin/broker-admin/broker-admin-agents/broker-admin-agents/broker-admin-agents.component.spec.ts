import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminAgentsComponent } from './broker-admin-agents.component';

describe('BrokerAdminAgentsComponent', () => {
  let component: BrokerAdminAgentsComponent;
  let fixture: ComponentFixture<BrokerAdminAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
