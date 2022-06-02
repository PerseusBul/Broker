import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerAdminComponent } from './broker-admin.component';

describe('BrokerAdminComponent', () => {
  let component: BrokerAdminComponent;
  let fixture: ComponentFixture<BrokerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
