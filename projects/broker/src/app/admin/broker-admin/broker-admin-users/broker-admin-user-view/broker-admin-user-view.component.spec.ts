import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminUserViewComponent } from './broker-admin-user-view.component';

describe('BrokerAdminUserViewComponent', () => {
  let component: BrokerAdminUserViewComponent;
  let fixture: ComponentFixture<BrokerAdminUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
