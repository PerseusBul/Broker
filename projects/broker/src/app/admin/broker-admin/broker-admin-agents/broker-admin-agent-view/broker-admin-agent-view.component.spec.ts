import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrokerAdminAgentViewComponent } from './broker-admin-agent-view.component';

describe('BrokerAdminAgentsViewComponent', () => {
  let component: BrokerAdminAgentViewComponent;
  let fixture: ComponentFixture<BrokerAdminAgentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrokerAdminAgentViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminAgentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
