import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrokerAdminRegionViewComponent } from './broker-admin-region-view.component';

describe('BrokerAdminRegionViewComponent', () => {
  let component: BrokerAdminRegionViewComponent;
  let fixture: ComponentFixture<BrokerAdminRegionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrokerAdminRegionViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminRegionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
