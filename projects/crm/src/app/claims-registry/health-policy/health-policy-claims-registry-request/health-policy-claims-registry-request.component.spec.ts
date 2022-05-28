import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyClaimsRegistryRequestComponent } from './health-policy-claims-registry-request.component';

describe('HealthPolicyClaimsRegistryRequestComponent', () => {
  let component: HealthPolicyClaimsRegistryRequestComponent;
  let fixture: ComponentFixture<HealthPolicyClaimsRegistryRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyClaimsRegistryRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyClaimsRegistryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
