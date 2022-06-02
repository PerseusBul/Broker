import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminAgentsViewComponent } from './broker-admin-agents-view.component';

describe('BrokerAdminAgentsViewComponent', () => {
  let component: BrokerAdminAgentsViewComponent;
  let fixture: ComponentFixture<BrokerAdminAgentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminAgentsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminAgentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
