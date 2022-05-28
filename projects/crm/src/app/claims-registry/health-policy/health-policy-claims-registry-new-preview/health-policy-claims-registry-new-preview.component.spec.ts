import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyClaimsRegistryNewPreviewComponent } from './health-policy-claims-registry-new-preview.component';

describe('HealthPolicyClaimsRegistryNewPreviewComponent', () => {
  let component: HealthPolicyClaimsRegistryNewPreviewComponent;
  let fixture: ComponentFixture<HealthPolicyClaimsRegistryNewPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyClaimsRegistryNewPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyClaimsRegistryNewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
