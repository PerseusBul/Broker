import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyClaimsRegistryNewComponent } from './health-policy-claims-registry-new.component';

describe('HealthPolicyClaimsRegistryNewComponent', () => {
  let component: HealthPolicyClaimsRegistryNewComponent;
  let fixture: ComponentFixture<HealthPolicyClaimsRegistryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyClaimsRegistryNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyClaimsRegistryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
