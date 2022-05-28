import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyClaimViewComponent } from './health-policy-claim-view.component';

describe('HealthPolicyClaimViewComponent', () => {
  let component: HealthPolicyClaimViewComponent;
  let fixture: ComponentFixture<HealthPolicyClaimViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyClaimViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyClaimViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
