import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrokerAdminRegionsComponent } from './broker-admin-regions.component';

describe('BrokerAdminRegionsComponent', () => {
  let component: BrokerAdminRegionsComponent;
  let fixture: ComponentFixture<BrokerAdminRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrokerAdminRegionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
